console.log("script.js loaded and running");

// Sample problems data
const problems = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        acceptance: "47.8%",
        tags: ["Array", "Hash Table"],
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        examples: [
            { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
            { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
        ],
        status: "solved"
    },
    {
        id: 2,
        title: "Add Two Numbers",
        difficulty: "Medium",
        acceptance: "38.7%",
        tags: ["Linked List", "Math"],
        description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
        examples: [
            { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]" }
        ],
        status: "attempted"
    },
    {
        id: 3,
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        acceptance: "34.2%",
        tags: ["Hash Table", "Two Pointers", "String"],
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        examples: [
            { input: "s = \"abcabcbb\"", output: "3" },
            { input: "s = \"bbbbb\"", output: "1" }
        ],
        status: "not-attempted"
    },
    {
        id: 4,
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        acceptance: "32.8%",
        tags: ["Array", "Binary Search", "Divide and Conquer"],
        description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
        examples: [
            { input: "nums1 = [1,3], nums2 = [2]", output: "2.0" }
        ],
        status: "not-attempted"
    },
    {
        id: 5,
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        acceptance: "31.5%",
        tags: ["String", "Dynamic Programming"],
        description: "Given a string s, return the longest palindromic substring in s.",
        examples: [
            { input: "s = \"babad\"", output: "\"bab\"" },
            { input: "s = \"cbbd\"", output: "\"bb\"" }
        ],
        status: "solved"
    }
];

// DOM Elements
const problemsList = document.getElementById('problems-list');
const problemModal = document.getElementById('problem-modal');
const closeBtn = document.querySelector('.close-btn');
const problemTitle = document.getElementById('problem-title');
const problemDifficulty = document.getElementById('problem-difficulty');
const problemDescription = document.getElementById('problem-description-text');
const problemExamples = document.getElementById('problem-examples');
const codeInput = document.getElementById('code-input');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadProblems();
    setupEventListeners();
});

// Load problems into the table
function loadProblems() {
    problemsList.innerHTML = '';
    
    problems.forEach(problem => {
        const row = document.createElement('div');
        row.className = 'problem-row';
        
        const statusIcon = getStatusIcon(problem.status);
        const difficultyClass = `difficulty-${problem.difficulty.toLowerCase()}`;
        
        row.innerHTML = `
            <div class="status-icon ${statusIcon.class}">${statusIcon.icon}</div>
            <div class="problem-title">${problem.title}</div>
            <div class="difficulty ${difficultyClass}">${problem.difficulty}</div>
            <div class="acceptance">${problem.acceptance}</div>
            <div class="tags">
                ${problem.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;
        
        problemsList.appendChild(row);

        // Add event listener for problem title click
        const titleElement = row.querySelector('.problem-title');
        titleElement.addEventListener('click', () => openProblem(problem.id));
    });
}

// Get status icon based on problem status
function getStatusIcon(status) {
    switch(status) {
        case 'solved':
            return { class: 'status-solved', icon: '✓' };
        case 'attempted':
            return { class: 'status-attempted', icon: '!' };
        default:
            return { class: 'status-not-attempted', icon: '○' };
    }
}

// Setup event listeners
function setupEventListeners() {
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        if (event.target === problemModal) {
            closeModal();
        }
    });
}

// Open problem modal
function openProblem(problemId) {
    const problem = problems.find(p => p.id === problemId);
    if (!problem) return;
    
    problemTitle.textContent = problem.title;
    problemDifficulty.textContent = problem.difficulty;
    problemDifficulty.className = `difficulty-badge difficulty-${problem.difficulty.toLowerCase()}`;
    problemDescription.textContent = problem.description;
    
    // Load examples
    problemExamples.innerHTML = '';
    problem.examples.forEach((example, index) => {
        const exampleDiv = document.createElement('div');
        exampleDiv.innerHTML = `
            <p><strong>Example ${index + 1}:</strong></p>
            <p><strong>Input:</strong> ${example.input}</p>
            <p><strong>Output:</strong> ${example.output}</p>
        `;
        problemExamples.appendChild(exampleDiv);
    });
    
    // Reset code editor
    codeInput.value = getDefaultCode(problem.title);
    
    // Show modal by adding class
    problemModal.classList.add('modal-show');
}

// Close problem modal
function closeModal() {
    // Hide modal by removing class
    problemModal.classList.remove('modal-show');
}

// Get default code template based on problem
function getDefaultCode(problemTitle) {
    return `// ${problemTitle}
// Write your solution here

function solution() {
    // Your code here
    
    return result;
}

// Test cases
console.log(solution());`;
}

// Run code functionality
function runCode() {
    const code = codeInput.value;
    const output = document.getElementById('output-result');
    
    try {
        // Simple evaluation (in real app, this would be sent to backend)
        output.textContent = "Running code...\n\nOutput: Hello World!";
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
    }
}

// Submit code functionality
function submitCode() {
    const code = codeInput.value;
    const output = document.getElementById('output-result');
    
    // Simulate submission
    output.textContent = "Submitting solution...\n\n✓ Accepted!";
    
    // Close modal after 2 seconds
    setTimeout(() => {
        closeModal();
    }, 2000);
}

// Filter functionality
document.querySelectorAll('.filter-select').forEach(select => {
    select.addEventListener('change', filterProblems);
});

function filterProblems() {
    const difficultyFilter = document.querySelector('.filter-select:nth-child(1)').value;
    const topicFilter = document.querySelector('.filter-select:nth-child(2)').value;
    
    // In real app, this would filter the problems
    console.log('Filtering by:', { difficulty: difficultyFilter, topic: topicFilter });
}

// Smooth scrolling for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add loading animation
function showLoading() {
    problemsList.innerHTML = '<div class="loading">Loading problems...</div>';
}

// Add responsive menu toggle (for mobile)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && problemModal.style.display === 'block') {
        closeModal();
    }
});

// Add search functionality
function searchProblems(query) {
    const filtered = problems.filter(problem => 
        problem.title.toLowerCase().includes(query.toLowerCase()) ||
        problem.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    
    // Update display with filtered results
    console.log('Search results:', filtered);
}

// Initialize tooltips and other UI enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects
    document.querySelectorAll('.problem-row').forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
            this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});
