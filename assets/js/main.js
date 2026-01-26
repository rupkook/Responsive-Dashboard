
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin Dashboard loaded successfully');
    initializeDashboard();
});

function initializeDashboard() {
    setupSidebar();
    setupMobileMenu();
    setupSubmenus();
    setupChart();
    setupSearch();
    setupNotifications();
}

// Sidebar functionality
function setupSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            
            // Change icon based on sidebar state
            const icon = sidebarToggle.querySelector('i');
            if (sidebar.classList.contains('collapsed')) {
                icon.classList.remove('fa-chevron-left');
                icon.classList.add('fa-chevron-right');
            } else {
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-left');
            }
        });
    }
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileSidebarToggle) {
        mobileSidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking outside on mobile and tablet
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) { // Tablet and mobile only
            if (!sidebar.contains(e.target) && !mobileSidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

// Submenu functionality
function setupSubmenus() {
    const submenuItems = document.querySelectorAll('.has-submenu');
    
    submenuItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close other submenus
            submenuItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('expanded');
                }
            });
            
            // Toggle current submenu
            item.classList.toggle('expanded');
        });
    });
}

// Chart functionality
function setupChart() {
    const ctx = document.getElementById('earningChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Earnings',
                    data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 38000, 40000, 45000],
                    backgroundColor: 'rgba(102, 126, 234, 0.8)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    borderWidth: 1
                }, {
                    label: 'Commission',
                    data: [1200, 1900, 1500, 2500, 2200, 3000, 2800, 3500, 3200, 3800, 4000, 4500],
                    backgroundColor: 'rgba(118, 75, 162, 0.8)',
                    borderColor: 'rgba(118, 75, 162, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += '$' + context.parsed.y.toLocaleString();
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            // Here you would implement actual search functionality
            console.log('Searching for:', searchTerm);
            
            // For demo purposes, just log the search
            if (searchTerm.length > 2) {
                // Implement search logic here
                performSearch(searchTerm);
            }
        });
    }
}

function performSearch(term) {
    // This is a placeholder for actual search functionality
    // You would search through your data and update the UI accordingly
    console.log('Performing search for:', term);
}

// Notification functionality
function setupNotifications() {
    const notificationBtn = document.querySelector('.notification-btn');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            // Toggle notification dropdown
            console.log('Notifications clicked');
            // Here you would show/hide notification dropdown
        });
    }
}

// Responsive handling
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    
    // Hide mobile menu when switching to desktop
    if (window.innerWidth > 1024) {
        sidebar.classList.remove('active');
    }
});

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
}

// Table sorting functionality
function setupTableSorting() {
    const tables = document.querySelectorAll('.data-table');
    
    tables.forEach(table => {
        const headers = table.querySelectorAll('th');
        
        headers.forEach((header, index) => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                sortTable(table, index);
            });
        });
    });
}

function sortTable(table, columnIndex) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();
        
        // Try to parse as numbers
        const aNum = parseFloat(aValue.replace(/[^0-9.-]/g, ''));
        const bNum = parseFloat(bValue.replace(/[^0-9.-]/g, ''));
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return aNum - bNum;
        }
        
        // Fallback to string comparison
        return aValue.localeCompare(bValue);
    });
    
    // Clear and re-append sorted rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
}

// Initialize table sorting when DOM is ready
document.addEventListener('DOMContentLoaded', setupTableSorting);

// Export functions for global access
window.dashboardUtils = {
    formatCurrency,
    formatDate,
    performSearch
};
