import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"
import connectDB from "@/lib/mongodb"
import Blog from "@/models/Blog"
import { deleteImage } from "@/lib/cloudinary"

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  image: z.string().optional(),
  imagePublicId: z.string().optional(),
  published: z.boolean().default(false),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    
    const skip = (page - 1) * limit

    let filter: any = {}
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ]
    }

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .populate('authorId', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments(filter),
    ])

    // Transform the data to match the expected format
    const transformedBlogs = blogs.map(blog => ({
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
    }))

    return NextResponse.json({
      blogs: transformedBlogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Blogs fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    // Only admins can create blogs
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized - Admin access required" }, { status: 401 })
    }

    await connectDB()

    const body = await request.json()
    const validatedData = blogSchema.parse(body)

    const blog = await Blog.create({
      title: validatedData.title,
      content: validatedData.content,
      excerpt: validatedData.excerpt,
      image: validatedData.image,
      imagePublicId: validatedData.imagePublicId,
      published: validatedData.published,
      authorId: session.user.id,
    })

    await blog.populate('authorId', 'name email')

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

    return NextResponse.json(transformedBlog, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    console.error("Blog creation error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 