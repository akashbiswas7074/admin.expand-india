const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// MongoDB connection string
const MONGODB_URI = "mongodb+srv://abworkhouse01:OsfhhYWVXIrzbS9r@cluster0.xnxagug.mongodb.net/freelance-app?retryWrites=true&w=majority"

// User schema (same as in the model)
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  }
}, {
  timestamps: true
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

async function createAdmin() {
  try {
    console.log('🔗 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Admin user details
    const adminData = {
      name: 'Admin User',
      email: 'admin@expandindia.com',
      password: 'admin123',
      role: 'ADMIN'
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email })
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists with email:', adminData.email)
      
      // Update password if needed
      const hashedPassword = await bcrypt.hash(adminData.password, 12)
      await User.findByIdAndUpdate(existingAdmin._id, { 
        password: hashedPassword,
        name: adminData.name,
        role: 'ADMIN'
      })
      console.log('✅ Admin user updated successfully!')
    } else {
      // Hash password
      const hashedPassword = await bcrypt.hash(adminData.password, 12)
      
      // Create admin user
      const admin = await User.create({
        name: adminData.name,
        email: adminData.email,
        password: hashedPassword,
        role: 'ADMIN'
      })

      console.log('✅ Admin user created successfully!')
    }

    console.log('')
    console.log('🎉 Admin Login Credentials:')
    console.log('📧 Email:', adminData.email)
    console.log('🔑 Password:', adminData.password)
    console.log('')
    console.log('🌐 Login URL: http://localhost:3000/admin')
    console.log('')

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message)
    if (error.code === 11000) {
      console.log('💡 Admin user might already exist. Try updating instead.')
    }
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Disconnected from MongoDB')
    process.exit(0)
  }
}

// Alternative function to create custom admin
async function createCustomAdmin(name, email, password) {
  try {
    console.log('🔗 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log('⚠️  User already exists with email:', email)
      
      // Update to admin with new password
      const hashedPassword = await bcrypt.hash(password, 12)
      await User.findByIdAndUpdate(existingUser._id, { 
        password: hashedPassword,
        name: name,
        role: 'ADMIN'
      })
      console.log('✅ User updated to admin successfully!')
    } else {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12)
      
      // Create admin user
      await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'ADMIN'
      })

      console.log('✅ Admin user created successfully!')
    }

    console.log('')
    console.log('🎉 Admin Login Credentials:')
    console.log('📧 Email:', email)
    console.log('🔑 Password:', password)
    console.log('')

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Disconnected from MongoDB')
    process.exit(0)
  }
}

// Run the script
const args = process.argv.slice(2)

if (args.length === 3) {
  // Custom admin: node create-admin.js "Admin Name" "admin@email.com" "password123"
  const [name, email, password] = args
  createCustomAdmin(name, email, password)
} else if (args.length === 0) {
  // Default admin
  createAdmin()
} else {
  console.log('')
  console.log('🚀 Usage:')
  console.log('   Default admin: node scripts/create-admin.js')
  console.log('   Custom admin:  node scripts/create-admin.js "Name" "email@domain.com" "password"')
  console.log('')
  console.log('📝 Examples:')
  console.log('   node scripts/create-admin.js')
  console.log('   node scripts/create-admin.js "John Admin" "john@company.com" "securepass123"')
  console.log('')
  process.exit(1)
} 