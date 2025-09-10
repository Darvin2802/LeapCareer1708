import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Shield, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Briefcase
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8 text-blue-600" />,
      title: "Smart Job Board",
      description: "Find visa-sponsored positions with advanced H-1B company filters and real-time updates."
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Expert Mentorship",
      description: "Connect with successful professionals who understand your journey as an international student."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      title: "Immigration Resources",
      description: "Access curated, up-to-date information on visa processes, OPT, H-1B, and more."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Job Listings" },
    { number: "500+", label: "Expert Mentors" },
    { number: "2,000+", label: "Success Stories" },
    { number: "95%", label: "Visa Success Rate" }
  ];

  const testimonials = [
    {
      name: "Arjun Patel",
      role: "Software Engineer at Google",
      university: "MIT",
      quote: "CareerBridge helped me navigate the complex H-1B process and land my dream job. The mentorship was invaluable!",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Data Scientist at Netflix",
      university: "Stanford",
      quote: "The visa-specific job filters saved me countless hours. I found my current role through their platform.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Gateway to
              <span className="text-blue-600 block">US Career Success</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Empowering Indian students in US universities with visa-sponsored job opportunities, 
              expert mentorship, and comprehensive immigration guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/jobs"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                Explore Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/mentorship"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Find a Mentor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Career Success
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform addresses the unique challenges faced by Indian students in the US job market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Students Nationwide</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of successful Indian students who have built thriving careers in the US.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-gray-500">{testimonial.university}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Path to Success
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Follow our proven 4-step process to land your dream job in the US.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Create Profile", desc: "Tell us about your background and career goals" },
              { step: "2", title: "Explore Opportunities", desc: "Browse visa-sponsored jobs tailored to your profile" },
              { step: "3", title: "Get Mentorship", desc: "Connect with industry experts for guidance" },
              { step: "4", title: "Land Your Job", desc: "Apply with confidence and secure your future" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white text-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-blue-100 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join CareerBridge today and take the first step towards your American dream.
          </p>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>

          <div className="mt-8 flex items-center justify-center space-x-8 text-gray-400">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Verified Companies</span>
            </div>
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              <span>Nationwide Network</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;