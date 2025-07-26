import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import Blog from "@/models/Blog"
import Contact from "@/models/Contact"
import Service from "@/models/Service"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const [users, blogs, services, contacts] = await Promise.all([
      User.countDocuments(),
      Blog.countDocuments(),
      Service.countDocuments(),
      Contact.countDocuments(),
    ])

    return NextResponse.json({
      users,
      blogs,
      services,
      industries: 0, // Placeholder since we don't have industries model yet
      solutions: 0, // Placeholder since we don't have solutions model yet
      contacts,
    })
  } catch (error) {
    console.error("Stats error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 