import React, { useState, useEffect } from 'react';
import api from './api/config';
import { 
  ChevronDown, Users, MessageCircle, Calendar, Bot, School, User, UserCheck, Shield, 
  Mail, Phone, MapPin, Award, Briefcase, MessageSquare, Video, FileText, Star, 
  Search, Filter, Plus, Send, X, Heart, Share, ThumbsUp, Eye, Bell, Settings,
  UserPlus, UserMinus, Clock, CheckCircle, XCircle, Edit, Trash2, BookOpen,
  Code, Globe, Camera, Image, Hash, TrendingUp, Network, Building
} from 'lucide-react';

const AlumniPlatform = () => {
  const [currentPage, setCurrentPage] = useState('university-selection');

  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [userType, setUserType] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showUniversityModal, setShowUniversityModal] = useState(false);
  const [newUniversityName, setNewUniversityName] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [following, setFollowing] = useState(new Set());

  // Enhanced sample data
  const [universities] = useState([
    { id: 1, name: 'MIT - Massachusetts Institute of Technology', location: 'Cambridge, MA', verified: true, studentsCount: 4500, alumniCount: 2800 },
    { id: 2, name: 'Stanford University', location: 'Stanford, CA', verified: true, studentsCount: 7800, alumniCount: 5200 },
    { id: 3, name: 'IIT Bombay', location: 'Mumbai, India', verified: true, studentsCount: 10200, alumniCount: 8500 },
    { id: 4, name: 'Carnegie Mellon University', location: 'Pittsburgh, PA', verified: true, studentsCount: 6800, alumniCount: 4100 },
    { id: 5, name: 'Presidency University', location: 'Bengaluru, India', verified: true, studentsCount: 8500, alumniCount: 3200 }
  ]);

  const [events] = useState([
    {
      id: 1,
      title: 'Tech Career Fair 2025',
      date: '2025-02-15',
      time: '10:00 AM',
      type: 'career-fair',
      host: 'Alumni Association',
      description: 'Connect with top tech companies and alumni working in the industry.',
      attendees: 145,
      maxAttendees: 200
    },
    {
      id: 2,
      title: 'AI/ML Hackathon',
      date: '2025-03-01',
      time: '9:00 AM',
      type: 'hackathon',
      host: 'Computer Science Dept',
      description: '48-hour hackathon focused on AI and Machine Learning solutions.',
      attendees: 89,
      maxAttendees: 100
    },
    {
      id: 3,
      title: 'Alumni Networking Night',
      date: '2025-02-28',
      time: '6:00 PM',
      type: 'networking',
      host: 'Alumni Relations',
      description: 'An evening of networking with successful alumni from various industries.',
      attendees: 67,
      maxAttendees: 80
    }
  ]);

  const [jobs] = useState([
    {
      id: 1,
      title: 'Software Engineer Intern',
      company: 'Google',
      location: 'Mountain View, CA',
      type: 'internship',
      postedBy: 'John Doe (Alumni)',
      description: 'Summer internship opportunity for CS students.',
      salary: '$8,000/month',
      applicants: 23,
      requirements: ['JavaScript', 'React', 'Node.js']
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Microsoft',
      location: 'Seattle, WA',
      type: 'full-time',
      postedBy: 'Jane Smith (Alumni)',
      description: 'Entry-level full stack developer position.',
      salary: '$120,000/year',
      applicants: 45,
      requirements: ['Python', 'Django', 'PostgreSQL']
    },
    {
      id: 3,
      title: 'Data Science Intern',
      company: 'Meta',
      location: 'Menlo Park, CA',
      type: 'internship',
      postedBy: 'Raj Patel (Alumni)',
      description: 'Work on cutting-edge ML models and data analysis.',
      salary: '$9,500/month',
      applicants: 78,
      requirements: ['Python', 'TensorFlow', 'SQL']
    }
  ]);

  const [alumni] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      position: 'Senior Software Engineer',
      company: 'Google',
      graduationYear: 2018,
      skills: ['React', 'Node.js', 'Python'],
      followers: 245,
      bio: 'Passionate about building scalable web applications',
      profilePicture: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&h=200&fit=crop&crop=faces'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      position: 'Product Manager',
      company: 'Apple',
      graduationYear: 2017,
      skills: ['Product Strategy', 'UX Design', 'Analytics'],
      followers: 189,
      bio: 'Helping build the future of mobile technology',
      profilePicture: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&h=200&fit=crop&crop=faces'
    },
    {
      id: 3,
      name: 'Priya Sharma',
      position: 'Data Scientist',
      company: 'Netflix',
      graduationYear: 2019,
      skills: ['Machine Learning', 'Python', 'Statistics'],
      followers: 156,
      bio: 'Using data to create better user experiences',
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  ]);

  // Initialize sample posts
  useEffect(() => {
    if (currentUser) {
      const samplePosts = [
        {
          id: 1,
          author: { name: 'Sarah Chen', position: 'Senior Software Engineer at Google', profilePicture: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop&crop=faces' },
          content: 'Just wrapped up an amazing coding session! Remember, the best way to learn is by building. What are you working on today?',
          timestamp: '2 hours ago',
          likes: 24,
          comments: 5,
          isLiked: false
        },
        {
          id: 2,
          author: { name: 'Michael Rodriguez', position: 'Product Manager at Apple', profilePicture: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=faces' },
          content: 'Exciting news! Our team is hiring for multiple positions. If you\'re passionate about creating products that millions use daily, let\'s connect!',
          timestamp: '4 hours ago',
          likes: 67,
          comments: 12,
          isLiked: true
        },
        {
          id: 3,
          author: { name: 'Priya Sharma', position: 'Data Scientist at Netflix', profilePicture: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces' },
          content: 'Just published a new article on medium about machine learning in recommendation systems. Link in comments!',
          timestamp: '1 day ago',
          likes: 89,
          comments: 18,
          isLiked: false
        }
      ];
      setPosts(samplePosts);
      
      // Sample connection requests
      setConnectionRequests([
        {
          id: 1,
          from: { name: 'Alex Johnson', position: 'CS Student', message: 'Hi! I\'d love to connect and learn about your journey in tech.' },
          timestamp: '1 hour ago'
        },
        {
          id: 2,
          from: { name: 'Emily Davis', position: 'Final Year Student', message: 'Would love to get advice about career paths in product management.' },
          timestamp: '3 hours ago'
        }
      ]);
    }
  }, [currentUser]);

  // Navigation component
  const Navigation = () => (
    <nav className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <School className="h-8 w-8" />
          <div>
            <h1 className="text-xl font-bold">Alumni Connect</h1>
            {selectedUniversity && (
              <p className="text-xs text-blue-200">{selectedUniversity.name}</p>
            )}
          </div>
        </div>
        
        {selectedUniversity && (
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setCurrentPage('about')}
              className={`hover:text-blue-200 transition-colors ${currentPage === 'about' ? 'text-blue-200' : ''}`}
            >
              About
            </button>
            <button 
              onClick={() => setCurrentPage('events')}
              className={`hover:text-blue-200 transition-colors ${currentPage === 'events' ? 'text-blue-200' : ''}`}
            >
              Events
            </button>
            <button 
              onClick={() => setCurrentPage('contact')}
              className={`hover:text-blue-200 transition-colors ${currentPage === 'contact' ? 'text-blue-200' : ''}`}
            >
              Contact
            </button>
            
            {currentUser && (
              <>
                <button 
                  onClick={() => setCurrentPage('dashboard')}
                  className={`hover:text-blue-200 transition-colors ${currentPage === 'dashboard' ? 'text-blue-200' : ''}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setCurrentPage('jobs')}
                  className={`hover:text-blue-200 transition-colors ${currentPage === 'jobs' ? 'text-blue-200' : ''}`}
                >
                  Jobs
                </button>
                <button 
                  onClick={() => setCurrentPage('chat')}
                  className={`hover:text-blue-200 transition-colors ${currentPage === 'chat' ? 'text-blue-200' : ''} flex items-center`}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Chat
                </button>
                <button 
                  onClick={() => setCurrentPage('feed')}
                  className={`hover:text-blue-200 transition-colors ${currentPage === 'feed' ? 'text-blue-200' : ''} flex items-center`}
                >
                  <Hash className="h-4 w-4 mr-1" />
                  Feed
                </button>
                <button 
                  onClick={() => setCurrentPage('network')}
                  className={`hover:text-blue-200 transition-colors ${currentPage === 'network' ? 'text-blue-200' : ''} flex items-center`}
                >
                  <Network className="h-4 w-4 mr-1" />
                  Network
                </button>
              </>
            )}
          </div>
        )}
        
        {currentUser ? (
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-6 w-6 cursor-pointer hover:text-blue-200" />
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <img 
                src="/api/placeholder/32/32" 
                alt="Profile" 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium">{currentUser.name}</span>
            </div>
            <button 
              onClick={() => {
                setCurrentUser(null);
                setUserType(null);
                setCurrentPage('university-selection');
              }}
              className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          selectedUniversity && (
            <div className="flex space-x-2">
              <button 
                onClick={() => setCurrentPage('login')}
                className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 transition-colors"
              >
                Login
              </button>
            </div>
          )
        )}
      </div>
    </nav>
  );

  // University Selection Page
  const UniversitySelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Alumni Connect
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The intelligent platform connecting students and alumni worldwide. Find mentors, discover opportunities, and build lasting professional relationships.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 backdrop-blur-sm">
            <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Choose Your University</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {universities.map(uni => (
                <div 
                  key={uni.id}
                  onClick={() => {
                    setSelectedUniversity(uni);
                    setCurrentPage('about');
                  }}
                  className="group border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl cursor-pointer transition-all duration-300 hover:border-blue-400 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Building className="h-8 w-8 text-blue-600 group-hover:text-purple-600 transition-colors" />
                      {uni.verified && (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      )}
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div>{uni.studentsCount} Students</div>
                      <div>{uni.alumniCount} Alumni</div>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">{uni.name}</h3>
                  <p className="text-gray-600 flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    {uni.location}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        Active
                      </span>
                      {uni.verified && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="text-blue-600 group-hover:text-purple-600 transition-colors">
                      <ChevronDown className="h-5 w-5 transform group-hover:rotate-180 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center border-t pt-6">
              <p className="text-gray-600 mb-4 text-lg">Don't see your university?</p>
              <button 
                onClick={() => setShowUniversityModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 flex items-center mx-auto transition-all transform hover:scale-105 shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Request Your University
              </button>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-lg font-semibold mb-3">System Administrators</h3>
              <button 
                onClick={() => setCurrentPage('admin-login')}
                className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 flex items-center mx-auto transition-all"
              >
                <Shield className="h-5 w-5 mr-2" />
                Admin Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // About Page
  const AboutPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              Welcome to {selectedUniversity?.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join our thriving community of {selectedUniversity?.studentsCount} students and {selectedUniversity?.alumniCount} alumni. 
              Connect, learn, and grow together in the digital age.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered Matching</h3>
              <p className="text-gray-600">Smart algorithms connect students with the perfect alumni mentors based on career goals, interests, and compatibility.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-Time Communication</h3>
              <p className="text-gray-600">Instant messaging, video calls, and group discussions to maintain seamless communication across your network.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Exclusive Opportunities</h3>
              <p className="text-gray-600">Access job postings, internships, and collaboration opportunities shared directly by alumni and industry partners.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Events & Hackathons</h3>
              <p className="text-gray-600">Participate in career fairs, hackathons, workshops, and networking events organized by the alumni community.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Career Assistant</h3>
              <p className="text-gray-600">Get personalized career advice, skill recommendations, and guidance from our intelligent chatbot assistant.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Analytics & Insights</h3>
              <p className="text-gray-600">Track your networking progress, engagement metrics, and career development milestones.</p>
            </div>
          </div>

          {!currentUser && (
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
              <h2 className="text-3xl font-semibold mb-8">Ready to Connect?</h2>
              <div className="flex justify-center space-x-6">
                <button 
                  onClick={() => {
                    setUserType('student');
                    setCurrentPage('login');
                  }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 flex items-center text-lg font-medium transition-all transform hover:scale-105 shadow-lg"
                >
                  <User className="h-6 w-6 mr-3" />
                  Join as Student
                </button>
                <button 
                  onClick={() => {
                    setUserType('alumni');
                    setCurrentPage('login');
                  }}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-10 py-4 rounded-xl hover:from-green-700 hover:to-green-800 flex items-center text-lg font-medium transition-all transform hover:scale-105 shadow-lg"
                >
                  <UserCheck className="h-6 w-6 mr-3" />
                  Join as Alumni
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Login Page
  const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      setTimeout(() => {
        setCurrentUser({
          id: 1,
          name: isRegister ? name : (userType === 'student' ? 'John Student' : 'Jane Alumni'),
          email: email,
          type: userType,
          university: selectedUniversity
        });
        setCurrentPage('dashboard');
        setLoading(false);
      }, 1500);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                {userType === 'student' ? (
                  <User className="h-10 w-10 text-white" />
                ) : (
                  <UserCheck className="h-10 w-10 text-white" />
                )}
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                {isRegister ? 'Create Account' : `${userType === 'student' ? 'Student' : 'Alumni'} Login`}
              </h2>
              <p className="text-gray-600 mt-2">{selectedUniversity?.name}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {isRegister && (
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Enter your full name"
                    required={isRegister}
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder={userType === 'student' ? 'student@university.edu' : 'alumni@company.com'}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none font-semibold"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {isRegister ? 'Creating Account...' : 'Signing In...'}
                  </div>
                ) : (
                  isRegister ? 'Create Account' : 'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button 
                onClick={() => setIsRegister(!isRegister)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {isRegister ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
              </button>
            </div>

            <div className="mt-4 text-center">
              <button 
                onClick={() => setCurrentPage('about')}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                Back to About
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard
  const Dashboard = () => {
    const isStudent = currentUser?.type === 'student';
    const isAlumni = currentUser?.type === 'alumni';

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome back, {currentUser?.name}!
            </h1>
            <p className="text-gray-600 text-lg">
              {isStudent ? 'Student' : 'Alumni'} Dashboard - {selectedUniversity?.name}
            </p>
          </div>
         
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Total Connections</h3>
                  <p className="text-3xl font-bold">
                    {isStudent ? '12' : '47'}
                  </p>
                </div>
                <Users className="h-12 w-12 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Events Joined</h3>
                  <p className="text-3xl font-bold">
                    {isStudent ? '5' : '8'}
                  </p>
                </div>
                <Calendar className="h-12 w-12 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{isStudent ? 'Applications' : 'Jobs Posted'}</h3>
                  <p className="text-3xl font-bold">
                    {isStudent ? '3' : '2'}
                  </p>
                </div>
                <Briefcase className="h-12 w-12 opacity-80" />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-blue-600" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  {isStudent ? (
                    <>
                      <button 
                        onClick={() => setCurrentPage('network')}
                        className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 p-3 rounded-lg text-left flex items-center transition-colors"
                      >
                        <UserPlus className="h-5 w-5 mr-3" />
                        Find Alumni Mentors
                      </button>
                      <button 
                        onClick={() => setCurrentPage('jobs')}
                        className="w-full bg-green-50 hover:bg-green-100 text-green-700 p-3 rounded-lg text-left flex items-center transition-colors"
                      >
                        <Search className="h-5 w-5 mr-3" />
                        Browse Job Opportunities
                      </button>
                      <button 
                        onClick={() => setCurrentPage('events')}
                        className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 p-3 rounded-lg text-left flex items-center transition-colors"
                      >
                        <Calendar className="h-5 w-5 mr-3" />
                        Join Upcoming Events
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => setCurrentPage('network')}
                        className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 p-3 rounded-lg text-left flex items-center transition-colors"
                      >
                        <Users className="h-5 w-5 mr-3" />
                        Connect with Students
                      </button>
                      <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 p-3 rounded-lg text-left flex items-center transition-colors">
                        <Plus className="h-5 w-5 mr-3" />
                        Post Job Opening
                      </button>
                      <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 p-3 rounded-lg text-left flex items-center transition-colors">
                        <Video className="h-5 w-5 mr-3" />
                        Schedule Mentoring Session
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Connection Requests */}
              {connectionRequests.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <UserPlus className="h-5 w-5 mr-2 text-orange-600" />
                    Connection Requests ({connectionRequests.length})
                  </h3>
                  <div className="space-y-4">
                    {connectionRequests.slice(0, 3).map(request => (
                      <div key={request.id} className="border border-gray-200 p-4 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-sm">{request.from.name}</h4>
                            <p className="text-xs text-gray-600">{request.from.position}</p>
                          </div>
                          <span className="text-xs text-gray-500">{request.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{request.from.message}</p>
                        <div className="flex space-x-2">
                          <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                            Accept
                          </button>
                          <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-400 transition-colors">
                            Decline
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recent Activity & Feed */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Hash className="h-5 w-5 mr-2 text-green-600" />
                  Recent Activity
                </h3>
                <div className="space-y-6">
                  {posts.slice(0, 3).map(post => (
                    <div key={post.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-start space-x-3">
                        <img 
                          src={post.author.profilePicture} 
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-sm">{post.author.name}</h4>
                            <span className="text-xs text-gray-500">{post.author.position}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{post.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">{post.content}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <button className={`flex items-center space-x-1 hover:text-red-600 transition-colors ${post.isLiked ? 'text-red-600' : ''}`}>
                              <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                              <MessageCircle className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-green-600 transition-colors">
                              <Share className="h-4 w-4" />
                              <span>Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <button 
                    onClick={() => setCurrentPage('feed')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Full Feed
                  </button>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                  Upcoming Events
                </h3>
                <div className="space-y-4">
                  {events.slice(0, 3).map(event => (
                    <div key={event.id} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">{event.title}</h4>
                          <p className="text-xs text-gray-600 mb-2">{event.description}</p>
                          <div className="flex items-center text-xs text-gray-500 space-x-4">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {event.date}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {event.time}
                            </span>
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {event.attendees}/{event.maxAttendees}
                            </span>
                          </div>
                        </div>
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors">
                          Join
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <button 
                    onClick={() => setCurrentPage('events')}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    View All Events
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Events Page
  // const EventsPage = () => (
  //   <div className="min-h-screen bg-gray-50">
  //     <div className="container mx-auto px-4 py-8">
  //       <div className="mb-8">
  //         <h1 className="text-3xl font-bold text-gray-800 mb-2">Upcoming Events</h1>
  //         <p className="text-gray-600">Discover and join events happening at {selectedUniversity?.name}</p>
  //       </div>

  //       <div className="grid lg:grid-cols-4 gap-6">
  //         {/* Filters */}
  //         <div className="lg:col-span-1">
  //           <div className="bg-white p-6 rounded-xl shadow-lg">
  //             <h3 className="font-semibold mb-4 flex items-center">
  //               <Filter className="h-5 w-5 mr-2 text-blue-600" />
  //               Filter Events
  //             </h3>
  //             <div className="space-y-4">
  //               <div>
  //                 <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
  //                 <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500">
  //                   <option>All Types</option>
  //                   <option>Career Fair</option>
  //                   <option>Hackathon</option>
  //                   <option>Workshop</option>
  //                   <option>Networking</option>
  //                 </select>
  //               </div>
  //               <div>
  //                 <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
  //                 <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500">
  //                   <option>This Week</option>
  //                   <option>This Month</option>
  //                   <option>Next 3 Months</option>
  //                 </select>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Events List */}
  //         <div className="lg:col-span-3">
  //           <div className="space-y-6">
  //             {events.map(event => (
  //               <div key={event.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
  //                 <div className="flex justify-between items-start mb-4">
  //                   <div>
  //                     <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
  //                     <p className="text-gray-600 mb-3">{event.description}</p>
  //                     <div className="flex items-center space-x-6 text-sm text-gray-500">
  //                       <span className="flex items-center">
  //                         <Calendar className="h-4 w-4 mr-1" />
  //                         {event.date}
  //                       </span>
  //                       <span className="flex items-center">
  //                         <Clock className="h-4 w-4 mr-1" />
  //                         {event.time}
  //                       </span>
  //                       <span className="flex items-center">
  //                         <User className="h-4 w-4 mr-1" />
  //                         {event.host}
  //                       </span>
  //                     </div>
  //                   </div>
  //                   <div className="text-right">
  //                     <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-2">
  //                       {event.type.replace('-', ' ').toUpperCase()}
  //                     </div>
  //                     <div className="text-sm text-gray-600">
  //                       {event.attendees}/{event.maxAttendees} attending
  //                     </div>
  //                   </div>
  //                 </div>
  //                 <div className="flex justify-between items-center pt-4 border-t border-gray-200">
  //                   <div className="flex items-center space-x-4 text-sm text-gray-500">
  //                     <span className="flex items-center">
  //                       <Users className="h-4 w-4 mr-1" />
  //                       {event.attendees} attendees
  //                     </span>
  //                     <span className={`px-2 py-1 rounded-full text-xs ${
  //                       event.attendees < event.maxAttendees ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  //                     }`}>
  //                       {event.attendees < event.maxAttendees ? 'Open' : 'Full'}
  //                     </span>
  //                   </div>
  //                   <button 
  //                     className={`px-6 py-2 rounded-lg font-medium transition-colors ${
  //                       event.attendees < event.maxAttendees 
  //                         ? 'bg-blue-600 text-white hover:bg-blue-700' 
  //                         : 'bg-gray-300 text-gray-500 cursor-not-allowed'
  //                     }`}
  //                     disabled={event.attendees >= event.maxAttendees}
  //                   >
  //                     {event.attendees < event.maxAttendees ? 'Join Event' : 'Event Full'}
  //                   </button>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  // EVENTS PAGE — UPDATED WITH JOIN FORM + JOINED BUTTON
const EventsPage = () => {
  // Track modal visibility
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Track joined events
  const [joinedEvents, setJoinedEvents] = useState(new Set());

  // Form fields
  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [participantPhone, setParticipantPhone] = useState("");

  const handleSubmitJoin = () => {
    if (!participantName || !participantEmail || !participantPhone) {
      alert("Please fill all fields!");
      return;
    }

    // Mark event as joined
    setJoinedEvents(new Set([...joinedEvents, selectedEvent.id]));

    alert("Successfully Joined Event!");

    // Reset form
    setParticipantName("");
    setParticipantEmail("");
    setParticipantPhone("");

    setShowJoinModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Upcoming Events</h1>
          <p className="text-gray-600">
            Discover and join events happening at {selectedUniversity?.name}
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">

          {/* FILTERS */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-blue-600" />
                Filter Events
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Event Type</label>
                  <select className="w-full border px-3 py-2 rounded-lg">
                    <option>All Types</option>
                    <option>Career Fair</option>
                    <option>Hackathon</option>
                    <option>Workshop</option>
                    <option>Networking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Date Range</label>
                  <select className="w-full border px-3 py-2 rounded-lg">
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>Next 3 Months</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* EVENTS LIST */}
          <div className="lg:col-span-3">
            <div className="space-y-6">

              {events.map(event => (
                <div
                  key={event.id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">

                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {event.title}
                      </h3>

                      <p className="text-gray-600 mb-3">{event.description}</p>

                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" /> {event.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" /> {event.time}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" /> 
                          {event.attendees}/{event.maxAttendees}
                        </span>
                      </div>
                    </div>

                    {/* JOIN BUTTON */}
                    <button
                      disabled={joinedEvents.has(event.id)}
                      onClick={() => {
                        if (!joinedEvents.has(event.id)) {
                          setSelectedEvent(event);
                          setShowJoinModal(true);
                        }
                      }}
                      className={`px-5 py-2 rounded-lg transition ${
                        joinedEvents.has(event.id)
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {joinedEvents.has(event.id) ? "Joined" : "Join"}
                    </button>

                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* JOIN FORM MODAL */}
        {showJoinModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">

              <h2 className="text-xl font-bold mb-4">
                Join {selectedEvent?.title}
              </h2>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  value={participantEmail}
                  onChange={(e) => setParticipantEmail(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder="Enter your email"
                  type="email"
                />
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  value={participantPhone}
                  onChange={(e) => setParticipantPhone(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowJoinModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmitJoin}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Join Event
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};


 
 // Jobs Page (FULL UPDATED WITH APPLY FORM + APPLIED BUTTON)
const JobsPage = () => {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Form fields
  const [applicantName, setApplicantName] = useState("");
  const [applicantResume, setApplicantResume] = useState(null);
  const [applicantCGPA, setApplicantCGPA] = useState("");

  // Track applied jobs
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  const handleSubmitApplication = () => {
    if (!applicantName || !applicantResume || !applicantCGPA) {
      alert("Please fill all fields!");
      return;
    }

    // Mark job as applied
    setAppliedJobs(new Set([...appliedJobs, selectedJob.id]));

    alert("Application Submitted Successfully!");

    // Reset form
    setApplicantName("");
    setApplicantCGPA("");
    setApplicantResume(null);
    setShowApplyModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Job Opportunities</h1>
          <p className="text-gray-600">Discover career opportunities posted by alumni and partners</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-blue-600" />
                Filter Jobs
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Job Type</label>
                  <select className="w-full border px-3 py-2 rounded-lg">
                    <option>All Types</option>
                    <option>Full-time</option>
                    <option>Internship</option>
                    <option>Part-time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Location</label>
                  <input
                    className="w-full border px-3 py-2 rounded-lg"
                    placeholder="Enter location"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {jobs.map(job => (
                <div key={job.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">

                  <div className="flex justify-between items-start mb-4">

                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>

                      <div className="flex items-center space-x-4 text-gray-600 mt-1">
                        <span className="flex items-center"><Building className="h-4 w-4 mr-1"/> {job.company}</span>
                        <span className="flex items-center"><MapPin className="h-4 w-4 mr-1"/> {job.location}</span>
                      </div>

                      <p className="text-gray-600 mt-3">{job.description}</p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {job.requirements.map((req, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm mb-2 ${
                        job.type === "internship"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {job.type.toUpperCase()}
                      </div>

                      <div className="font-bold text-lg">{job.salary}</div>
                    </div>

                  </div>

                  <div className="flex justify-between items-center border-t pt-4">
                    <span className="text-gray-500 text-sm">
                      Posted by {job.postedBy} • {job.applicants} applicants
                    </span>

                    {/* APPLY / APPLIED BUTTON */}
                    <button
                      disabled={appliedJobs.has(job.id)}
                      onClick={() => {
                        if (!appliedJobs.has(job.id)) {
                          setSelectedJob(job);
                          setShowApplyModal(true);
                        }
                      }}
                      className={`px-6 py-2 rounded-lg transition-colors ${
                        appliedJobs.has(job.id)
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {appliedJobs.has(job.id) ? "Applied" : "Apply Now"}
                    </button>

                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* APPLY FORM MODAL */}
        {showApplyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">

              <h2 className="text-xl font-bold mb-4">
                Apply for {selectedJob?.title}
              </h2>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder="Enter your name"
                />
              </div>

              {/* CGPA */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">CGPA</label>
                <input
                  value={applicantCGPA}
                  onChange={(e) => setApplicantCGPA(e.target.value)}
                  type="number"
                  step="0.01"
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder="Enter your CGPA"
                />
              </div>

              {/* Resume */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Upload Resume (PDF)</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setApplicantResume(e.target.files[0])}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmitApplication}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit Application
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};




  // Network Page
   const NetworkPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Network</h1>
          <p className="text-gray-600">Connect with alumni and students from {selectedUniversity?.name}</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Search & Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
              <div className="relative mb-4">
                <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search people..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500">
                    <option>All</option>
                    <option>Students</option>
                    <option>Alumni</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500">
                    <option>All Industries</option>
                    <option>Technology</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500">
                    <option>Any Year</option>
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                    <option>Earlier</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* People Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {alumni.map(person => (
                <div key={person.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-center mb-4">
                    <img 
                      src={person.profilePicture} 
                      alt={person.name}
                      className="w-20 h-20 rounded-full mx-auto mb-3"
                    />
                    <h3 className="font-semibold text-lg">{person.name}</h3>
                    <p className="text-gray-600 text-sm mb-1">{person.position}</p>
                    <p className="text-gray-500 text-sm">{person.company}</p>
                    <p className="text-blue-600 text-sm">Class of {person.graduationYear}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-700 text-sm text-center mb-3">{person.bio}</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {person.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {person.followers} followers
                    </span>
                    <button 
                      onClick={() => {
                        if (following.has(person.id)) {
                          setFollowing(new Set([...following].filter(id => id !== person.id)));
                        } else {
                          setFollowing(new Set([...following, person.id]));
                        }
                      }}
                      className={`flex items-center text-xs px-3 py-1 rounded-full transition-colors ${
                        following.has(person.id) 
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {following.has(person.id) ? (
                        <>
                          <UserMinus className="h-3 w-3 mr-1" />
                          Unfollow
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-3 w-3 mr-1" />
                          Follow
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        setActiveChat(person);
                        setCurrentPage('chat');
                      }}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Message
                    </button>
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
                      Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  //chat page

// Chat Page (you'll need this for the message functionality)
const ChatPage = () => {
  const handleSendMessage = () => {
    if (currentMessage.trim() && activeChat) {
      const newMessage = {
        id: Date.now(),
        sender: currentUser.name,
        message: currentMessage,
        timestamp: new Date().toLocaleTimeString(),
        isMe: true
      };

      setChatMessages([...chatMessages, newMessage]);
      setCurrentMessage('');

      // Simulate response after a short delay
      setTimeout(() => {
        const response = {
          id: Date.now() + 1,
          sender: activeChat.name,
          message: "Thanks for reaching out! I'd be happy to help with your questions.",
          timestamp: new Date().toLocaleTimeString(),
          isMe: false
        };
        setChatMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg h-[600px] flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-lg flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
                  Messages
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-3">
                  {alumni.map(person => (
                    <div 
                      key={person.id}
                      onClick={() => setActiveChat(person)}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        activeChat?.id === person.id ? 'bg-blue-50 border-l-4 border-blue-600' : 'hover:bg-gray-50'
                      }`}
                    >
                      <img 
                        src={person.profilePicture} 
                        alt={person.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{person.name}</h4>
                        <p className="text-xs text-gray-500 truncate">{person.position}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-3">
            {activeChat ? (
              <div className="bg-white rounded-xl shadow-lg h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
                  <img 
                    src={activeChat.profilePicture} 
                    alt={activeChat.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{activeChat.name}</h3>
                    <p className="text-sm text-gray-500">{activeChat.position} at {activeChat.company}</p>
                  </div>
                  <div className="ml-auto flex space-x-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Video className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Phone className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">
                      <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Start a conversation with {activeChat.name}</p>
                    </div>
                  ) : (
                    chatMessages.map(message => (
                      <div key={message.id} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isMe 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-800'
                        }`}>
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            message.isMe ? 'text-blue-200' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg h-[600px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                  <p>Choose someone from your contacts to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

  // Feed Page


const FeedPage = () => {
  const [attachments, setAttachments] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);

    setAttachments(files);

    const urls = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image")
        ? "image"
        : file.type.startsWith("video")
        ? "video"
        : "document"
    }));

    setPreviewURLs(urls);
  };

  const handleNewPost = () => {
    if (newPost.trim() || attachments.length > 0) {
      const post = {
        id: Date.now(),
        author: {
          name: currentUser.name,
          position: currentUser.type === "student" ? "Student" : "Alumni",
          profilePicture:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=faces&fit=crop&w=200&h=200",
        },
        content: newPost,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        isLiked: false,
        attachments: previewURLs
      };

      setPosts([post, ...posts]);
      setNewPost("");
      setAttachments([]);
      setPreviewURLs([]);
    }
  };

  const handleLikePost = (postId) => {
    setPosts(
      posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              isLiked: !p.isLiked,
              likes: p.isLiked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          {/* Create Post */}
          <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
            <div className="flex items-start space-x-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=faces&fit=crop&w=200&h=200"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />

              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none"
                  rows="3"
                />

                {/* PREVIEW SELECTED FILES */}
                {previewURLs.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {previewURLs.map((item, idx) => (
                      <div key={idx}>
                        {item.type === "image" && (
                          <img
                            src={item.url}
                            className="w-full rounded-lg"
                            alt="Preview"
                          />
                        )}

                        {item.type === "video" && (
                          <video
                            src={item.url}
                            controls
                            className="w-full rounded-lg"
                          />
                        )}

                        {item.type === "document" && (
                          <div className="p-3 bg-gray-100 rounded-lg">
                            <FileText className="inline-block mr-2" />
                            {item.file.name}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center mt-3">
                  <div className="flex space-x-3 text-gray-500">
                    {/* IMAGE UPLOAD */}
                    <label className="flex items-center cursor-pointer hover:text-blue-600">
                      <Image className="h-5 w-5 mr-1" />
                      Photo
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFileSelect}
                      />
                    </label>

                    {/* VIDEO UPLOAD */}
                    <label className="flex items-center cursor-pointer hover:text-green-600">
                      <Video className="h-5 w-5 mr-1" />
                      Video
                      <input
                        type="file"
                        accept="video/*"
                        hidden
                        onChange={handleFileSelect}
                      />
                    </label>

                    {/* DOCUMENT UPLOAD */}
                    <label className="flex items-center cursor-pointer hover:text-purple-600">
                      <FileText className="h-5 w-5 mr-1" />
                      Document
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        hidden
                        onChange={handleFileSelect}
                      />
                    </label>
                  </div>

                  <button
                    onClick={handleNewPost}
                    disabled={!newPost.trim() && attachments.length === 0}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FEED LIST */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-xl shadow-lg">

                {/* Author */}
                <div className="flex items-start space-x-3 mb-4">
                  <img
                    src={post.author.profilePicture}
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{post.author.name}</h4>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </div>
                </div>

                {/* Content */}
                <p className="text-gray-800 mb-4">{post.content}</p>

                {/* ATTACHMENTS RENDER */}
                {post.attachments &&
                  post.attachments.map((item, idx) => (
                    <div key={idx} className="mb-3">
                      {item.type === "image" && (
                        <img src={item.url} className="w-full rounded-lg" />
                      )}

                      {item.type === "video" && (
                        <video src={item.url} controls className="w-full rounded-lg" />
                      )}

                      {item.type === "document" && (
                        <a
                          href={item.url}
                          target="_blank"
                          className="p-3 bg-gray-100 block rounded-lg"
                        >
                          <FileText className="inline-block mr-2" />
                          {item.file.name}
                        </a>
                      )}
                    </div>
                  ))}

                {/* Footer Actions */}
                <div className="flex items-center space-x-6 pt-4 border-t">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center space-x-1 ${
                      post.isLiked ? "text-red-600" : "text-gray-500"
                    }`}
                  >
                    <Heart className="h-5 w-5" />
                    <span>{post.likes}</span>
                  </button>

                  <button className="flex items-center space-x-1 text-gray-500">
                    <MessageCircle className="h-5 w-5" />
                    <span>{post.comments}</span>
                  </button>

                  <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors">
               <Share className="h-5 w-5" />
  <span className="text-sm">Share</span>
</button>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};


   // Contact Page
  const ContactPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">alumni@{selectedUniversity?.name.toLowerCase().replace(/\s+/g, '')}.edu</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-gray-600">{selectedUniversity?.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Admin Login Page
  const AdminLoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <Shield className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800">Admin Portal</h2>
            <p className="text-gray-600 mt-2">System Administrator Access</p>
          </div>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Admin ID
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                placeholder="Enter admin ID"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 px-6 rounded-xl hover:bg-red-700 transition-colors font-semibold"
            >
              Access Admin Panel
            </button>
          </form>
          <div className="mt-4 text-center">
            <button 
              onClick={() => setCurrentPage('university-selection')}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render function to show the correct page
  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'university-selection':
        return <UniversitySelection />;
      case 'about':
        return <AboutPage />;
      case 'login':
        return <LoginPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'events':
        return <EventsPage />;
      case 'jobs':
        return <JobsPage />;
      case 'network':
        return <NetworkPage />;
      case 'chat':
        return <ChatPage />;
      case 'feed':
        return <FeedPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin-login':
        return <AdminLoginPage />;
      default:
        return <UniversitySelection />;
    }
  };

   return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      {renderCurrentPage()}
      
      {/* University Request Modal */}
      {showUniversityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-4">Request Your University</h3>
            <p className="text-gray-600 mb-6">
              Don't see your university listed? Submit a request and we'll add it to our platform.
            </p>
            <input
              type="text"
              value={newUniversityName}
              onChange={(e) => setNewUniversityName(e.target.value)}
              placeholder="University name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl mb-6 focus:outline-none focus:border-blue-500"
            />
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setShowUniversityModal(false);
                  setNewUniversityName('');
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Here you would typically send the request to your backend
                  alert('University request submitted!');
                  setShowUniversityModal(false);
                  setNewUniversityName('');
                }}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  
};
export default AlumniPlatform;