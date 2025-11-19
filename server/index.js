const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, '../data/foods.json');
const SUGGESTIONS_FILE = path.join(__dirname, '../data/suggestions.json');

// Helper to read data
const getFoods = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading food data:", err);
        return [];
    }
};

// Search Endpoint with prioritized sorting
app.get('/api/foods', (req, res) => {
    const query = req.query.q?.toLowerCase() || '';
    if (!query) return res.json({ results: [], nameMatchCount: 0 });

    const foods = getFoods();

    // Separate results into name matches and keyword matches
    const nameMatches = [];
    const keywordMatches = [];

    foods.forEach(food => {
        const nameMatch = food.name.toLowerCase().includes(query);
        const keywordMatch = food.keywords.some(k => k.toLowerCase().includes(query));

        if (nameMatch) {
            nameMatches.push(food);
        } else if (keywordMatch) {
            keywordMatches.push(food);
        }
    });

    // Combine results: name matches first, then keyword matches
    const results = [...nameMatches, ...keywordMatches];

    // Return results with metadata about where to show divider
    res.json({
        results,
        nameMatchCount: nameMatches.length
    });
});

// Suggestion Endpoint
app.post('/api/suggest', (req, res) => {
    const { foodName } = req.body;
    if (!foodName) return res.status(400).json({ error: 'Food name is required' });

    let suggestions = [];
    try {
        if (fs.existsSync(SUGGESTIONS_FILE)) {
            suggestions = JSON.parse(fs.readFileSync(SUGGESTIONS_FILE, 'utf8'));
        }
    } catch (err) {
        // Ignore error if file doesn't exist or is corrupt
    }

    suggestions.push({ foodName, date: new Date().toISOString() });

    try {
        fs.writeFileSync(SUGGESTIONS_FILE, JSON.stringify(suggestions, null, 2));
        res.json({ success: true, message: 'Suggestion received!' });
    } catch (err) {
        console.error("Error saving suggestion:", err);
        res.status(500).json({ error: 'Failed to save suggestion' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
