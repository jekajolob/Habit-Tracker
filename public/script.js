let habits = [];

function addHabit() {
    const input = document.getElementById('habit-input');
    const habitText = input.value.trim();

    if (habitText !== '') {
        const habit = {
            id: Date.now(),
            text: habitText,
            completed: false
        };
        habits.push(habit);
        input.value = '';
        renderHabits();
    }
}

function renderHabits() {
    const habitList = document.getElementById('habit-list');
    habitList.innerHTML = '';

    habits.forEach(habit => {
        const li = document.createElement('li');
        li.className = habit.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${habit.text}</span>
            <button class="complete" onclick="toggleComplete(${habit.id})">Complete</button>
            <button class="edit" onclick="editHabit(${habit.id})">Edit</button>
            <button class="delete" onclick="deleteHabit(${habit.id})">Delete</button>
        `;
        habitList.appendChild(li);
    });
}

function toggleComplete(id) {
    habits = habits.map(habit => 
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
    renderHabits();
}

function editHabit(id) {
    const newHabitText = prompt('Edit the habit:', habits.find(habit => habit.id === id).text);

    if (newHabitText !== null && newHabitText.trim() !== '') {
        habits = habits.map(habit => 
            habit.id === id ? { ...habit, text: newHabitText } : habit
        );
        renderHabits();
    }
}

function deleteHabit(id) {
    habits = habits.filter(habit => habit.id !== id);
    renderHabits();
}
