import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  CheckCircle,
  Zap,
  TrendingUp,
  Star,
  BookmarkPlus,
  Eye
} from 'lucide-react';
import { useAdvancedSearch } from '../hooks/useAdvancedSearch';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNotifications } from '../hooks/useNotifications';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import VirtualizedList from '../components/ui/VirtualizedList';

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
  remote: boolean;
  urgentHiring: boolean;
  featured: boolean;
  applicationCount: number;
  matchScore?: number;
}

const JobBoard: React.FC = () => {
  const [savedJobs, setSavedJobs] = useLocalStorage<Set<string>>('savedJobs', new Set());
  const [viewedJobs, setViewedJobs] = useLocalStorage<Set<string>>('viewedJobs', new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useNotifications();

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      salary: '$150K - $220K',
      type: 'Full-time',
      posted: '2 hours ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Join our team to build scalable systems that impact billions of users worldwide. Work on cutting-edge technology with the best engineers in the industry.',
      requirements: ['BS/MS in Computer Science', '5+ years experience', 'Python, Java, Go', 'Distributed Systems'],
      benefits: ['Health Insurance', 'Stock Options', 'Visa Sponsorship', '401k Match', 'Free Meals'],
      companySize: '100,000+',
      industry: 'Technology',
      remote: false,
      urgentHiring: true,
      featured: true,
      applicationCount: 234,
      matchScore: 95
    },
    {
      id: '2',
      title: 'Machine Learning Engineer',
      company: 'Netflix',
      location: 'Los Gatos, CA',
      salary: '$160K - $240K',
      type: 'Full-time',
      posted: '1 day ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Drive data-driven decisions to enhance user experience through advanced ML algorithms and recommendation systems.',
      requirements: ['MS in ML/Statistics', 'Python, TensorFlow', '3+ years ML experience', 'A/B Testing'],
      benefits: ['Unlimited PTO', 'Health Insurance', 'H-1B Support', 'Stock Options', 'Learning Budget'],
      companySize: '10,000+',
      industry: 'Entertainment',
      remote: true,
      urgentHiring: false,
      featured: true,
      applicationCount: 156,
      matchScore: 88
    },
    {
      id: '3',
      title: 'Product Manager',
      company: 'Microsoft',
      location: 'Seattle, WA',
      salary: '$140K - $200K',
      type: 'Full-time',
      posted: '3 days ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Lead product strategy for cloud-based solutions serving millions of enterprise customers.',
      requirements: ['MBA preferred', '4+ years PM experience', 'Technical background', 'Azure knowledge'],
      benefits: ['Stock Options', 'Health Insurance', 'Immigration Support', 'Flexible Hours'],
      companySize: '100,000+',
      industry: 'Technology',
      remote: false,
      urgentHiring: false,
      featured: false,
      applicationCount: 89,
      matchScore: 82
    },
    {
      id: '4',
      title: 'Data Scientist',
      company: 'Meta',
      location: 'Menlo Park, CA',
      salary: '$145K - $210K',
      type: 'Full-time',
      posted: '5 days ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Analyze user behavior and build predictive models to improve product engagement across Facebook family of apps.',
      requirements: ['PhD in Statistics/CS', 'Python, R, SQL', 'Deep Learning', 'Causal Inference'],
      benefits: ['RSUs', 'Health Insurance', 'Visa Support', 'Gym Membership', 'Free Transportation'],
      companySize: '50,000+',
      industry: 'Social Media',
      remote: true,
      urgentHiring: true,
      featured: false,
      applicationCount: 312,
      matchScore: 91
    },
    {
      id: '5',
      title: 'Financial Analyst',
      company: 'Goldman Sachs',
      location: 'New York, NY',
      salary: '$95K - $140K',
      type: 'Full-time',
      posted: '1 day ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Analyze financial markets and provide investment recommendations to high-net-worth clients. Work with cutting-edge financial models.',
      requirements: ['BS/MS in Finance/Economics', 'CFA preferred', '2+ years experience', 'Excel, Bloomberg Terminal'],
      benefits: ['Health Insurance', 'Bonus Structure', 'H-1B Support', 'Professional Development', 'Gym Membership'],
      companySize: '50,000+',
      industry: 'Finance',
      remote: false,
      urgentHiring: false,
      featured: true,
      applicationCount: 178,
      matchScore: 85
    },
    {
      id: '6',
      title: 'UX Designer',
      company: 'Airbnb',
      location: 'San Francisco, CA',
      salary: '$110K - $160K',
      type: 'Full-time',
      posted: '2 days ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Design intuitive user experiences for millions of travelers worldwide. Collaborate with cross-functional teams to create delightful products.',
      requirements: ['BS in Design/HCI', 'Figma, Sketch proficiency', '3+ years UX experience', 'Portfolio required'],
      benefits: ['Stock Options', 'Health Insurance', 'Visa Sponsorship', 'Travel Credits', 'Flexible PTO'],
      companySize: '10,000+',
      industry: 'Travel',
      remote: true,
      urgentHiring: false,
      featured: false,
      applicationCount: 145,
      matchScore: 78
    },
    {
      id: '7',
      title: 'Biomedical Engineer',
      company: 'Johnson & Johnson',
      location: 'New Brunswick, NJ',
      salary: '$85K - $125K',
      type: 'Full-time',
      posted: '4 days ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Develop innovative medical devices that improve patient outcomes. Work on FDA-regulated products in a collaborative environment.',
      requirements: ['BS/MS in Biomedical Engineering', 'CAD software experience', 'FDA regulations knowledge', '2+ years experience'],
      benefits: ['Health Insurance', 'Pension Plan', 'Immigration Support', 'Research Budget', 'Continuing Education'],
      companySize: '100,000+',
      industry: 'Healthcare',
      remote: false,
      urgentHiring: false,
      featured: false,
      applicationCount: 67,
      matchScore: 73
    },
    {
      id: '8',
      title: 'Marketing Manager',
      company: 'Coca-Cola',
      location: 'Atlanta, GA',
      salary: '$75K - $110K',
      type: 'Full-time',
      posted: '6 days ago',
      visaSponsorship: false,
      h1bFriendly: false,
      description: 'Lead marketing campaigns for iconic beverage brands. Develop strategies to engage consumers across multiple channels.',
      requirements: ['MBA in Marketing', 'Brand management experience', 'Digital marketing skills', '4+ years experience'],
      benefits: ['Health Insurance', '401k Match', 'Employee Discounts', 'Flexible Hours'],
      companySize: '100,000+',
      industry: 'Consumer Goods',
      remote: false,
      urgentHiring: false,
      featured: false,
      applicationCount: 92,
      matchScore: 65
    },
    {
      id: '9',
      title: 'Cybersecurity Analyst',
      company: 'Lockheed Martin',
      location: 'Bethesda, MD',
      salary: '$90K - $135K',
      type: 'Full-time',
      posted: '3 days ago',
      visaSponsorship: false,
      h1bFriendly: false,
      description: 'Protect critical infrastructure and national security systems. Requires US citizenship due to security clearance requirements.',
      requirements: ['BS in Cybersecurity/CS', 'Security+ certification', 'US Citizenship required', 'Clearance eligible'],
      benefits: ['Health Insurance', 'Security Clearance', 'Retirement Plan', 'Professional Development'],
      companySize: '100,000+',
      industry: 'Defense',
      remote: false,
      urgentHiring: true,
      featured: false,
      applicationCount: 43,
      matchScore: 0
    },
    {
      id: '10',
      title: 'Research Scientist',
      company: 'Pfizer',
      location: 'Cambridge, MA',
      salary: '$120K - $170K',
      type: 'Full-time',
      posted: '1 week ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Conduct groundbreaking research in drug discovery and development. Contribute to life-saving pharmaceutical innovations.',
      requirements: ['PhD in Chemistry/Biology', 'Drug discovery experience', 'Publication record', 'Lab management skills'],
      benefits: ['Health Insurance', 'Stock Options', 'H-1B Support', 'Research Budget', 'Conference Travel'],
      companySize: '100,000+',
      industry: 'Pharmaceutical',
      remote: false,
      urgentHiring: false,
      featured: true,
      applicationCount: 89,
      matchScore: 92
    },
    {
      id: '11',
      title: 'DevOps Engineer',
      company: 'Spotify',
      location: 'New York, NY',
      salary: '$130K - $180K',
      type: 'Full-time',
      posted: '2 days ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Build and maintain infrastructure that serves 400M+ users globally. Work with cutting-edge cloud technologies.',
      requirements: ['BS in CS/Engineering', 'AWS/GCP experience', 'Kubernetes, Docker', '3+ years DevOps experience'],
      benefits: ['Unlimited PTO', 'Health Insurance', 'Visa Support', 'Music Streaming', 'Flexible Work'],
      companySize: '10,000+',
      industry: 'Music/Entertainment',
      remote: true,
      urgentHiring: true,
      featured: false,
      applicationCount: 201,
      matchScore: 87
    },
    {
      id: '12',
      title: 'Management Consultant',
      company: 'McKinsey & Company',
      location: 'Chicago, IL',
      salary: '$165K - $220K',
      type: 'Full-time',
      posted: '5 days ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Advise Fortune 500 companies on strategic initiatives. Work on diverse projects across multiple industries.',
      requirements: ['MBA from top school', 'Consulting experience', 'Analytical skills', 'Client management'],
      benefits: ['Health Insurance', 'Travel Allowance', 'H-1B Support', 'Professional Development', 'Bonus Structure'],
      companySize: '10,000+',
      industry: 'Consulting',
      remote: false,
      urgentHiring: false,
      featured: true,
      applicationCount: 156,
      matchScore: 79
    },
    {
      id: '13',
      title: 'Sales Engineer',
      company: 'Salesforce',
      location: 'San Francisco, CA',
      salary: '$120K - $180K',
      type: 'Full-time',
      posted: '4 days ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Bridge technical and business teams to drive enterprise software sales. Demonstrate complex solutions to C-level executives.',
      requirements: ['BS in Engineering/CS', 'Sales experience', 'CRM knowledge', 'Presentation skills'],
      benefits: ['Stock Options', 'Health Insurance', 'Visa Sponsorship', 'Commission Structure', 'V2MOM Training'],
      companySize: '50,000+',
      industry: 'Software',
      remote: true,
      urgentHiring: false,
      featured: false,
      applicationCount: 134,
      matchScore: 81
    },
    {
      id: '14',
      title: 'Mechanical Engineer',
      company: 'Tesla',
      location: 'Austin, TX',
      salary: '$95K - $140K',
      type: 'Full-time',
      posted: '3 days ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Design and develop next-generation electric vehicles and energy systems. Work on revolutionary automotive technology.',
      requirements: ['BS/MS in Mechanical Engineering', 'CAD software proficiency', 'Automotive experience preferred', 'Problem-solving skills'],
      benefits: ['Stock Options', 'Health Insurance', 'H-1B Support', 'Employee Discounts', 'Gym Membership'],
      companySize: '100,000+',
      industry: 'Automotive',
      remote: false,
      urgentHiring: true,
      featured: false,
      applicationCount: 189,
      matchScore: 84
    },
    {
      id: '15',
      title: 'Investment Banking Analyst',
      company: 'JPMorgan Chase',
      location: 'New York, NY',
      salary: '$100K - $150K',
      type: 'Full-time',
      posted: '1 day ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Support M&A transactions and capital raising activities for Fortune 500 clients. Work in fast-paced financial markets.',
      requirements: ['BS in Finance/Economics', 'Financial modeling', 'Excel proficiency', 'Strong analytical skills'],
      benefits: ['Health Insurance', 'Bonus Structure', 'Visa Support', 'Professional Development', 'Networking Events'],
      companySize: '250,000+',
      industry: 'Investment Banking',
      remote: false,
      urgentHiring: false,
      featured: false,
      applicationCount: 267,
      matchScore: 76
    },
    {
      id: '16',
      title: 'Software Engineering Intern',
      company: 'Amazon',
      location: 'Seattle, WA',
      salary: '$45/hour',
      type: 'Internship',
      posted: '2 days ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Join our summer internship program and work on real projects that impact millions of customers. Mentorship and learning opportunities.',
      requirements: ['Currently pursuing CS degree', 'Programming skills', 'Problem-solving abilities', 'Available summer 2024'],
      benefits: ['Housing Stipend', 'Health Insurance', 'CPT Support', 'Mentorship Program', 'Full-time Conversion'],
      companySize: '1,500,000+',
      industry: 'E-commerce',
      remote: false,
      urgentHiring: true,
      featured: true,
      applicationCount: 1456,
      matchScore: 90
    },
    {
      id: '17',
      title: 'Nurse Practitioner',
      company: 'Mayo Clinic',
      location: 'Rochester, MN',
      salary: '$95K - $125K',
      type: 'Full-time',
      posted: '1 week ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Provide advanced nursing care in a world-renowned medical facility. Work with cutting-edge medical technology and treatments.',
      requirements: ['MSN degree', 'NP certification', 'State licensure', '2+ years clinical experience'],
      benefits: ['Health Insurance', 'Retirement Plan', 'H-1B Support', 'Continuing Education', 'Research Opportunities'],
      companySize: '50,000+',
      industry: 'Healthcare',
      remote: false,
      urgentHiring: false,
      featured: false,
      applicationCount: 78,
      matchScore: 88
    },
    {
      id: '18',
      title: 'Digital Marketing Specialist',
      company: 'HubSpot',
      location: 'Boston, MA',
      salary: '$65K - $90K',
      type: 'Full-time',
      posted: '5 days ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Drive growth through innovative digital marketing campaigns. Work with a leading marketing automation platform.',
      requirements: ['BS in Marketing/Communications', 'Google Ads certification', 'SEO/SEM experience', 'Analytics skills'],
      benefits: ['Stock Options', 'Health Insurance', 'Visa Sponsorship', 'Flexible PTO', 'Learning Budget'],
      companySize: '5,000+',
      industry: 'Marketing Technology',
      remote: true,
      urgentHiring: false,
      featured: false,
      applicationCount: 112,
      matchScore: 72
    },
    {
      id: '19',
      title: 'Civil Engineer',
      company: 'Bechtel Corporation',
      location: 'San Francisco, CA',
      salary: '$80K - $115K',
      type: 'Full-time',
      posted: '6 days ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Design and oversee construction of major infrastructure projects. Work on bridges, highways, and public transportation systems.',
      requirements: ['BS in Civil Engineering', 'PE license preferred', 'AutoCAD proficiency', '3+ years experience'],
      benefits: ['Health Insurance', 'Retirement Plan', 'H-1B Support', 'Project Bonuses', 'Professional Development'],
      companySize: '50,000+',
      industry: 'Construction',
      remote: false,
      urgentHiring: false,
      featured: false,
      applicationCount: 89,
      matchScore: 75
    },
    {
      id: '20',
      title: 'Quantitative Analyst',
      company: 'Two Sigma',
      location: 'New York, NY',
      salary: '$180K - $250K',
      type: 'Full-time',
      posted: '3 days ago',
      visaSponsorship: true,
      h1bFriendly: true,
      description: 'Develop mathematical models for algorithmic trading strategies. Work with big data and machine learning in finance.',
      requirements: ['PhD in Math/Physics/CS', 'Python/R programming', 'Statistical modeling', 'Finance knowledge'],
      benefits: ['Stock Options', 'Health Insurance', 'Visa Support', 'Research Budget', 'Competitive Bonus'],
      companySize: '1,000+',
      industry: 'Hedge Fund',
      remote: false,
      urgentHiring: true,
      featured: true,
      applicationCount: 234,
      matchScore: 94
    }
  ];

  const {
    query,
    setQuery,
    filters,
    updateFilter,
    clearFilters,
    results: filteredJobs
  } = useAdvancedSearch({
    data: jobs,
    searchKeys: ['title', 'company', 'description', 'requirements', 'industry']
  });

  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      // Featured jobs first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Then by match score
      if (a.matchScore && b.matchScore) {
        return b.matchScore - a.matchScore;
      }
      
      // Then by posting date (newest first)
      return new Date(b.posted).getTime() - new Date(a.posted).getTime();
    });
  }, [filteredJobs]);

  const toggleSaveJob = (jobId: string) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
      addNotification({
        type: 'info',
        title: 'Job Removed',
        message: 'Job removed from saved list'
      });
    } else {
      newSavedJobs.add(jobId);
      addNotification({
        type: 'success',
        title: 'Job Saved',
        message: 'Job added to your saved list'
      });
    }
    setSavedJobs(newSavedJobs);
  };

  const markJobAsViewed = (jobId: string) => {
    if (!viewedJobs.has(jobId)) {
      const newViewedJobs = new Set(viewedJobs);
      newViewedJobs.add(jobId);
      setViewedJobs(newViewedJobs);
    }
  };

  const renderJobCard = ({ index, style, data }: { index: number; style: React.CSSProperties; data: Job[] }) => {
    const job = data[index];
    const isSaved = savedJobs.has(job.id);
    const isViewed = viewedJobs.has(job.id);

    return (
      <div style={style}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -2, scale: 1.01 }}
          className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 ${
            job.featured ? 'border-l-yellow-400' : 'border-l-blue-500'
          } ${!isViewed ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''} mx-4 mb-4`}
          onClick={() => markJobAsViewed(job.id)}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                {job.featured && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </span>
                )}
                {job.urgentHiring && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                    <Zap className="h-3 w-3 mr-1" />
                    Urgent
                  </span>
                )}
                {!isViewed && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                    New
                  </span>
                )}
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <Building className="h-4 w-4 mr-1" />
                <span className="font-medium mr-4">{job.company}</span>
                <MapPin className="h-4 w-4 mr-1" />
                <span className="mr-4">{job.location}</span>
                {job.remote && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Remote OK
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
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
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {job.posted}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                {job.visaSponsorship && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                    ✓ Visa Sponsor
                  </span>
                )}
                {job.h1bFriendly && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                    ✓ H-1B Friendly
                  </span>
                )}
                {job.matchScore && (
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                    {job.matchScore}% Match
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end space-y-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSaveJob(job.id);
                }}
                className={`p-2 rounded-full transition-colors ${
                  isSaved
                    ? 'text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30'
                    : 'text-gray-400 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Heart className="h-5 w-5" fill={isSaved ? 'currentColor' : 'none'} />
              </motion.button>
              
              <div className="text-xs text-gray-500 flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {job.applicationCount} views
              </div>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">{job.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Requirements:</h4>
              <ul className="space-y-1">
                {job.requirements.slice(0, 3).map((req, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                    {req}
                  </li>
                ))}
                {job.requirements.length > 3 && (
                  <li className="text-sm text-blue-600 dark:text-blue-400">
                    +{job.requirements.length - 3} more requirements
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Benefits:</h4>
              <ul className="space-y-1">
                {job.benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="h-3 w-3 text-blue-500 mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
                {job.benefits.length > 3 && (
                  <li className="text-sm text-blue-600 dark:text-blue-400">
                    +{job.benefits.length - 3} more benefits
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Industry:</span> {job.industry}
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSaveJob(job.id);
                }}
                className="px-4 py-2 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center"
              >
                <BookmarkPlus className="h-4 w-4 mr-2" />
                {isSaved ? 'Saved' : 'Save Job'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                Apply Now
                <ExternalLink className="h-4 w-4 ml-2" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Job Board</h1>
              <p className="text-gray-600 dark:text-gray-400">Discover visa-sponsored opportunities from top US companies</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <TrendingUp className="h-4 w-4" />
              <span>{filteredJobs.length} jobs found</span>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Job title, company, or keywords"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={filters.location || ''}
                onChange={(e) => updateFilter('location', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="relative">
              <select
                value={filters.visaSponsorship || ''}
                onChange={(e) => updateFilter('visaSponsorship', e.target.value === 'true' ? true : e.target.value === 'false' ? false : '')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All Jobs</option>
                <option value="true">Visa Sponsorship</option>
                <option value="false">No Visa Required</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </motion.button>

            {(query || Object.keys(filters).length > 0) && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearFilters}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
              >
                Clear all filters
              </motion.button>
            )}
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Type</label>
                    <select
                      value={filters.type || ''}
                      onChange={(e) => updateFilter('type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="">All Types</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Industry</label>
                    <select
                      value={filters.industry || ''}
                      onChange={(e) => updateFilter('industry', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="">All Industries</option>
                      <option value="Technology">Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Consulting">Consulting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Remote Work</label>
                    <select
                      value={filters.remote || ''}
                      onChange={(e) => updateFilter('remote', e.target.value === 'true' ? true : e.target.value === 'false' ? false : '')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="">All Options</option>
                      <option value="true">Remote OK</option>
                      <option value="false">On-site Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Size</label>
                    <select
                      value={filters.companySize || ''}
                      onChange={(e) => updateFilter('companySize', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="">All Sizes</option>
                      <option value="1-50">Startup (1-50)</option>
                      <option value="51-200">Small (51-200)</option>
                      <option value="201-1000">Medium (201-1000)</option>
                      <option value="1000+">Large (1000+)</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Job Listings */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <SkeletonLoader className="h-6 w-64 mb-2" />
                    <SkeletonLoader className="h-4 w-48 mb-2" />
                    <SkeletonLoader className="h-4 w-32" />
                  </div>
                  <SkeletonLoader variant="circular" width={40} height={40} />
                </div>
                <SkeletonLoader lines={2} className="mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  <SkeletonLoader lines={3} />
                  <SkeletonLoader lines={3} />
                </div>
              </div>
            ))}
          </div>
        ) : sortedJobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md"
          >
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No jobs found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search criteria or filters.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        ) : (
          <div className="h-[800px]">
            <VirtualizedList
              items={sortedJobs}
              itemHeight={400}
              renderItem={renderJobCard}
              className="rounded-xl overflow-hidden"
            />
          </div>
        )}

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
        >
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Disclaimer:</strong> Visa sponsorship information is based on company policies and may change. 
            Always verify current sponsorship availability directly with employers. This platform does not guarantee 
            visa sponsorship or provide legal immigration advice.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default JobBoard;