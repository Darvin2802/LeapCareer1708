import React, { useState } from 'react';
import { 
  Users, 
  Star, 
  MessageCircle, 
  Video, 
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  Filter,
  Search
} from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  expertise: string[];
  rating: number;
  reviews: number;
  university: string;
  sessions: number;
  availability: string;
  price: string;
  bio: string;
  visaJourney: string;
  avatar: string;
}

const Mentorship: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Raj Patel',
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'San Francisco, CA',
      experience: '8 years',
      expertise: ['Software Engineering', 'H-1B Process', 'System Design', 'Career Growth'],
      rating: 4.9,
      reviews: 156,
      university: 'IIT Bombay → Stanford',
      sessions: 400,
      availability: 'Weekends',
      price: '$80/hour',
      bio: 'Passionate about helping fellow Indians navigate the tech industry. Went from F-1 to H-1B to Green Card.',
      visaJourney: 'F-1 → OPT → H-1B → Green Card (2016-2023)',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      title: 'Product Manager',
      company: 'Netflix',
      location: 'Los Angeles, CA',
      experience: '6 years',
      expertise: ['Product Management', 'Career Transition', 'Visa Sponsorship', 'Leadership'],
      rating: 4.8,
      reviews: 89,
      university: 'Delhi University → USC',
      sessions: 250,
      availability: 'Evenings',
      price: '$100/hour',
      bio: 'Transitioned from engineering to product management. Happy to share insights on career pivots and visa journey.',
      visaJourney: 'F-1 → OPT Extension → H-1B → Currently in process',
      avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      name: 'Arjun Mehta',
      title: 'Data Science Manager',
      company: 'Microsoft',
      location: 'Seattle, WA',
      experience: '10 years',
      expertise: ['Data Science', 'Machine Learning', 'Team Leadership', 'Immigration'],
      rating: 4.9,
      reviews: 203,
      university: 'IIT Delhi → MIT',
      sessions: 500,
      availability: 'Flexible',
      price: '$120/hour',
      bio: 'Leading ML teams at Microsoft. Mentor on technical skills, leadership, and the complete US immigration journey.',
      visaJourney: 'F-1 → OPT → H-1B → Green Card → Citizen (2010-2023)',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExpertise = expertiseFilter === '' || 
                            mentor.expertise.some(exp => exp.toLowerCase().includes(expertiseFilter.toLowerCase()));
    const matchesCompany = companyFilter === '' || 
                          mentor.company.toLowerCase().includes(companyFilter.toLowerCase());
    
    return matchesSearch && matchesExpertise && matchesCompany;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Mentor</h1>
          <p className="text-gray-600">Connect with successful professionals who understand your journey</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, title, or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Expertise (e.g., Software Engineering)"
                value={expertiseFilter}
                onChange={(e) => setExpertiseFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Company"
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </button>

          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>All Prices</option>
                    <option>Under $50/hour</option>
                    <option>$50-$100/hour</option>
                    <option>$100+/hour</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Any Time</option>
                    <option>Weekdays</option>
                    <option>Weekends</option>
                    <option>Evenings</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>All Ratings</option>
                    <option>4.5+ Stars</option>
                    <option>4.0+ Stars</option>
                    <option>3.5+ Stars</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mentor Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{mentor.name}</h3>
                  <p className="text-gray-600">{mentor.title}</p>
                  <div className="flex items-center mt-1">
                    <Briefcase className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600 mr-3">{mentor.company}</span>
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">{mentor.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-green-600">{mentor.price}</div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {mentor.rating} ({mentor.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  <span className="mr-4">{mentor.university}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="mr-4">{mentor.experience}</span>
                  <Users className="h-4 w-4 mr-1" />
                  <span>{mentor.sessions} sessions</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">{mentor.bio}</p>
                
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Visa Journey:</h4>
                  <p className="text-sm text-blue-600 font-medium">{mentor.visaJourney}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Expertise:</h4>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Available: {mentor.availability}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Video className="h-4 w-4 mr-2" />
                  Book Session
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}

        {/* How Mentorship Works */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How Mentorship Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Find Your Mentor</h3>
              <p className="text-gray-600 text-sm">Browse mentors by expertise, company, and visa journey</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Book a Session</h3>
              <p className="text-gray-600 text-sm">Schedule 1-on-1 video calls at your convenience</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Grow Your Career</h3>
              <p className="text-gray-600 text-sm">Get personalized guidance and achieve your goals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;