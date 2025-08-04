// Dashboard specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    loadDashboardData();
    generateHeatmap();
});

// Initialize dashboard
function initializeDashboard() {
    setupDashboardEventListeners();
    loadUserStats();
    loadProgressData();
}

// Load dashboard data
function loadDashboardData() {
    // Simulate loading dashboard data
    setTimeout(() => {
        updateStatsDisplay();
        updateProgressCharts();
    }, 500);
}

// User stats data
const userStats = {
    problemsSolved: 127,
    currentStreak: 15,
    ranking: 1234,
    totalTime: 48,
    difficultyProgress: {
        easy: { solved: 75, total: 100 },
        medium: { solved: 45, total: 100 },
        hard: { solved: 7, total: 28 }
    },
    topicProgress: {
        array: { solved: 32, total: 40 },
        string: { solved: 26, total: 40 },
        dynamicProgramming: { solved: 12, total: 30 },
        tree: { solved: 11, total: 20 }
    }
};

// Update stats display
function updateStatsDisplay() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 4) {
        statNumbers[0].textContent = userStats.problemsSolved;
        statNumbers[1].textContent = userStats.currentStreak;
        statNumbers[2].textContent = `#${userStats.ranking}`;
        statNumbers[3].textContent = `${userStats.totalTime}h`;
    }
}

// Update progress charts
function updateProgressCharts() {
    // Update difficulty progress
    const difficultyItems = document.querySelectorAll('.progress-item');
    if (difficultyItems.length >= 3) {
        const difficulties = ['easy', 'medium', 'hard'];
        difficulties.forEach((diff, index) => {
            const progress = userStats.difficultyProgress[diff];
            const percentage = Math.round((progress.solved / progress.total) * 100);
            const fill = difficultyItems[index].querySelector('.progress-fill');
            if (fill) {
                fill.style.width = `${percentage}%`;
                fill.textContent = `${progress.solved}/${progress.total}`;
            }
        });
    }

    // Update topic progress
    const topicItems = document.querySelectorAll('.topic-item');
    if (topicItems.length >= 4) {
        const topics = ['array', 'string', 'dynamicProgramming', 'tree'];
        topics.forEach((topic, index) => {
            const progress = userStats.topicProgress[topic];
            const percentage = Math.round((progress.solved / progress.total) * 100);
            const fill = topicItems[index].querySelector('.topic-fill');
            if (fill) {
                fill.style.width = `${percentage}%`;
                fill.textContent = `${progress.solved}/${progress.total}`;
            }
        });
    }
}

// Generate heatmap
function generateHeatmap() {
    const heatmapGrid = document.getElementById('heatmap-grid');
    if (!heatmapGrid) return;

    // Generate 365 days of activity data
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364);

    const activityData = [];
    for (let i = 0; i < 365; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        // Random activity level (0-4)
        const activityLevel = Math.floor(Math.random() * 5);
        activityData.push({
            date: date,
            level: activityLevel
        });
    }

    // Create heatmap cells
    heatmapGrid.innerHTML = '';
    const weeks = Math.ceil(365 / 7);
    
    for (let week = 0; week < weeks; week++) {
        for (let day = 0; day < 7; day++) {
            const index = week * 7 + day;
            if (index >= 365) break;
            
            const cell = document.createElement('div');
            cell.className = `heatmap-cell level-${activityData[index].level}`;
            cell.title = activityData[index].date.toLocaleDateString();
            heatmapGrid.appendChild(cell);
        }
    }
}

// Load user stats
function loadUserStats() {
    // Animate counters
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/[0-9]+/, target);
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/[0-9]+/, Math.floor(current));
            }
        }, 30);
    });
}

// Setup dashboard event listeners
function setupDashboardEventListeners() {
    // Contest registration buttons
    document.querySelectorAll('.contest-item button').forEach(button => {
        button.addEventListener('click', function() {
            const contestName = this.closest('.contest-item').querySelector('h4').textContent;
            alert(`Registered for ${contestName}!`);
            this.textContent = 'Registered';
            this.disabled = true;
        });
    });

    // Responsive menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Simulate real-time updates
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Update ranking
        const rankingElement = document.querySelector('.stat-number:nth-child(3)');
        if (rankingElement) {
            const currentRank = parseInt(rankingElement.textContent.replace('#', ''));
            const newRank = Math.max(1, currentRank + Math.floor(Math.random() * 3) - 1);
            rankingElement.textContent = `#${newRank}`;
        }
    }, 30000); // Update every 30 seconds
}

// Initialize dashboard
initializeDashboard();
simulateRealTimeUpdates();
