import mongoose, { Document, Schema } from 'mongoose'

export interface IContact extends Document {
  firstName: string
  lastName: string
  email: string
  company?: string
  message: string
  createdAt: Date
  updatedAt: Date
}

const ContactSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  company: {
    type: String
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema) 