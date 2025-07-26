import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"
import connectDB from "@/lib/mongodb"
import Service from "@/models/Service"

const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().default(0),
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
        { description: { $regex: search, $options: "i" } },
      ]
    }

    const [services, total] = await Promise.all([
      Service.find(filter)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Service.countDocuments(filter),
    ])

    // Transform the data to match the expected format
    const transformedServices = services.map(service => ({
      id: (service._id as any).toString(),
      title: service.title,
      description: service.description,
      content: service.content,
      icon: service.icon,
      image: service.image,
      featured: service.featured,
      published: service.published,
      order: service.order,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    }))

    return NextResponse.json({
      services: transformedServices,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Services fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const body = await request.json()
    const validatedData = serviceSchema.parse(body)

    const service = await Service.create(validatedData)

    const transformedService = {
      id: (service._id as any).toString(),
      title: service.title,
      description: service.description,
      content: service.content,
      icon: service.icon,
      image: service.image,
      featured: service.featured,
      published: service.published,
      order: service.order,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    }

    return NextResponse.json(transformedService, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    console.error("Service creation error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 