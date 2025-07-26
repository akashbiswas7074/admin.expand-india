import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"
import connectDB from "@/lib/mongodb"
import Blog from "@/models/Blog"
import { deleteImage } from "@/lib/cloudinary"

const blogUpdateSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  content: z.string().min(1, "Content is required").optional(),
  excerpt: z.string().optional(),
  image: z.string().optional(),
  imagePublicId: z.string().optional(),
  published: z.boolean().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await connectDB()

    const blog = await Blog.findById(id).populate('authorId', 'name email')

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    // Users can only access their own blogs unless they're admin
    const authorId = (blog.authorId as any)?._id?.toString() || (blog.authorId as any)?.toString() || blog.authorId?.toString()
    if (session.user.role !== "ADMIN" && authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const transformedBlog = {
      id: (blog._id as any).toString(),
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      image: blog.image,
      imagePublicId: blog.imagePublicId,
      published: blog.published,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      author: {
        name: (blog.authorId as any)?.name || 'Admin',
        email: (blog.authorId as any)?.email || 'admin@example.com'
      }
    }

    return NextResponse.json(transformedBlog)
  } catch (error) {
    console.error("Blog fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await connectDB()

    const body = await request.json()
    const validatedData = blogUpdateSchema.parse(body)

    // Check if blog exists and user has permission
    const existingBlog = await Blog.findById(id)

    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    // Users can only edit their own blogs unless they're admin
    if (session.user.role !== "ADMIN" && existingBlog.authorId.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      validatedData,
      { new: true }
    ).populate('authorId', 'name email')

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    const transformedBlog = {
      id: (blog._id as any).toString(),
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      image: blog.image,
      imagePublicId: blog.imagePublicId,
      published: blog.published,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      author: {
        name: (blog.authorId as any)?.name || 'Admin',
        email: (blog.authorId as any)?.email || 'admin@example.com'
      }
    }

    return NextResponse.json(transformedBlog)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    console.error("Blog update error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await connectDB()

    // Check if blog exists and user has permission
    const existingBlog = await Blog.findById(id)

    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    // Users can only delete their own blogs unless they're admin
    if (session.user.role !== "ADMIN" && existingBlog.authorId.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Delete associated image from Cloudinary if exists
    if (existingBlog.imagePublicId) {
      try {
        await deleteImage(existingBlog.imagePublicId)
      } catch (imageError) {
        console.error("Failed to delete image from Cloudinary:", imageError)
        // Don't fail the blog deletion if image deletion fails
      }
    }

    await Blog.findByIdAndDelete(id)

    return NextResponse.json({ message: "Blog deleted successfully" })
  } catch (error) {
    console.error("Blog delete error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 