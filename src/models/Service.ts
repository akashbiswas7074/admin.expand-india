import mongoose, { Document, Schema } from 'mongoose'

export interface IService extends Document {
  title: string
  description: string
  content?: string
  icon?: string
  image?: string
  imagePublicId?: string
  featured: boolean
  published: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const ServiceSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  icon: {
    type: String
  },
  image: {
    type: String
  },
  imagePublicId: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema) 