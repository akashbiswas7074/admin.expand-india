import mongoose, { Document, Schema } from 'mongoose'

export interface IBlog extends Document {
  title: string
  content: string
  excerpt?: string
  image?: string
  imagePublicId?: string // For Cloudinary deletion
  published: boolean
  authorId: mongoose.Types.ObjectId
  author?: {
    name: string
    email: string
  }
  createdAt: Date
  updatedAt: Date
}

const BlogSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String
  },
  image: {
    type: String // Cloudinary URL
  },
  imagePublicId: {
    type: String // For Cloudinary deletion
  },
  published: {
    type: Boolean,
    default: false
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

// Virtual populate for author
BlogSchema.virtual('author', {
  ref: 'User',
  localField: 'authorId',
  foreignField: '_id',
  justOne: true,
  select: 'name email'
})

BlogSchema.set('toJSON', { virtuals: true })
BlogSchema.set('toObject', { virtuals: true })

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema) 