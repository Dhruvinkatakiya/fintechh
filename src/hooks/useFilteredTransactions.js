import { useMemo, useState, useCallback } from 'react';
import { useTransactionStore } from '../store';
import { ITEMS_PER_PAGE } from '../constants';

export function useFilteredTransactions() {
  const transactions = useTransactionStore((s) => s.transactions);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    type: '',
    dateFrom: '',
    dateTo: '',
    sortBy: 'date',
    sortDir: 'desc',
    page: 1,
  });

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  }, []);

  const setPage = useCallback((page) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const toggleSort = useCallback((field) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      sortDir: prev.sortBy === field && prev.sortDir === 'desc' ? 'asc' : 'desc',
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      category: '',
      type: '',
      dateFrom: '',
      dateTo: '',
      sortBy: 'date',
      sortDir: 'desc',
      page: 1,
    });
  }, []);

  const filtered = useMemo(() => {
    let result = [...transactions];

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (filters.category) {
      result = result.filter((t) => t.category === filters.category);
    }

    // Type
    if (filters.type) {
      result = result.filter((t) => t.type === filters.type);
    }

    // Date range
    if (filters.dateFrom) {
      result = result.filter((t) => t.date >= filters.dateFrom);
    }
    if (filters.dateTo) {
      result = result.filter((t) => t.date <= filters.dateTo);
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      if (filters.sortBy === 'date') {
        cmp = new Date(a.date) - new Date(b.date);
      } else if (filters.sortBy === 'amount') {
        cmp = a.amount - b.amount;
      }
      return filters.sortDir === 'desc' ? -cmp : cmp;
    });

    return result;
  }, [transactions, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (filters.page - 1) * ITEMS_PER_PAGE,
    filters.page * ITEMS_PER_PAGE
  );

  return {
    filters,
    updateFilter,
    setPage,
    toggleSort,
    resetFilters,
    filtered,
    paginated,
    totalPages,
    totalCount: filtered.length,
  };
}
