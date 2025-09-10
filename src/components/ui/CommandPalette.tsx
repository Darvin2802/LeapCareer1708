import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, Clock, Star, Briefcase, Users, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Command {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
  keywords: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    {
      id: 'jobs',
      title: 'Browse Jobs',
      subtitle: 'Find visa-sponsored opportunities',
      icon: <Briefcase className="h-4 w-4" />,
      action: () => navigate('/jobs'),
      category: 'Navigation',
      keywords: ['jobs', 'work', 'career', 'visa', 'h1b']
    },
    {
      id: 'mentorship',
      title: 'Find Mentors',
      subtitle: 'Connect with industry experts',
      icon: <Users className="h-4 w-4" />,
      action: () => navigate('/mentorship'),
      category: 'Navigation',
      keywords: ['mentor', 'guidance', 'expert', 'advice']
    },
    {
      id: 'resources',
      title: 'Immigration Resources',
      subtitle: 'Get visa and immigration help',
      icon: <BookOpen className="h-4 w-4" />,
      action: () => navigate('/resources'),
      category: 'Navigation',
      keywords: ['immigration', 'visa', 'resources', 'help', 'guide']
    },
    {
      id: 'profile',
      title: 'My Profile',
      subtitle: 'Manage your account',
      icon: <Star className="h-4 w-4" />,
      action: () => navigate('/profile'),
      category: 'Account',
      keywords: ['profile', 'account', 'settings', 'personal']
    }
  ];

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(query.toLowerCase()) ||
    command.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
    command.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            onClose();
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for commands..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500"
            />
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                <Command className="h-3 w-3" />
              </kbd>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">K</kbd>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {filteredCommands.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No commands found</p>
              </div>
            ) : (
              <div className="py-2">
                {filteredCommands.map((command, index) => (
                  <button
                    key={command.id}
                    onClick={() => {
                      command.action();
                      onClose();
                    }}
                    className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      index === selectedIndex ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500' : ''
                    }`}
                  >
                    <div className="text-gray-600 dark:text-gray-400">
                      {command.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {command.title}
                      </div>
                      {command.subtitle && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {command.subtitle}
                        </div>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">↑↓</kbd>
                <span>Navigate</span>
              </span>
              <span className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">↵</kbd>
                <span>Select</span>
              </span>
              <span className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">esc</kbd>
                <span>Close</span>
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommandPalette;