import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

interface UseAdvancedSearchProps<T> {
  data: T[];
  searchKeys: string[];
  threshold?: number;
}

export const useAdvancedSearch = <T>({
  data,
  searchKeys,
  threshold = 0.3
}: UseAdvancedSearchProps<T>) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});

  const fuse = useMemo(() => {
    return new Fuse(data, {
      keys: searchKeys,
      threshold,
      includeScore: true,
      includeMatches: true
    });
  }, [data, searchKeys, threshold]);

  const results = useMemo(() => {
    let filteredData = data;

    // Apply filters first
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        filteredData = filteredData.filter(item => {
          const itemValue = (item as any)[key];
          if (Array.isArray(value)) {
            return value.includes(itemValue);
          }
          return itemValue === value || (typeof itemValue === 'string' && itemValue.toLowerCase().includes(value.toLowerCase()));
        });
      }
    });

    // Apply search query
    if (query.trim()) {
      const searchResults = fuse.search(query);
      const searchIds = new Set(searchResults.map(result => data.indexOf(result.item)));
      filteredData = filteredData.filter(item => searchIds.has(data.indexOf(item)));
    }

    return filteredData;
  }, [data, query, filters, fuse]);

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setQuery('');
  };

  return {
    query,
    setQuery,
    filters,
    updateFilter,
    clearFilters,
    results
  };
};