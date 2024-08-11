const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let habits = [];

app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Get all habits
app.get('/habits', (req, res) => {
    res.json(habits);
});

// Add a new habit
app.post('/habits', (req, res) => {
    const habit = req.body;
    habits.push(habit);
    res.status(201).json(habit);
});

// Update a habit
app.put('/habits/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedHabit = req.body;
    
    habits = habits.map(habit => 
        habit.id === id ? { ...habit, ...updatedHabit } : habit
    );
    
    res.json(updatedHabit);
});

// Delete a habit
app.delete('/habits/:id', (req, res) => {
    const id = parseInt(req.params.id);
    habits = habits.filter(habit => habit.id !== id);
    
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
