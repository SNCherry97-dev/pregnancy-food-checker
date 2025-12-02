import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import FoodCard from './components/FoodCard';
import DarkModeToggle from './components/DarkModeToggle';
import './index.css';
import foodsData from './foodsData.js';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [nameMatchCount, setNameMatchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [suggestMode, setSuggestMode] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setNameMatchCount(0);
      setNotFound(false);
      return;
    }

    const delaySearch = setTimeout(() => {
      setLoading(true);
      try {
        const searchQuery = query.toLowerCase();

        // Separate results into name matches and keyword matches
        const nameMatches = [];
        const keywordMatches = [];

        foodsData.forEach(food => {
          const nameMatch = food.name.toLowerCase().includes(searchQuery);
          const keywordMatch = food.keywords.some(k => k.toLowerCase().includes(searchQuery));

          if (nameMatch) {
            nameMatches.push(food);
          } else if (keywordMatch) {
            keywordMatches.push(food);
          }
        });

        // Combine results: name matches first, then keyword matches
        const combinedResults = [...nameMatches, ...keywordMatches];

        setResults(combinedResults);
        setNameMatchCount(nameMatches.length);
        setNotFound(combinedResults.length === 0);
      } catch (error) {
        console.error('Error searching foods:', error);
        setResults([]);
        setNameMatchCount(0);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [query]);

  const handleSuggest = async () => {
    if (!query.trim()) return;

    try {
      const response = await fetch('https://pregnancy-food-checker-v2.onrender.com/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foodName: query }),
      });

      if (response.ok) {
        alert('✅ Thanks! We received your suggestion and will review it.');
        setQuery('');
        setSuggestMode(false);
      } else {
        alert('❌ Failed to submit suggestion. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      alert('❌ Failed to submit suggestion. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink/20 via-pastel-mint/20 to-pastel-purple/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              🤰 Pregnancy Food Checker
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Your friendly guide to safe eating during pregnancy
            </p>
          </div>
          <DarkModeToggle />
        </div>

        {/* Disclaimer */}
        <div className="bg-pastel-yellow/30 dark:bg-yellow-900/20 border border-pastel-yellow dark:border-yellow-800 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>⚠️ Disclaimer:</strong> This tool provides general information based on medical guidelines.
            Always consult your healthcare provider for personalized advice.
          </p>
        </div>

        {/* Search */}
        <SearchBar
          value={query}
          onChange={setQuery}
          onClear={() => setQuery('')}
        />

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="animate-pulse">Searching...</div>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div>
            {results.map((food, index) => (
              <div key={food.id}>
                <FoodCard food={food} />
                {/* Show divider after name matches, before keyword matches */}
                {index === nameMatchCount - 1 && nameMatchCount < results.length && (
                  <div className="my-6 text-center">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-medium">
                          More options
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Not Found */}
        {!loading && notFound && query.trim() && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center border border-gray-100 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Hmm, we don't have info on "<strong>{query}</strong>" yet.
            </p>
            <button
              onClick={handleSuggest}
              className="px-6 py-3 bg-pastel-mint hover:bg-pastel-mint/80 dark:bg-pastel-mint/20 dark:hover:bg-pastel-mint/30 text-gray-800 dark:text-white font-semibold rounded-full transition-colors shadow-md"
            >
              📝 Suggest this food
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !query.trim() && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-12">
            <p className="text-lg">👆 Start typing a food name above</p>
            <p className="text-sm mt-2">Try: sushi, coffee, cheese, salmon...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
