import React, { useState, useMemo } from 'react';
import { FaTrash, FaUtensils, FaBus, FaHome, FaFilm, FaShoppingBag, FaHeartbeat, FaBook, FaTags } from 'react-icons/fa';
import { format } from 'date-fns';

const categoryIcons = {
  Food: <FaUtensils className="text-green-500" />,
  Transportation: <FaBus className="text-blue-500" />,
  Housing: <FaHome className="text-purple-500" />,
  Entertainment: <FaFilm className="text-yellow-500" />,
  Shopping: <FaShoppingBag className="text-pink-500" />,
  Healthcare: <FaHeartbeat className="text-red-500" />,
  Education: <FaBook className="text-indigo-500" />,
  Other: <FaTags className="text-gray-500" />,
};

export default function ExpenseList({ expenses, isLoading, onDelete }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const filteredExpenses = useMemo(() => {
    return expenses.filter(exp =>
      exp.category.toLowerCase().includes(search.toLowerCase()) ||
      exp.note?.toLowerCase().includes(search.toLowerCase()) ||
      format(new Date(exp.date), 'MMM dd, yyyy')
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [expenses, search]);

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const paginatedExpenses = filteredExpenses.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No expenses recorded yet. Add your first expense to get started!
      </div>
    );
  }

  return (
    <div>
      {/* Search */}
      <div className="mb-6 flex justify-between items-center flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by category, note, or date..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedExpenses.map(exp => (
          <div
            key={exp._id}
            className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
          >
            {/* Top */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {categoryIcons[exp.category] || categoryIcons.Other}
                <span className="font-semibold text-gray-800">{exp.category}</span>
              </div>
              <span className="text-sm text-gray-500">
                {format(new Date(exp.date), 'MMM dd, yyyy')}
              </span>
            </div>

            {/* Middle */}
            <div className="mb-3">
              <p className="text-2xl font-bold text-indigo-600">₹{exp.amount.toFixed(2)}</p>
              <p className="text-gray-500 text-sm">{exp.note || 'No note provided'}</p>
            </div>

            {/* Bottom */}
            <div className="flex justify-end">
              <button
                onClick={() => onDelete(exp._id)}
                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
        >
          Prev
        </button>
        <span className="px-3 py-2">Page {page} of {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
