import React from 'react';

const TrimesterTip = ({ advice }) => {
    if (!advice) return null;

    return (
        <div className="mt-3 p-3 bg-pastel-lavender/30 rounded-lg border border-pastel-lavender dark:bg-gray-700 dark:border-gray-600">
            <span className="font-semibold text-sm uppercase tracking-wide text-gray-600 dark:text-gray-300">
                Trimester Tip:
            </span>
            <p className="text-gray-700 dark:text-gray-200 mt-1 text-sm">
                {advice}
            </p>
        </div>
    );
};

export default TrimesterTip;
