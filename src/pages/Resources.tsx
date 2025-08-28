import React, { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'guide' | 'faq';
  category: string;
  description: string;
  url: string;
  readTime: string;
  lastUpdated: string;
  tags: string[];
}

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hi! I\'m your immigration assistant. I can help you with questions about H-1B, OPT, Green Cards, and more. What would you like to know?'
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Complete H-1B Application Guide 2024',
      type: 'guide',
      category: 'H-1B',
      description: 'Step-by-step guide to preparing and submitting your H-1B application.',
      url: '#',
      readTime: '15 min',
      lastUpdated: '2024-01-15',
      tags: ['H-1B', 'Visa', 'Application']
    },
    {
      id: '2',
      title: 'OPT Extension Requirements',
      type: 'article',
      category: 'OPT',
      description: 'Everything you need to know about STEM OPT extension.',
      url: '#',
      readTime: '8 min',
      lastUpdated: '2024-01-10',
      tags: ['OPT', 'STEM', 'Extension']
    },
    {
      id: '3',
      title: 'Green Card Process Explained',
      type: 'video',
      category: 'Green Card',
      description: 'Understanding the EB-1, EB-2, and EB-3 categories.',
      url: '#',
      readTime: '25 min',
      lastUpdated: '2024-01-08',
      tags: ['Green Card', 'EB-1', 'EB-2', 'EB-3']
    },
    {
      id: '4',
      title: 'Common Visa Interview Questions',
      type: 'faq',
      category: 'Interview',
      description: 'Frequently asked questions during visa interviews.',
      url: '#',
      readTime: '12 min',
      lastUpdated: '2024-01-05',
      tags: ['Interview', 'Visa', 'FAQ']
    }
  ];

  const categories = ['all', 'H-1B', 'OPT', 'Green Card', 'Interview', 'Work Authorization'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5 text-red-500" />;
      case 'guide':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'faq':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      message: currentMessage
    };

    const botResponse = {
      id: chatMessages.length + 2,
      type: 'bot',
      message: 'I understand you\'re asking about immigration topics. Based on our curated resources, here are some key points to consider. Please note that this information is for guidance only and does not constitute legal advice. For specific cases, please consult with an immigration attorney.'
    };

    setChatMessages([...chatMessages, userMessage, botResponse]);
    setCurrentMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Immigration Resources</h1>
          <p className="text-gray-600">Access curated information and get answers to your immigration questions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resources Section */}
          <div className="lg:col-span-2">
            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Resource Listings */}
            <div className="space-y-4">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getResourceIcon(resource.type)}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span className="capitalize">{resource.type}</span>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {resource.readTime}
                          </div>
                          <span>Updated {resource.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    <a
                      href={resource.url}
                      className="text-blue-600 hover:text-blue-700 flex items-center"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <p className="text-gray-700 mb-4">{resource.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                      Read More
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
              </div>
            )}
          </div>

          {/* AI Chat Assistant */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md h-fit sticky top-8">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                  Immigration Assistant
                </h2>
                <p className="text-sm text-gray-600 mt-1">Ask questions about immigration processes</p>
              </div>

              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about H-1B, OPT, Green Cards..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800 mb-1">Important Disclaimer</h3>
                  <p className="text-xs text-yellow-700">
                    All information provided is for educational purposes only and does not constitute legal advice. 
                    Immigration laws are complex and subject to change. Always consult with a qualified immigration 
                    attorney for your specific situation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;