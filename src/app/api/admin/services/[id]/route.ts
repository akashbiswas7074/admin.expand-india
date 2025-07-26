import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"
import connectDB from "@/lib/mongodb"
import Service from "@/models/Service"

const serviceUpdateSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  content: z.string().optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  order: z.number().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await connectDB()

    const service = await Service.findById(id)

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

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

    return NextResponse.json(transformedService)
  } catch (error) {
    console.error("Service fetch error:", error)
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
    
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await connectDB()

    const body = await request.json()
    const validatedData = serviceUpdateSchema.parse(body)

    const service = await Service.findByIdAndUpdate(
      id,
      validatedData,
      { new: true }
    )

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

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

    return NextResponse.json(transformedService)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    console.error("Service update error:", error)
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
    
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await connectDB()

    const deletedService = await Service.findByIdAndDelete(id)

    if (!deletedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Service deleted successfully" })
  } catch (error) {
    console.error("Service delete error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 