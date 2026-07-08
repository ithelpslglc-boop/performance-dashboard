// ==========================================================
// GOOGLE APPS SCRIPT API URL
// ==========================================================

const API_URL =
"https://script.google.com/macros/s/AKfycbz6FxLzFymdvGxZU3jYCf_7vDMNmKMLjUoR-r65vLLohdcIEbFAeoKZDO6n6TgbUcE/exec";



// ==========================================================
// GLOBAL CHART VARIABLE
// ==========================================================

let revenueChart;





// ==========================================================
// LOAD DASHBOARD DATA
// ==========================================================

async function loadDashboard(){


    try{


        const response = await fetch(API_URL);


        const data = await response.json();



        console.log("Dashboard Data:", data);






        // ==================================================
        // RASIKA DATA
        // ==================================================


        const rasikaRevenue =

        Number(data.rasika.closed);



        const rasikaDeals =

        Number(data.rasika.total);






        document.getElementById(
            "rasika-revenue"
        ).textContent =


        rasikaRevenue.toLocaleString();





        document.getElementById(
            "rasika-deals"
        ).textContent =


        rasikaDeals;









        // ==================================================
        // RAMZI DATA
        // ==================================================


        const ramziRevenue =

        Number(data.ramzi.closed);



        const ramziDeals =

        Number(data.ramzi.total);






        document.getElementById(
            "ramzi-revenue"
        ).textContent =


        ramziRevenue.toLocaleString();





        document.getElementById(
            "ramzi-deals"
        ).textContent =


        ramziDeals;







        // ==================================================
        // CREATE CHART
        // ==================================================


        createRevenueChart(

            rasikaRevenue,

            ramziRevenue

        );



    }


    catch(error){


        console.error(

            "Dashboard Error:",

            error

        );


    }


}









// ==========================================================
// VALUE LABEL PLUGIN
// ==========================================================

const valueLabelPlugin = {


    id:"valueLabel",




    afterDatasetsDraw(chart){


        const {

            ctx

        } = chart;




        chart.getDatasetMeta(0)
        .data
        .forEach((bar,index)=>{



            const value =

            chart.data.datasets[0]
            .data[index];





            ctx.save();




            ctx.font =

            "900 26px Segoe UI";




            ctx.fillStyle =

            "#ffffff";




            ctx.textAlign =

            "center";





            ctx.fillText(


                value.toLocaleString(),


                bar.x,


                bar.y - 20



            );




            ctx.restore();



        });



    }



};









// ==========================================================
// CREATE REVENUE BAR CHART
// ==========================================================

function createRevenueChart(

    rasikaRevenue,

    ramziRevenue

){



    const canvas =

    document.getElementById(
        "revenueChart"
    );




    if(!canvas){

        console.error(
            "Chart canvas not found"
        );

        return;

    }






    if(revenueChart){


        revenueChart.destroy();


    }






    revenueChart = new Chart(

        canvas,

        {


            type:"bar",






            data:{



                labels:[


                    "Rasika",


                    "Ramzi"


                ],






                datasets:[



                    {


                        label:
                        "Total Revenue",





                        data:[


                            rasikaRevenue,


                            ramziRevenue


                        ],







                        backgroundColor:[


                            "rgba(0,255,153,0.85)",


                            "rgba(51,153,255,0.85)"


                        ],






                        borderColor:[


                            "#00ff99",


                            "#3399ff"


                        ],






                        borderWidth:4,






                        borderRadius:30,





                        barPercentage:0.85,



                        categoryPercentage:0.85




                    }



                ]



            },









            options:{





                responsive:true,



                maintainAspectRatio:false,







                animation:{


                    duration:1500,


                    easing:"easeOutQuart"


                },







                plugins:{





                    legend:{


                        display:false


                    },






                    tooltip:{



                        backgroundColor:


                        "rgba(0,0,0,0.9)",




                        padding:15,



                        cornerRadius:15,






                        callbacks:{



                            label:function(context){



                                return (

                                    "Revenue : " +

                                    Number(
                                        context.raw
                                    )
                                    .toLocaleString()


                                );


                            }


                        }



                    }



                },









                scales:{





                    x:{



                        grid:{


                            display:false


                        },






                        ticks:{



                            color:"#ffffff",



                            font:{


                                size:28,


                                weight:"900"


                            }



                        }




                    },









                    y:{



                        beginAtZero:true,







                        grid:{



                            color:


                            "rgba(255,255,255,0.15)"



                        },






                        ticks:{



                            color:"#ffffff"



                        }



                    }





                }




            },






            plugins:[

                valueLabelPlugin

            ]



        }



    );



}









// ==========================================================
// START
// ==========================================================

loadDashboard();





// Refresh every 5 minutes

setInterval(

    loadDashboard,

    300000

);