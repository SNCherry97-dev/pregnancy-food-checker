import React from 'react';

const SearchBar = ({ value, onChange, onClear }) => {
    return (
        <div className="relative w-full max-w-md mx-auto mb-8">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="e.g., Sushi, Coffee, Cheese..."
                className="w-full px-6 py-4 text-lg rounded-full shadow-lg border-2 border-pastel-pink focus:border-pastel-mint focus:outline-none focus:ring-2 focus:ring-pastel-mint transition-all dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
            {value && (
                <button
                    onClick={onClear}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                    ✕
                </button>
            )}
        </div>
    );
};

export default SearchBar;
