import React from 'react';
import TrimesterTip from './TrimesterTip';

const FoodCard = ({ food }) => {
    const getStatusColor = (category) => {
        switch (category.toLowerCase()) {
            case 'bad': return 'bg-red-100 border-red-300 text-red-800 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800';
            case 'not recommended': return 'bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-800';
            case 'recommended': return 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:text-green-200 dark:border-green-800';
            default: return 'bg-gray-100 border-gray-300 text-gray-800';
        }
    };

    const getEmoji = (category) => {
        switch (category.toLowerCase()) {
            case 'bad': return '⛔';
            case 'not recommended': return '⚠️';
            case 'recommended': return '✅';
            default: return '❓';
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-4 border border-gray-100 dark:border-gray-700 transition-transform hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{food.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(food.category)}`}>
                    {getEmoji(food.category)} {food.category.toUpperCase()}
                </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {food.explanation}
            </p>

            <TrimesterTip advice={food.trimester_advice} />
        </div>
    );
};

export default FoodCard;
