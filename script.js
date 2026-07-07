const api = "https://script.google.com/macros/s/AKfycbzrS-EBvJytiX6q37xARzm2HKdzOI0j0Jaa5HYs_SPbgdVayl2SbkJRjDwoNwzn4rY/exec";

// TEAM CHART
const teamChart = new Chart(document.getElementById("teamChart"), {
    type: 'bar',
    data: {
        labels: ["Rasika", "Ramzi"],
        datasets: [{
            label: "Closed Deals",
            data: [0, 0],
            backgroundColor: ["#00ff99", "#3399ff"]
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            x: { ticks: { color: "white" } },
            y: { ticks: { color: "white" } }
        }
    }
});

// MEMBER CHART RASIKA
const chartR = new Chart(document.getElementById("chartR"), {
    type: 'bar',
    data: { labels: [], datasets: [{ data: [], backgroundColor: "#00ff99" }] },
    options: { responsive: true, plugins: { legend: { display: false } } }
});

// MEMBER CHART RAMZI
const chartM = new Chart(document.getElementById("chartM"), {
    type: 'bar',
    data: { labels: [], datasets: [{ data: [], backgroundColor: "#3399ff" }] },
    options: { responsive: true, plugins: { legend: { display: false } } }
});

async function loadData() {

    const res = await fetch(api + "?t=" + Date.now());
    const data = await res.json();

    const r = data.rasika.closed || 0;
    const m = data.ramzi.closed || 0;

    document.getElementById("r_closed").innerText = Number(r).toLocaleString();

document.getElementById("m_closed").innerText = Number(m).toLocaleString();

document.getElementById("r_total").innerText =
    Number(data.rasika.total).toLocaleString();

document.getElementById("m_total").innerText =
    Number(data.ramzi.total).toLocaleString();

    teamChart.data.datasets[0].data = [r, m];
    teamChart.update();

    chartR.data.labels = data.rasika.members || [];
    chartR.data.datasets[0].data = data.rasika.revenue || [];
    chartR.update();

    chartM.data.labels = data.ramzi.members || [];
    chartM.data.datasets[0].data = data.ramzi.revenue || [];
    chartM.update();

    // WINNER
    const rasika = document.getElementById("rasikaCard");
    const ramzi = document.getElementById("ramziCard");

    rasika.classList.remove("winner");
    ramzi.classList.remove("winner");

    if (r > m) rasika.classList.add("winner");
    else if (m > r) ramzi.classList.add("winner");
}

loadData();
setInterval(loadData, 60000);

// =====================================================
// HORIZONTAL PAGE SWIPE CONTROL
// =====================================================

const dashboard = document.querySelector(".dashboard-wrapper");

let currentPage = 0;
let isScrolling = false;


// Mouse wheel → horizontal movement
window.addEventListener("wheel", function(e){

    if(isScrolling) return;

    e.preventDefault();

    if(e.deltaY > 0 || e.deltaX > 0){

        currentPage = Math.min(currentPage + 1, 1);

    } 
    else if(e.deltaY < 0 || e.deltaX < 0){

        currentPage = Math.max(currentPage - 1, 0);

    }


    movePage();

}, {passive:false});



// Touch swipe support
let startX = 0;


window.addEventListener("touchstart", function(e){

    startX = e.touches[0].clientX;

});


window.addEventListener("touchend", function(e){

    let endX = e.changedTouches[0].clientX;

    let distance = startX - endX;


    if(Math.abs(distance) > 80){


        if(distance > 0){

            currentPage = Math.min(currentPage + 1,1);

        }else{

            currentPage = Math.max(currentPage - 1,0);

        }


        movePage();

    }

});



// Move between screens

function movePage(){

    isScrolling = true;


    dashboard.style.transform =
        `translateX(-${currentPage * 100}vw)`;


    dashboard.style.transition =
        "transform .7s ease";


    setTimeout(()=>{

        isScrolling = false;

    },700);

}

// =====================================================
// AUTO PAGE SLIDE LOOP (EVERY 8 SECONDS)
// =====================================================

let autoPage = 0;

function autoSlide(){

    autoPage++;

    if(autoPage > 1){
        autoPage = 0;
    }

    dashboard.style.transform =
        `translateX(-${autoPage * 100}vw)`;

}


// Start automatic slideshow

setInterval(autoSlide, 8000);