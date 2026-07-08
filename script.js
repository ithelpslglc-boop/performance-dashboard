// ==========================================
// GOOGLE APPS SCRIPT API URL
// ==========================================

const API_URL = "https://script.google.com/macros/s/AKfycbz6FxLzFymdvGxZU3jYCf_7vDMNmKMLjUoR-r65vLLohdcIEbFAeoKZDO6n6TgbUcE/exec";


// ==========================================
// CHART VARIABLE
// ==========================================

let revenueChart;



// ==========================================
// LOAD DASHBOARD DATA
// ==========================================

async function loadDashboard(){


    try{


        const response = await fetch(API_URL);


        const data = await response.json();



        // ===============================
        // RASIKA DATA
        // ===============================

        document.getElementById("rasika-revenue").textContent =
            data.rasika.total.toLocaleString();


        document.getElementById("rasika-deals").textContent =
            data.rasika.closed;




        // ===============================
        // RAMZI DATA
        // ===============================

        document.getElementById("ramzi-revenue").textContent =
            data.ramzi.total.toLocaleString();


        document.getElementById("ramzi-deals").textContent =
            data.ramzi.closed;




        // ===============================
        // CREATE TOTAL REVENUE CHART
        // ===============================

        createRevenueChart(
            data.rasika.total,
            data.ramzi.total
        );


    }


    catch(error){


        console.error(
            "Dashboard loading error:",
            error
        );


    }


}





// ==========================================
// RASIKA VS RAMZI BAR CHART
// ==========================================

function createRevenueChart(
    rasikaTotal,
    ramziTotal
){


    const ctx = document.getElementById(
        "revenueChart"
    );



    if(revenueChart){

        revenueChart.destroy();

    }




    revenueChart = new Chart(
        ctx,
        {


            type:"bar",


            data:{


                labels:[

                    "Rasika",

                    "Ramzi"

                ],


                datasets:[

                    {

                        label:"Total Revenue",


                        data:[

                            rasikaTotal,

                            ramziTotal

                        ],


                        borderRadius:20,


                        backgroundColor:[

                            "#9b9b9b",

                            "#d5d5d5"

                        ]

                    }

                ]

            },



            options:{


                responsive:true,


                maintainAspectRatio:false,



                plugins:{


                    legend:{


                        display:false


                    }



                },



                scales:{


                    x:{


                        ticks:{


                            color:"#ffffff",

                            font:{


                                size:24,

                                weight:"bold"

                            }


                        }


                    },



                    y:{


                        beginAtZero:true,


                        ticks:{


                            color:"#ffffff",

                            font:{


                                size:20

                            }


                        }


                    }


                }



            }



        }

    );



}





// ==========================================
// START
// ==========================================

loadDashboard();