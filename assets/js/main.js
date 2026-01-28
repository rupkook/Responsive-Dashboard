

document.addEventListener('DOMContentLoaded', function() {

    console.log('Admin Dashboard loaded successfully');

    initializeDashboard();

});



function initializeDashboard() {

    setupSidebar();

    setupMobileMenu();

    setupChart();

    setupHeaderAnimation();

    setupSidebarSubmenus();

    initDateRangePicker();

}



// Sidebar functionality
function setupSidebar() {

    const sidebarToggle = document.getElementById('sidebarToggle');

    const sidebar = document.getElementById('sidebar');

    const navIcons = document.querySelector('.nav-icons'); // get the .nav-icons element

    

    if (sidebarToggle) {

        sidebarToggle.addEventListener('click', function() {

            sidebar.classList.toggle('collapsed');

            

            // Rotate toggle button arrow

            const icon = sidebarToggle.querySelector('img');

            if (sidebar.classList.contains('collapsed')) {

                icon.style.transform = 'rotate(180deg)';

                // Show nav-icons only when collapsed

                navIcons.style.display = 'block';

            } else {

                icon.style.transform = 'rotate(0deg)';

                // Hide nav-icons when expanded

                navIcons.style.display = 'none';

            }

            

            // Debug: Log the current state

            console.log('Sidebar collapsed:', sidebar.classList.contains('collapsed'));

        });

    }

}







// Mobile menu functionality

function setupMobileMenu() {

    const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');

    const sidebar = document.getElementById('sidebar');
    
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    

    if (mobileSidebarToggle) {

        mobileSidebarToggle.addEventListener('click', function() {

            sidebar.classList.toggle('active');
            
            sidebarOverlay.classList.toggle('active');

        });

    }

    

    // Close sidebar when clicking overlay

    if (sidebarOverlay) {

        sidebarOverlay.addEventListener('click', function() {

            sidebar.classList.remove('active');
            
            sidebarOverlay.classList.remove('active');

        });

    }

    

    // Close sidebar when clicking outside on mobile and tablet

    document.addEventListener('click', function(e) {

        if (window.innerWidth <= 1024) { // Tablet and mobile only

            if (!sidebar.contains(e.target) && !mobileSidebarToggle.contains(e.target)) {

                sidebar.classList.remove('active');
                
                sidebarOverlay.classList.remove('active');

            }

        }

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











// Responsive handling

window.addEventListener('resize', function() {

    const sidebar = document.getElementById('sidebar');

    

    // Hide mobile menu when switching to desktop

    if (window.innerWidth > 1024) {

        sidebar.classList.remove('active');

    }

});





// Header animation on page load

function setupHeaderAnimation() {

    const header = document.querySelector('.header');

    

    // Show header with smooth transition from top

    setTimeout(() => {

        header.style.transform = 'translateY(0)';

    }, 300);

}



// Sidebar submenus functionality

function setupSidebarSubmenus() {

    document.querySelectorAll(".has-submenu").forEach(item => {

        item.addEventListener("click", () => {

            item.classList.toggle("active");

        });

    });

}





// Date range functionality

function initDateRangePicker() {

const dateRange = document.querySelector(".date-range");

const startDate = document.getElementById("#startDate");

const endDate = document.getElementById("#endDate");

const dateText = document.getElementById("#dateText");



if (!dateRange || !startDate || !endDate || !dateText) {

console.log("Date range elements not found");

return;

}



console.log("Date range elements found:", { dateRange, startDate, endDate, dateText });



dateRange.addEventListener("click", () => {

console.log("Date range clicked");

startDate.click();

});



startDate.addEventListener("change", () => {

console.log("Start date changed:", startDate.value);

endDate.click();

});



endDate.addEventListener("change", () => {

console.log("End date changed:", endDate.value);

const start = new Date(startDate.value).toDateString();

const end = new Date(endDate.value).toDateString();

dateText.innerText = `${start} - ${end}`;

console.log("Date text updated:", dateText.innerText);

});

}

