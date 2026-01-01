// utils/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const University = require('../models/University');
const User = require('../models/User');
const Event = require('../models/Event');
const Job = require('../models/Job');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// Sample Universities
const universities = [
  {
    name: 'MIT - Massachusetts Institute of Technology',
    location: 'Cambridge, MA',
    verified: true,
    studentsCount: 4500,
    alumniCount: 2800,
    establishedYear: 1861,
    contactEmail: 'info@mit.edu',
    contactPhone: '+1-617-253-1000'
  },
  {
    name: 'Stanford University',
    location: 'Stanford, CA',
    verified: true,
    studentsCount: 7800,
    alumniCount: 5200,
    establishedYear: 1885,
    contactEmail: 'info@stanford.edu',
    contactPhone: '+1-650-723-2300'
  },
  {
    name: 'IIT Bombay',
    location: 'Mumbai, India',
    verified: true,
    studentsCount: 10200,
    alumniCount: 8500,
    establishedYear: 1958,
    contactEmail: 'info@iitb.ac.in',
    contactPhone: '+91-22-2576-4444'
  },
  {
    name: 'Carnegie Mellon University',
    location: 'Pittsburgh, PA',
    verified: true,
    studentsCount: 6800,
    alumniCount: 4100,
    establishedYear: 1900,
    contactEmail: 'info@cmu.edu',
    contactPhone: '+1-412-268-2000'
  },
  {
    name: 'Presidency University',
    location: 'Bengaluru, India',
    verified: true,
    studentsCount: 8500,
    alumniCount: 3200,
    establishedYear: 2013,
    contactEmail: 'info@presidencyuniversity.in',
    contactPhone: '+91-80-4012-9000'
  }
];

const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await University.deleteMany({});
    await User.deleteMany({});
    await Event.deleteMany({});
    await Job.deleteMany({});

    // Seed Universities
    console.log('📚 Seeding universities...');
    const createdUniversities = await University.insertMany(universities);
    console.log(`✅ Created ${createdUniversities.length} universities`);

    // Create sample users
    console.log('👥 Creating sample users...');
    const sampleUsers = [
      {
        name: 'Admin User',
        email: 'admin@alumni.com',
        password: 'admin123',
        userType: 'admin',
        university: createdUniversities[0]._id
      },
      {
        name: 'Sarah Chen',
        email: 'sarah.chen@gmail.com',
        password: 'password123',
        userType: 'alumni',
        university: createdUniversities[0]._id,
        position: 'Senior Software Engineer',
        company: 'Google',
        graduationYear: 2018,
        skills: ['React', 'Node.js', 'Python'],
        bio: 'Passionate about building scalable web applications'
      },
      {
        name: 'Michael Rodriguez',
        email: 'michael.r@apple.com',
        password: 'password123',
        userType: 'alumni',
        university: createdUniversities[1]._id,
        position: 'Product Manager',
        company: 'Apple',
        graduationYear: 2017,
        skills: ['Product Strategy', 'UX Design', 'Analytics'],
        bio: 'Helping build the future of mobile technology'
      },
      {
        name: 'Priya Sharma',
        email: 'priya.sharma@netflix.com',
        password: 'password123',
        userType: 'alumni',
        university: createdUniversities[2]._id,
        position: 'Data Scientist',
        company: 'Netflix',
        graduationYear: 2019,
        skills: ['Machine Learning', 'Python', 'Statistics'],
        bio: 'Using data to create better user experiences'
      },
      {
        name: 'John Student',
        email: 'john.student@university.edu',
        password: 'password123',
        userType: 'student',
        university: createdUniversities[0]._id,
        graduationYear: 2025,
        skills: ['JavaScript', 'Python', 'SQL'],
        cgpa: 8.5
      }
    ];

    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create sample events
    console.log('📅 Creating sample events...');
    const sampleEvents = [
      {
        title: 'Tech Career Fair 2025',
        description: 'Connect with top tech companies and alumni working in the industry.',
        date: new Date('2025-02-15'),
        time: '10:00 AM',
        type: 'career-fair',
        host: 'Alumni Association',
        maxAttendees: 200,
        university: createdUniversities[0]._id,
        createdBy: createdUsers[1]._id
      },
      {
        title: 'AI/ML Hackathon',
        description: '48-hour hackathon focused on AI and Machine Learning solutions.',
        date: new Date('2025-03-01'),
        time: '9:00 AM',
        type: 'hackathon',
        host: 'Computer Science Dept',
        maxAttendees: 100,
        university: createdUniversities[0]._id,
        createdBy: createdUsers[1]._id
      },
      {
        title: 'Alumni Networking Night',
        description: 'An evening of networking with successful alumni from various industries.',
        date: new Date('2025-02-28'),
        time: '6:00 PM',
        type: 'networking',
        host: 'Alumni Relations',
        maxAttendees: 80,
        university: createdUniversities[1]._id,
        createdBy: createdUsers[2]._id
      }
    ];

    const createdEvents = await Event.insertMany(sampleEvents);
    console.log(`✅ Created ${createdEvents.length} events`);

    // Create sample jobs
    console.log('💼 Creating sample jobs...');
    const sampleJobs = [
      {
        title: 'Software Engineer Intern',
        company: 'Google',
        description: 'Summer internship opportunity for CS students.',
        location: 'Mountain View, CA',
        type: 'internship',
        salary: '$8,000/month',
        requirements: ['JavaScript', 'React', 'Node.js'],
        postedBy: createdUsers[1]._id,
        university: createdUniversities[0]._id
      },
      {
        title: 'Full Stack Developer',
        company: 'Microsoft',
        description: 'Entry-level full stack developer position.',
        location: 'Seattle, WA',
        type: 'full-time',
        salary: '$120,000/year',
        requirements: ['Python', 'Django', 'PostgreSQL'],
        postedBy: createdUsers[2]._id,
        university: createdUniversities[1]._id
      },
      {
        title: 'Data Science Intern',
        company: 'Meta',
        description: 'Work on cutting-edge ML models and data analysis.',
        location: 'Menlo Park, CA',
        type: 'internship',
        salary: '$9,500/month',
        requirements: ['Python', 'TensorFlow', 'SQL'],
        postedBy: createdUsers[3]._id,
        university: createdUniversities[2]._id
      }
    ];

    const createdJobs = await Job.insertMany(sampleJobs);
    console.log(`✅ Created ${createdJobs.length} jobs`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Sample credentials:');
    console.log('Admin: admin@alumni.com / admin123');
    console.log('Alumni: sarah.chen@gmail.com / password123');
    console.log('Student: john.student@university.edu / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();