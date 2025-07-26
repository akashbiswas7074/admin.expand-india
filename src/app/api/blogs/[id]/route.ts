import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import connectDB from "@/lib/mongodb"
import Blog from "@/models/Blog"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    const isAdmin = session?.user?.role === "ADMIN"
    
    const { id } = await params
    await connectDB()

    // Build filter - if not admin, only show published blogs
    const filter: any = { _id: id }
    if (!isAdmin) {
      filter.published = true
    }

    const blog = await Blog.findOne(filter)
      .populate('authorId', 'name email')

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    // Transform the data to match expected format
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