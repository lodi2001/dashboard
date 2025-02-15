// Get dashboard ID from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const dashboardId = urlParams.get('id');

// Find dashboard data
const dashboard = dummyDashboards.find(d => d.id === parseInt(dashboardId)) || dummyDashboards[0];

// Update dashboard title
document.getElementById('dashboardTitle').textContent = dashboard.title;

// Chart color scheme
const colors = {
    primary: '#1a237e',
    secondary: '#3949ab',
    accent: '#7986cb',
    success: '#4caf50',
    danger: '#f44336'
};

// Initialize charts
document.addEventListener('DOMContentLoaded', () => {
    initRevenueChart();
    initTrafficChart();
    initActivityChart();
});

// Revenue Line Chart
function initRevenueChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Revenue',
            data: [12000, 19000, 15000, 25000, 22000, 30000],
            borderColor: colors.primary,
            backgroundColor: 'rgba(26, 35, 126, 0.1)',
            fill: true,
            tension: 0.4
        }]
    };

    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => '$' + value.toLocaleString()
                    }
                }
            }
        }
    });
}

// Traffic Sources Doughnut Chart
function initTrafficChart() {
    const ctx = document.getElementById('trafficChart').getContext('2d');
    const data = {
        labels: ['Direct', 'Social', 'Referral', 'Organic'],
        datasets: [{
            data: [35, 25, 20, 20],
            backgroundColor: [
                colors.primary,
                colors.secondary,
                colors.accent,
                colors.success
            ]
        }]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// User Activity Bar Chart
function initActivityChart() {
    const ctx = document.getElementById('activityChart').getContext('2d');
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Active Users',
            data: [1200, 1900, 1500, 2500, 2200, 1800, 1600],
            backgroundColor: colors.secondary
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Handle time range changes
document.getElementById('timeRange').addEventListener('change', (e) => {
    // In a real application, this would fetch new data based on the selected time range
    // For this demo, we'll just log the selected range
    console.log('Selected time range:', e.target.value);
});
