// ==========================================================
// GOOGLE APPS SCRIPT API URL
// ==========================================================

const API_URL =
    "https://script.google.com/macros/s/AKfycbz6FxLzFymdvGxZU3jYCf_7vDMNmKMLjUoR-r65vLLohdcIEbFAeoKZDO6n6TgbUcE/exec";



// ==========================================================
// GLOBAL VARIABLES
// ==========================================================

let revenueChart;



// ==========================================================
// LOAD DASHBOARD DATA
// ==========================================================

async function loadDashboard() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to load dashboard data.");
        }

        const data = await response.json();

        console.log("Dashboard Data:", data);



        // ==================================================
        // RASIKA DATA
        // ==================================================

        const rasikaRevenue = Number(data.rasika.closed);
        const rasikaDeals = Number(data.rasika.total);

        document.getElementById("rasika-revenue").textContent =
            rasikaRevenue.toLocaleString();

        document.getElementById("rasika-deals").textContent =
            rasikaDeals.toLocaleString();



        // ==================================================
        // RAMZI DATA
        // ==================================================

        const ramziRevenue = Number(data.ramzi.closed);
        const ramziDeals = Number(data.ramzi.total);

        document.getElementById("ramzi-revenue").textContent =
            ramziRevenue.toLocaleString();

        document.getElementById("ramzi-deals").textContent =
            ramziDeals.toLocaleString();



        // ==================================================
        // DETERMINE WINNER
        // ==================================================

        const rasikaCard =
            document.querySelector(".rasika-card");

        const ramziCard =
            document.querySelector(".ramzi-card");

        rasikaCard.classList.remove("winner");
        ramziCard.classList.remove("winner");



        if (rasikaRevenue > ramziRevenue) {

            rasikaCard.classList.add("winner");

        }

        else if (ramziRevenue > rasikaRevenue) {

            ramziCard.classList.add("winner");

        }



        // ==================================================
        // DRAW BAR CHART
        // ==================================================

        createRevenueChart(

            rasikaRevenue,

            ramziRevenue

        );

    }

    catch (error) {

        console.error("Dashboard Error:", error);

    }

}

// ==========================================================
// UPDATE LEADING CARD
// ==========================================================

function updateLeadingCard(
    rasikaRevenue,
    ramziRevenue
){

    const leadingText =
        document.getElementById("leadingText");


    const difference =
        Math.abs(
            rasikaRevenue - ramziRevenue
        ).toLocaleString();



    if(rasikaRevenue > ramziRevenue){


        leadingText.innerHTML =

        `
        🏆 RASIKA IS LEADING BY ${difference}
        `;


    }


    else if(ramziRevenue > rasikaRevenue){


        leadingText.innerHTML =

        `
        🏆 RAMZI IS LEADING BY ${difference}
        `;


    }


    else{


        leadingText.innerHTML =

        `
        🤝 BOTH ARE CURRENTLY EQUAL
        `;


    }


}

// ==========================================================
// CREATE BAR CHART
// ==========================================================

function createRevenueChart(

    rasikaRevenue,

    ramziRevenue

) {

        const canvas = document.getElementById("revenueChart");

    if (!canvas) {

        console.error("Chart canvas not found.");

        return;

    }



    if (revenueChart) {

        revenueChart.destroy();

    }



    revenueChart = new Chart(canvas, {

        type: "bar",

        data: {

            labels: [

                "Rasika",

                "Ramzi"

            ],

            datasets: [

                {

                    label: "Total Revenue",

                    data: [

                        rasikaRevenue,

                        ramziRevenue

                    ],

                    backgroundColor: [

                        "rgba(0,255,153,0.85)",

                        "rgba(51,153,255,0.85)"

                    ],

                    borderColor: [

                        "#00ff99",

                        "#3399ff"

                    ],

                    borderWidth: 4,

                    borderRadius: 24,

                    borderSkipped: false,

                    barPercentage: 0.85,

                    categoryPercentage: 0.85,

                    hoverBackgroundColor: [

                        "#00ff99",

                        "#3399ff"

                    ],

                    hoverBorderWidth: 4

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            animation: {

                duration: 1600,

                easing: "easeOutQuart"

            },

            plugins: {

                legend: {

                    display: false

                },

                tooltip: {

                    backgroundColor: "rgba(18,18,18,.95)",

                    titleColor: "#ffffff",

                    bodyColor: "#ffffff",

                    padding: 16,

                    cornerRadius: 14,

                    displayColors: false,

                    callbacks: {

                        label(context) {

                            return (
                                "Revenue : " +
                                Number(context.raw).toLocaleString()
                            );

                        }

                    }

                }

            },

            scales: {

                x: {

                    grid: {

                        display: false

                    },

                    border: {

                        display: false

                    },

                    ticks: {

                        color: "#ffffff",

                        font: {

                            size: 24,

                            weight: "700"

                        }

                    }

                },

                y: {

                    beginAtZero: true,

                    border: {

                        display: false

                    },

                    grid: {

                        color: "rgba(255,255,255,.12)",

                        drawBorder: false

                    },

                    ticks: {

                        color: "rgba(255,255,255,.70)",

                        font: {

                            size: 16

                        }

                    }

                }

            }

        }

    });

    updateLeadingCard(
    rasikaRevenue,
    ramziRevenue
);

}

// ==========================================================
// INITIALIZE DASHBOARD
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    loadDashboard();

    // Refresh every 5 minutes
    setInterval(loadDashboard, 300000);

});

