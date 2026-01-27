
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
    setupHeaderAnimation();
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
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
                datasets: [{
                    label: 'Total earning',
                    data: [95.8, 87.2, 92.5, 103.1, 98.7, 112.3, 88.9, 96.4, 105.2, 91.8, 99.5, 108.7, 94.3, 101.6, 89.2, 97.8, 106.5, 93.1, 100.4, 87.6, 95.3, 104.9, 90.7, 98.2, 107.8, 85.4, 93.7, 102.3, 96.9, 110.5, 89.6],
                    backgroundColor: '#215DB5',
                    borderColor: '#215DB5',
                    borderWidth: 1,
                    borderRadius: 4,
                    barPercentage: 0.8
                }, {
                    label: 'Commission given',
                    data: [12.6, 11.5, 12.2, 13.6, 13.0, 14.8, 11.7, 12.7, 13.9, 12.1, 13.1, 14.3, 12.4, 13.4, 11.8, 12.9, 14.0, 12.3, 13.2, 11.5, 12.5, 13.8, 11.9, 12.9, 14.2, 11.2, 12.3, 13.5, 12.7, 14.5, 11.8],
                    backgroundColor: '#599CFF',
                    borderColor: '#599CFF',
                    borderWidth: 1,
                    borderRadius: 4,
                    barPercentage: 0.8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'end',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                family: 'Poppins',
                                size: 12
                            },
                            generateLabels: function(chart) {
                                return [
                                    {
                                        text: 'Total earning: $2,968.90',
                                        fillStyle: '#215DB5',
                                        strokeStyle: '#215DB5',
                                        pointStyle: 'circle',
                                        lineWidth: 0
                                    },
                                    {
                                        text: 'Commission given: $390.66',
                                        fillStyle: '#599CFF',
                                        strokeStyle: '#599CFF',
                                        pointStyle: 'circle',
                                        lineWidth: 0
                                    }
                                ];
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            family: 'Poppins',
                            size: 12
                        },
                        bodyFont: {
                            family: 'Poppins',
                            size: 11
                        },
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += '$' + context.parsed.y.toFixed(2);
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'Poppins',
                                size: 11
                            },
                            color: '#6B7280'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 400,
                        grid: {
                            color: '#E5E7EB',
                            drawBorder: false
                        },
                        ticks: {
                            stepSize: 100,
                            font: {
                                family: 'Poppins',
                                size: 11
                            },
                            color: '#6B7280',
                            callback: function(value) {
                                return value + 'K';
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

// Header animation on page load
function setupHeaderAnimation() {
    const header = document.querySelector('.header');
    
    // Show header with smooth transition from top
    setTimeout(() => {
        header.style.transform = 'translateY(0)';
    }, 300);
}

// Toggle submenu function
function toggleSubmenu(wrapElement) {
    // Find the submenu within the wrap element
    const submenu = wrapElement.querySelector('.submenu');
    const arrow = wrapElement.querySelector('.nav-toggle');
    
    if (submenu) {
        // Toggle submenu
        submenu.classList.toggle('active');
        
        // Rotate arrow
        arrow.classList.toggle('rotated');
    }
}

// Export functions for global access
window.dashboardUtils = {
    formatCurrency,
    formatDate,
    performSearch
};

// Make toggleSubmenu globally available
window.toggleSubmenu = toggleSubmenu;
