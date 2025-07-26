import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import connectDB from "@/lib/mongodb"
import Blog from "@/models/Blog"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const isAdmin = session?.user?.role === "ADMIN"

    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const search = searchParams.get("search") || ""
    
    const skip = (page - 1) * limit

    // If admin, show all blogs. If not admin, only show published blogs
    let filter: any = {}
    
    if (!isAdmin) {
      filter.published = true
    }

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
      isAdmin, // Include admin status in response
    })
  } catch (error) {
    console.error("Public blogs fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 