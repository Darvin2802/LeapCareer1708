import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  FileText, 
  Video, 
  ExternalLink,
  AlertCircle,
  MessageSquare,
  Send,
  Clock,
  Tag,
  ChevronRight,
  Download,
  Star,
  Users,
  TrendingUp,
  Filter,
  Calendar,
  Globe,
  Shield,
  Award,
  Briefcase,
  GraduationCap,
  MapPin,
  DollarSign,
  CheckCircle,
  X,
  Play,
  Bookmark,
  Share2,
  ThumbsUp,
  Eye,
  MessageCircle
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'guide' | 'faq' | 'webinar' | 'template' | 'checklist' | 'tool';
  category: string;
  subcategory?: string;
  description: string;
  content?: string;
  url?: string;
  readTime: string;
  lastUpdated: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  views: number;
  likes: number;
  author: string;
  authorRole: string;
  featured: boolean;
  trending: boolean;
  downloadable?: boolean;
  premium?: boolean;
}

interface MythBuster {
  id: string;
  myth: string;
  reality: string;
  source: string;
  category: string;
  impact: 'High' | 'Medium' | 'Low';
}

interface ChatMessage {
  id: number;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
  sources?: string[];
}

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [activeTab, setActiveTab] = useState('resources');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'bot',
      message: 'Hi! I\'m your immigration assistant. I can help you with questions about H-1B, OPT, Green Cards, and more. All my responses are based on verified USCIS information and our curated resources.',
      timestamp: new Date(),
      sources: []
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [savedResources, setSavedResources] = useState<Set<string>>(new Set());

  const resources: Resource[] = [
    // Visa & Immigration
    {
      id: '1',
      title: 'Complete H-1B Application Guide 2024',
      type: 'guide',
      category: 'Visa & Immigration',
      subcategory: 'H-1B',
      description: 'Comprehensive step-by-step guide to preparing and submitting your H-1B application, including lottery system, cap-exempt positions, and premium processing.',
      content: 'Detailed guide content here...',
      readTime: '25 min',
      lastUpdated: '2024-01-15',
      tags: ['H-1B', 'Visa', 'Application', 'Lottery', 'Premium Processing'],
      difficulty: 'Intermediate',
      rating: 4.8,
      views: 15420,
      likes: 892,
      author: 'Immigration Attorney Sarah Chen',
      authorRole: 'Immigration Law Expert',
      featured: true,
      trending: true,
      downloadable: true
    },
    {
      id: '2',
      title: 'OPT to H-1B Transition Timeline',
      type: 'template',
      category: 'Visa & Immigration',
      subcategory: 'OPT',
      description: 'Interactive timeline and checklist for transitioning from OPT to H-1B status, including STEM extension requirements.',
      readTime: '12 min',
      lastUpdated: '2024-01-10',
      tags: ['OPT', 'STEM', 'H-1B', 'Timeline', 'Transition'],
      difficulty: 'Beginner',
      rating: 4.9,
      views: 8934,
      likes: 567,
      author: 'Raj Patel',
      authorRole: 'Immigration Consultant',
      featured: true,
      trending: false,
      downloadable: true
    },
    {
      id: '3',
      title: 'Green Card Process: EB-1, EB-2, EB-3 Explained',
      type: 'video',
      category: 'Visa & Immigration',
      subcategory: 'Green Card',
      description: 'Comprehensive video explaining different employment-based green card categories, priority dates, and processing times.',
      readTime: '35 min',
      lastUpdated: '2024-01-08',
      tags: ['Green Card', 'EB-1', 'EB-2', 'EB-3', 'Priority Date'],
      difficulty: 'Advanced',
      rating: 4.7,
      views: 12456,
      likes: 734,
      author: 'Immigration Law Firm',
      authorRole: 'Legal Experts',
      featured: false,
      trending: true
    },

    // Job Search & Career
    {
      id: '4',
      title: 'Resume Templates for International Students',
      type: 'template',
      category: 'Job Search & Career',
      subcategory: 'Resume',
      description: 'ATS-optimized resume templates specifically designed for international students, with visa status disclosure best practices.',
      readTime: '8 min',
      lastUpdated: '2024-01-12',
      tags: ['Resume', 'ATS', 'Template', 'International Students'],
      difficulty: 'Beginner',
      rating: 4.6,
      views: 9876,
      likes: 445,
      author: 'Career Coach Maria Rodriguez',
      authorRole: 'Career Development Expert',
      featured: true,
      trending: false,
      downloadable: true
    },
    {
      id: '5',
      title: 'Networking Strategies for International Students',
      type: 'article',
      category: 'Job Search & Career',
      subcategory: 'Networking',
      description: 'Proven networking strategies to build professional relationships and find visa-sponsoring employers.',
      readTime: '15 min',
      lastUpdated: '2024-01-05',
      tags: ['Networking', 'Professional Relationships', 'Career Growth'],
      difficulty: 'Intermediate',
      rating: 4.5,
      views: 6543,
      likes: 321,
      author: 'LinkedIn Career Expert',
      authorRole: 'Professional Network Specialist',
      featured: false,
      trending: false
    },
    {
      id: '6',
      title: 'Salary Negotiation for Visa Holders',
      type: 'webinar',
      category: 'Job Search & Career',
      subcategory: 'Salary',
      description: 'Live webinar on salary negotiation tactics specific to visa holders, including prevailing wage considerations.',
      readTime: '45 min',
      lastUpdated: '2024-01-03',
      tags: ['Salary', 'Negotiation', 'Prevailing Wage', 'H-1B'],
      difficulty: 'Advanced',
      rating: 4.8,
      views: 4567,
      likes: 289,
      author: 'Compensation Expert John Kim',
      authorRole: 'HR Consultant',
      featured: false,
      trending: true
    },

    // Interview Preparation
    {
      id: '7',
      title: 'Technical Interview Prep for FAANG',
      type: 'guide',
      category: 'Interview Preparation',
      subcategory: 'Technical',
      description: 'Comprehensive guide to preparing for technical interviews at top tech companies, with coding challenges and system design.',
      readTime: '40 min',
      lastUpdated: '2024-01-14',
      tags: ['Technical Interview', 'FAANG', 'Coding', 'System Design'],
      difficulty: 'Advanced',
      rating: 4.9,
      views: 18765,
      likes: 1234,
      author: 'Ex-Google Engineer Priya Sharma',
      authorRole: 'Senior Software Engineer',
      featured: true,
      trending: true
    },
    {
      id: '8',
      title: 'Behavioral Interview Questions & Answers',
      type: 'checklist',
      category: 'Interview Preparation',
      subcategory: 'Behavioral',
      description: 'Common behavioral interview questions with STAR method examples and cultural adaptation tips.',
      readTime: '20 min',
      lastUpdated: '2024-01-11',
      tags: ['Behavioral Interview', 'STAR Method', 'Cultural Adaptation'],
      difficulty: 'Beginner',
      rating: 4.4,
      views: 7890,
      likes: 456,
      author: 'HR Manager Lisa Wang',
      authorRole: 'Talent Acquisition Lead',
      featured: false,
      trending: false,
      downloadable: true
    },

    // US Workplace Culture
    {
      id: '9',
      title: 'Understanding US Workplace Culture',
      type: 'article',
      category: 'US Workplace Culture',
      subcategory: 'Cultural Adaptation',
      description: 'Essential guide to navigating American workplace culture, communication styles, and professional etiquette.',
      readTime: '18 min',
      lastUpdated: '2024-01-09',
      tags: ['Workplace Culture', 'Communication', 'Professional Etiquette'],
      difficulty: 'Beginner',
      rating: 4.6,
      views: 5432,
      likes: 298,
      author: 'Cultural Consultant David Chen',
      authorRole: 'Cross-Cultural Expert',
      featured: false,
      trending: false
    },
    {
      id: '10',
      title: 'Building Professional Relationships in the US',
      type: 'video',
      category: 'US Workplace Culture',
      subcategory: 'Relationships',
      description: 'Video series on building meaningful professional relationships, mentorship, and career advancement in US companies.',
      readTime: '30 min',
      lastUpdated: '2024-01-07',
      tags: ['Professional Relationships', 'Mentorship', 'Career Advancement'],
      difficulty: 'Intermediate',
      rating: 4.7,
      views: 6789,
      likes: 389,
      author: 'Executive Coach Amanda Johnson',
      authorRole: 'Leadership Development Expert',
      featured: false,
      trending: false
    },

    // Financial Planning
    {
      id: '11',
      title: 'Financial Planning for International Students',
      type: 'guide',
      category: 'Financial Planning',
      subcategory: 'Budgeting',
      description: 'Comprehensive financial planning guide covering budgeting, taxes, credit building, and investment basics for international students.',
      readTime: '22 min',
      lastUpdated: '2024-01-13',
      tags: ['Financial Planning', 'Budgeting', 'Taxes', 'Credit Score'],
      difficulty: 'Intermediate',
      rating: 4.5,
      views: 4321,
      likes: 234,
      author: 'Financial Advisor Michael Brown',
      authorRole: 'Certified Financial Planner',
      featured: false,
      trending: false,
      downloadable: true
    },
    {
      id: '12',
      title: 'Tax Guide for F-1 and H-1B Holders',
      type: 'tool',
      category: 'Financial Planning',
      subcategory: 'Taxes',
      description: 'Interactive tax calculator and guide for F-1 and H-1B visa holders, including state tax considerations.',
      readTime: '15 min',
      lastUpdated: '2024-01-06',
      tags: ['Taxes', 'F-1', 'H-1B', 'State Taxes', 'Calculator'],
      difficulty: 'Advanced',
      rating: 4.8,
      views: 8765,
      likes: 567,
      author: 'Tax Expert Jennifer Lee',
      authorRole: 'CPA',
      featured: true,
      trending: false
    },

    // Legal & Compliance
    {
      id: '13',
      title: 'Know Your Rights as an International Worker',
      type: 'faq',
      category: 'Legal & Compliance',
      subcategory: 'Worker Rights',
      description: 'Comprehensive FAQ on worker rights, discrimination protection, and legal resources for international employees.',
      readTime: '12 min',
      lastUpdated: '2024-01-04',
      tags: ['Worker Rights', 'Discrimination', 'Legal Protection'],
      difficulty: 'Beginner',
      rating: 4.7,
      views: 3456,
      likes: 189,
      author: 'Employment Attorney Robert Kim',
      authorRole: 'Labor Law Specialist',
      featured: false,
      trending: false
    },
    {
      id: '14',
      title: 'Immigration Law Updates 2024',
      type: 'article',
      category: 'Legal & Compliance',
      subcategory: 'Policy Updates',
      description: 'Latest immigration law changes, policy updates, and their impact on international students and workers.',
      readTime: '10 min',
      lastUpdated: '2024-01-16',
      tags: ['Immigration Law', 'Policy Updates', '2024 Changes'],
      difficulty: 'Intermediate',
      rating: 4.9,
      views: 12345,
      likes: 789,
      author: 'Immigration Law Firm',
      authorRole: 'Legal Research Team',
      featured: true,
      trending: true
    },

    // Industry Insights
    {
      id: '15',
      title: 'Tech Industry Visa Sponsorship Trends',
      type: 'article',
      category: 'Industry Insights',
      subcategory: 'Technology',
      description: 'Analysis of visa sponsorship trends in the tech industry, including company-specific data and hiring patterns.',
      readTime: '16 min',
      lastUpdated: '2024-01-02',
      tags: ['Tech Industry', 'Visa Sponsorship', 'Hiring Trends'],
      difficulty: 'Intermediate',
      rating: 4.6,
      views: 7654,
      likes: 432,
      author: 'Industry Analyst Sarah Johnson',
      authorRole: 'Tech Recruitment Expert',
      featured: false,
      trending: false
    }
  ];

  const mythBusters: MythBuster[] = [
    {
      id: '1',
      myth: 'You can only apply for H-1B once per year',
      reality: 'You can apply for H-1B multiple times if you have different employers sponsoring you, or if you qualify for cap-exempt positions.',
      source: 'USCIS Official Guidelines',
      category: 'H-1B',
      impact: 'High'
    },
    {
      id: '2',
      myth: 'OPT students cannot travel outside the US',
      reality: 'OPT students can travel with proper documentation (valid passport, visa, EAD card, and employment letter).',
      source: 'USCIS Student and Exchange Visitor Program',
      category: 'OPT',
      impact: 'Medium'
    },
    {
      id: '3',
      myth: 'You must have a job offer to apply for a Green Card',
      reality: 'While most employment-based green cards require job offers, EB-1A (extraordinary ability) and NIW (National Interest Waiver) do not.',
      source: 'USCIS Employment-Based Immigration Guidelines',
      category: 'Green Card',
      impact: 'High'
    },
    {
      id: '4',
      myth: 'F-1 students cannot work off-campus',
      reality: 'F-1 students can work off-campus through CPT, OPT, or in cases of severe economic hardship with USCIS approval.',
      source: 'USCIS F-1 Student Guidelines',
      category: 'F-1',
      impact: 'High'
    },
    {
      id: '5',
      myth: 'H-1B holders cannot change jobs',
      reality: 'H-1B holders can change jobs through H-1B transfer (portability) once the new employer files an H-1B petition.',
      source: 'USCIS H-1B Portability Rules',
      category: 'H-1B',
      impact: 'Medium'
    }
  ];

  const categories = [
    'all',
    'Visa & Immigration',
    'Job Search & Career',
    'Interview Preparation',
    'US Workplace Culture',
    'Financial Planning',
    'Legal & Compliance',
    'Industry Insights'
  ];

  const types = ['all', 'article', 'video', 'guide', 'faq', 'webinar', 'template', 'checklist', 'tool'];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'all' || resource.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesType && matchesDifficulty;
  });

  const featuredResources = resources.filter(r => r.featured);
  const trendingResources = resources.filter(r => r.trending);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5 text-red-500" />;
      case 'guide':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'faq':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'webinar':
        return <Play className="h-5 w-5 text-purple-500" />;
      case 'template':
        return <Download className="h-5 w-5 text-orange-500" />;
      case 'checklist':
        return <CheckCircle className="h-5 w-5 text-teal-500" />;
      case 'tool':
        return <Award className="h-5 w-5 text-yellow-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      message: currentMessage,
      timestamp: new Date()
    };

    // Simulate AI response with sources
    const botResponse: ChatMessage = {
      id: chatMessages.length + 2,
      type: 'bot',
      message: `Based on verified USCIS information and our curated resources, here's what you need to know about "${currentMessage}": This information is sourced from official government guidelines and expert analysis. For specific legal advice, please consult with an immigration attorney.`,
      timestamp: new Date(),
      sources: ['USCIS Official Guidelines', 'Immigration Law Expert Analysis', 'Leap Career Resource Library']
    };

    setChatMessages([...chatMessages, userMessage, botResponse]);
    setCurrentMessage('');
  };

  const toggleSaveResource = (resourceId: string) => {
    const newSaved = new Set(savedResources);
    if (newSaved.has(resourceId)) {
      newSaved.delete(resourceId);
    } else {
      newSaved.add(resourceId);
    }
    setSavedResources(newSaved);
  };

  const ResourceCard = ({ resource }: { resource: Resource }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1">
          {getResourceIcon(resource.type)}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                {resource.title}
              </h3>
              {resource.featured && (
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </span>
              )}
              {resource.trending && (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trending
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span className="capitalize font-medium">{resource.type}</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {resource.readTime}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                resource.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                resource.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {resource.difficulty}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleSaveResource(resource.id)}
            className={`p-2 rounded-full transition-colors ${
              savedResources.has(resource.id)
                ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-400 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Bookmark className="h-4 w-4" fill={savedResources.has(resource.id) ? 'currentColor' : 'none'} />
          </button>
          <button className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{resource.description}</p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            {resource.views.toLocaleString()}
          </div>
          <div className="flex items-center">
            <ThumbsUp className="h-4 w-4 mr-1" />
            {resource.likes}
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-400" />
            {resource.rating}
          </div>
        </div>
        {resource.downloadable && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium flex items-center">
            <Download className="h-3 w-3 mr-1" />
            Downloadable
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {resource.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full flex items-center"
          >
            <Tag className="h-3 w-3 mr-1" />
            {tag}
          </span>
        ))}
        {resource.tags.length > 3 && (
          <span className="text-xs text-blue-600 dark:text-blue-400">
            +{resource.tags.length - 3} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">{resource.author}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{resource.authorRole}</div>
          </div>
        </div>
        <button
          onClick={() => setSelectedResource(resource)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm"
        >
          Read More
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Immigration Resources</h1>
          <p className="text-gray-600 dark:text-gray-400">Comprehensive, verified resources for your US career journey</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'resources', name: 'All Resources', icon: BookOpen },
              { id: 'featured', name: 'Featured', icon: Star },
              { id: 'trending', name: 'Trending', icon: TrendingUp },
              { id: 'mythbuster', name: 'Myth Buster', icon: Shield },
              { id: 'chat', name: 'AI Assistant', icon: MessageSquare }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content based on active tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'resources' && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Search and Filters */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search resources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty === 'all' ? 'All Levels' : difficulty}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {filteredResources.length} resources found
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setSelectedType('all');
                      setSelectedDifficulty('all');
                    }}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    Clear filters
                  </button>
                </div>
              </div>

              {/* Resource Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>

              {filteredResources.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No resources found</h3>
                  <p className="text-gray-600 dark:text-gray-400">Try adjusting your search terms or filters.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'featured' && (
            <motion.div
              key="featured"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'trending' && (
            <motion.div
              key="trending"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {trendingResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'mythbuster' && (
            <motion.div
              key="mythbuster"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-red-600 dark:text-red-400 mr-2" />
                  <h2 className="text-xl font-bold text-red-900 dark:text-red-100">Immigration Myth Buster</h2>
                </div>
                <p className="text-red-800 dark:text-red-200">
                  Debunking common immigration myths with evidence-based facts from official sources.
                </p>
              </div>

              <div className="space-y-6">
                {mythBusters.map((myth) => (
                  <motion.div
                    key={myth.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-red-500"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                            MYTH
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            myth.impact === 'High' ? 'bg-red-100 text-red-800' :
                            myth.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {myth.impact} Impact
                          </span>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {myth.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          ❌ {myth.myth}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                        <span className="font-medium text-green-900 dark:text-green-100">REALITY</span>
                      </div>
                      <p className="text-green-800 dark:text-green-200">✅ {myth.reality}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-1" />
                        <span className="font-medium">Source: {myth.source}</span>
                      </div>
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center">
                        Learn More
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                      <MessageSquare className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                      AI Immigration Assistant
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Get answers from verified USCIS information and expert resources
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                      Online
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-600">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Sources:</p>
                          {msg.sources.map((source, index) => (
                            <div key={index} className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              {source}
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {msg.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about H-1B, OPT, Green Cards, job search..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['H-1B lottery process', 'OPT extension requirements', 'Green card timeline', 'Salary negotiation tips'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setCurrentMessage(suggestion)}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resource Detail Modal */}
        <AnimatePresence>
          {selectedResource && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedResource(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    {getResourceIcon(selectedResource.type)}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedResource.title}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        By {selectedResource.author} • {selectedResource.readTime}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedResource(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                      {selectedResource.description}
                    </p>
                    
                    {selectedResource.content && (
                      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300">
                          {selectedResource.content}
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-6 flex flex-wrap gap-2">
                      {selectedResource.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
        >
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Important Legal Disclaimer
              </h3>
              <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
                <p>
                  <strong>Educational Purpose Only:</strong> All information provided is for educational purposes only and does not constitute legal advice. Immigration laws are complex and subject to frequent changes.
                </p>
                <p>
                  <strong>Professional Consultation Required:</strong> Always consult with a qualified immigration attorney for your specific situation. Individual circumstances may significantly affect your case.
                </p>
                <p>
                  <strong>Source Verification:</strong> While we strive to provide accurate information from official sources like USCIS, users should verify all information independently and check for the most current updates.
                </p>
                <p>
                  <strong>No Guarantee:</strong> Leap Career does not guarantee any specific outcomes or results based on the information provided in these resources.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;