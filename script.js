// ==========================================================
// GOOGLE APPS SCRIPT API URL
// ==========================================================

const API_URL =
"https://script.google.com/macros/s/AKfycbxJsifT0EghqLTFPclnvp4HqorVTUyMxo3jjq5y-vkyjVHvOdnptEjiZS90LNRNTuk/exec";




// ==========================================================
// GLOBAL CHART VARIABLES
// ==========================================================

let revenueChart;

let teamRasikaChart;

let teamRamziChart;





// ==========================================================
// LOAD DASHBOARD DATA
// ==========================================================


async function loadDashboard(){


try{


const response = await fetch(API_URL);


if(!response.ok){

throw new Error(
"API Loading Failed"
);

}



const data = await response.json();



console.log(
"Dashboard Data:",
data
);





// ==================================================
// PAGE 1 DATA
// ==================================================


const rasikaRevenue =
Number(data.rasika.total) || 0;


const rasikaDeals =
Number(data.rasika.closed) || 0;




const ramziRevenue =
Number(data.ramzi.total) || 0;


const ramziDeals =
Number(data.ramzi.closed) || 0;





document.getElementById(
"rasika-revenue"
).textContent =
rasikaRevenue.toLocaleString();




document.getElementById(
"rasika-deals"
).textContent =
rasikaDeals.toLocaleString();





document.getElementById(
"ramzi-revenue"
).textContent =
ramziRevenue.toLocaleString();




document.getElementById(
"ramzi-deals"
).textContent =
ramziDeals.toLocaleString();






// ==================================================
// WINNER EFFECT
// ==================================================


const rasikaCard =
document.querySelector(".rasika-card");


const ramziCard =
document.querySelector(".ramzi-card");



if(rasikaCard && ramziCard){


rasikaCard.classList.remove("winner");

ramziCard.classList.remove("winner");



if(rasikaRevenue > ramziRevenue){


rasikaCard.classList.add("winner");


}


else if(ramziRevenue > rasikaRevenue){


ramziCard.classList.add("winner");


}


}






// ==================================================
// MAIN CHART
// ==================================================


createRevenueChart(

rasikaRevenue,

ramziRevenue

);






// ==================================================
// TEAM RASIKA
// ==================================================


createTeamRasikaChart(

data.rasika.members,

data.rasika.revenue

);







// ==================================================
// TEAM RAMZI
// ==================================================


createTeamRamziChart(

data.ramzi.members,

data.ramzi.revenue

);







// ==================================================
// TEAM MARKETING UPDATE
// ==================================================


updateMarketingCards(

data.marketing

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
// TEAM MARKETING CARDS
// ==========================================================


function updateMarketingCards(marketing){


if(!marketing){

console.error(
"Marketing data missing"
);

return;

}




console.log(
"Marketing Data:",
marketing
);




for(let i = 0; i < marketing.members.length; i++){



const nameElement =
document.getElementById(
`marketing-name-${i+1}`
);



const valueElement =
document.getElementById(
`marketing-value-${i+1}`
);





if(nameElement && valueElement){



nameElement.textContent =
marketing.members[i];



valueElement.textContent =
Number(
marketing.revenue[i] || 0
)
.toLocaleString();



}


}



}









// ==========================================================
// LEADING CARD
// ==========================================================


function updateLeadingCard(

rasikaRevenue,

ramziRevenue

){


const leadingText =
document.getElementById(
"leadingText"
);



if(!leadingText){

return;

}




const difference =
Math.abs(
rasikaRevenue - ramziRevenue
)
.toLocaleString();





if(rasikaRevenue > ramziRevenue){


leadingText.innerHTML =

`
🏆 RASIKA IS LEADING BY

<span class="lead-number">
${difference}
</span>
`;


}



else if(ramziRevenue > rasikaRevenue){


leadingText.innerHTML =

`
🏆 RAMZI IS LEADING BY

<span class="lead-number">
${difference}
</span>
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
// MAIN REVENUE CHART
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


label:"Revenue",


data:[

rasikaRevenue,

ramziRevenue

],



backgroundColor:[

"#FFD700",

"#C0C0C0"

],



borderRadius:24,


borderWidth:3



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


color:"#fff",

font:{


size:24,

weight:"700"


}


},


grid:{


display:false


}


},



y:{


beginAtZero:true,


ticks:{


color:"#fff"


}


}



}



}


}


);



updateLeadingCard(

rasikaRevenue,

ramziRevenue

);


}









// ==========================================================
// TEAM CHARTS
// ==========================================================


function createTeamRasikaChart(

members,

revenue

){


const canvas =
document.getElementById(
"teamRasikaChart"
);



if(!canvas){

return;

}



if(teamRasikaChart){

teamRasikaChart.destroy();

}



teamRasikaChart =
createTeamChart(

canvas,

members,

revenue

);


}





function createTeamRamziChart(

members,

revenue

){


const canvas =
document.getElementById(
"teamRamziChart"
);



if(!canvas){

return;

}



if(teamRamziChart){

teamRamziChart.destroy();

}



teamRamziChart =
createTeamChart(

canvas,

members,

revenue

);


}









function createTeamChart(

canvas,

members,

revenue

){


return new Chart(

canvas,

{


type:"bar",



data:{


labels:members,



datasets:[


{


label:"Revenue",


data:revenue,


backgroundColor:"#FFD700",


borderRadius:18


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


color:"#fff",

font:{


size:18,

weight:"700"


}


},


grid:{


display:false


}


},



y:{


beginAtZero:true,


ticks:{


color:"#fff"


}


}



}



}



}



);


}









// ==========================================================
// INITIALIZE
// ==========================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


loadDashboard();



setInterval(

loadDashboard,

300000

);



}

);









// ==========================================================
// AUTO PAGE SLIDESHOW
// ==========================================================


const pagesContainer =
document.querySelector(
".pages-container"
);



const pages =
document.querySelectorAll(
".page"
);



let currentPage = 0;




function autoSlide(){



if(!pagesContainer){

return;

}




currentPage++;



if(currentPage >= pages.length){


currentPage = 0;


}




pagesContainer.scrollTo({


left:

window.innerWidth * currentPage,


behavior:"smooth"


});



}





setInterval(

autoSlide,

10000

);