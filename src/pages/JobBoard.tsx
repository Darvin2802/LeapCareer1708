import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Filter,
  Heart,
  ExternalLink,
  Building,
  Users,
  CheckCircle
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  visaSponsorship: boolean;
  h1bFriendly: boolean;
  description: string;
  requirements: string[];
  benefits: string[];
  companySize: string;
  industry: string;
}

const JobBoard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [visaFilter, setVisaFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      salary: '$120K - $180K',
      type: 'Full-time',
      posted: '2 days ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Join our team to build scalable systems that impact billions of users.',
      requirements: ['BS in Computer Science', '3+ years experience', 'Python, Java'],
      benefits: ['Health Insurance', 'Stock Options', 'Visa Sponsorship'],
      companySize: '100,000+',
      industry: 'Technology'
    },
    {
      id: '2',
      title: 'Data Scientist',
      company: 'Netflix',
      location: 'Los Gatos, CA',
      salary: '$130K - $200K',
      type: 'Full-time',
      posted: '1 day ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Drive data-driven decisions to enhance user experience.',
      requirements: ['MS in Statistics/CS', 'Machine Learning', 'Python, R'],
      benefits: ['Unlimited PTO', 'Health Insurance', 'H-1B Support'],
      companySize: '10,000+',
      industry: 'Entertainment'
    },
    {
      id: '3',
      title: 'Product Manager',
      company: 'Microsoft',
      location: 'Seattle, WA',
      salary: '$140K - $220K',
      type: 'Full-time',
      posted: '3 days ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Lead product strategy for cloud-based solutions.',
      requirements: ['MBA preferred', '5+ years PM experience', 'Technical background'],
      benefits: ['Stock Options', 'Health Insurance', 'Immigration Support'],
      companySize: '100,000+',
      industry: 'Technology'
    }
  ];

  const toggleSaveJob = (jobId: string) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === '' || 
                           job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesVisa = visaFilter === 'all' || 
                       (visaFilter === 'visa' && job.visaSponsorship) ||
                       (visaFilter === 'h1b' && job.h1bFriendly);
    
    return matchesSearch && matchesLocation && matchesVisa;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Board</h1>
          <p className="text-gray-600">Discover visa-sponsored opportunities from top US companies</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Job title or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <select
                value={visaFilter}
                onChange={(e) => setVisaFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Jobs</option>
                <option value="visa">Visa Sponsorship</option>
                <option value="h1b">H-1B Friendly</option>
              </select>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>All Types</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>All Industries</option>
                    <option>Technology</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>Consulting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>All Levels</option>
                    <option>Entry Level</option>
                    <option>Mid Level</option>
                    <option>Senior Level</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    {job.visaSponsorship && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                        Visa Sponsor
                      </span>
                    )}
                    {job.h1bFriendly && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                        H-1B Friendly
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Building className="h-4 w-4 mr-1" />
                    <span className="font-medium mr-4">{job.company}</span>
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="mr-4">{job.location}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{job.posted}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {job.type}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {job.companySize}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleSaveJob(job.id)}
                  className={`p-2 rounded-full transition-colors ${
                    savedJobs.has(job.id)
                      ? 'text-red-500 bg-red-50 hover:bg-red-100'
                      : 'text-gray-400 hover:text-red-500 hover:bg-gray-50'
                  }`}
                >
                  <Heart className="h-5 w-5" fill={savedJobs.has(job.id) ? 'currentColor' : 'none'} />
                </button>
              </div>

              <p className="text-gray-700 mb-4">{job.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 text-blue-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Industry:</span> {job.industry}
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    Save Job
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    Apply Now
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> Visa sponsorship information is based on company policies and may change. 
            Always verify current sponsorship availability directly with employers. This platform does not guarantee 
            visa sponsorship or provide legal immigration advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobBoard;