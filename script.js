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

    document.getElementById("r_closed").innerText = r;
    document.getElementById("r_total").innerText = data.rasika.total;

    document.getElementById("m_closed").innerText = m;
    document.getElementById("m_total").innerText = data.ramzi.total;

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