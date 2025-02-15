// Dummy data
const dummyDashboards = [
    {
        id: 1,
        title: 'Sales Overview',
        type: 'daily',
        icon: 'trending_up',
        publishDate: '2025-02-15',
        description: 'Daily sales performance metrics',
        editor: 'Sarah Johnson',
        isFavorite: true
    },
    {
        id: 2,
        title: 'Customer Analytics',
        type: 'weekly',
        icon: 'people',
        publishDate: '2025-02-14',
        description: 'Weekly customer behavior analysis',
        editor: 'Mike Chen',
        isFavorite: false
    },
    {
        id: 3,
        title: 'Revenue Report',
        type: 'monthly',
        icon: 'attach_money',
        publishDate: '2025-02-01',
        description: 'Monthly revenue breakdown',
        editor: 'Alex Smith',
        isFavorite: true
    },
    {
        id: 4,
        title: 'User Engagement',
        type: 'daily',
        icon: 'insights',
        publishDate: '2025-02-15',
        description: 'Daily user activity metrics',
        editor: 'Emma Davis',
        isFavorite: false
    }
];

const dummyUser = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    preferences: {
        language: 'English',
        theme: 'Light'
    }
};

const dummyNotifications = [
    {
        id: 1,
        title: 'Dashboard Updated',
        message: 'Sales Overview dashboard has been updated',
        time: '2 hours ago',
        read: false
    },
    {
        id: 2,
        title: 'New Comment',
        message: 'Mike Chen commented on Revenue Report',
        time: '5 hours ago',
        read: false
    },
    {
        id: 3,
        title: 'System Alert',
        message: 'Server maintenance scheduled for tomorrow',
        time: '1 day ago',
        read: true
    }
];

// Handle login form submission
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'dashboards.html';
        });
    }

    // Handle navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            if (page) {
                window.location.href = `${page}.html`;
            }
        });
    });

    // Handle dashboard filtering
    const timelineFilter = document.getElementById('timelineFilter');
    if (timelineFilter) {
        timelineFilter.addEventListener('change', (e) => {
            filterDashboards(e.target.value);
        });
    }

    // Handle notifications
    const notificationsButton = document.getElementById('notificationsButton');
    if (notificationsButton) {
        notificationsButton.addEventListener('click', () => {
            showNotifications();
        });
    }
});

function filterDashboards(timeframe) {
    const filteredDashboards = dummyDashboards.filter(dash => dash.type === timeframe);
    displayDashboards(filteredDashboards);
}

function displayDashboards(dashboards) {
    const container = document.querySelector('.dashboard-list');
    if (!container) return;

    container.innerHTML = dashboards.map(dash => `
        <div class="dashboard-card" onclick="location.href='dashboard-detail.html?id=${dash.id}'">
            <span class="dashboard-type">${dash.type}</span>
            <div class="dashboard-card-header">
                <div class="dashboard-icon">
                    <i class="material-icons">${dash.icon}</i>
                </div>
                <div class="dashboard-info">
                    <div class="dashboard-title">${dash.title}</div>
                    <div class="dashboard-date">Published: ${formatDate(dash.publishDate)}</div>
                    <div class="dashboard-editor">Editor: <span>${dash.editor}</span></div>
                </div>
                <button class="favorite-button" onclick="toggleFavorite(event, ${dash.id})">
                    <i class="material-icons">${dash.isFavorite ? 'star' : 'star_border'}</i>
                </button>
            </div>
            <p>${dash.description}</p>
        </div>
    `).join('');
}

function toggleFavorite(event, dashboardId) {
    event.stopPropagation();
    const dashboard = dummyDashboards.find(d => d.id === dashboardId);
    if (dashboard) {
        dashboard.isFavorite = !dashboard.isFavorite;
        const icon = event.currentTarget.querySelector('i');
        icon.textContent = dashboard.isFavorite ? 'star' : 'star_border';
    }
}

function showNotifications() {
    const container = document.querySelector('.notifications-panel');
    container.classList.toggle('show');
    
    container.innerHTML = `
        <div class="notifications-header">
            <h3>Notifications</h3>
            <button onclick="closeNotifications()">
                <i class="material-icons">close</i>
            </button>
        </div>
        <div class="notifications-list">
            ${dummyNotifications.map(notif => `
                <div class="notification-item ${notif.read ? 'read' : ''}">
                    <div class="notification-content">
                        <h4>${notif.title}</h4>
                        <p>${notif.message}</p>
                        <span class="notification-time">${notif.time}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function closeNotifications() {
    document.querySelector('.notifications-panel').classList.remove('show');
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
