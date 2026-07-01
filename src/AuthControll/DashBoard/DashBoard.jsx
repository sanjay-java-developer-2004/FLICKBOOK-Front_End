

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Chart, ArcElement, DoughnutController, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
import AdminNavBar from "../../Component/NavBar/AdminNavBar";
import AdminFooter from "../../Component/Footer/AdminFooter";
import Loading from "../../Component/Loading/Loading";


Chart.register(ArcElement, DoughnutController, BarController, BarElement, CategoryScale, LinearScale, Tooltip);

function ShowCard({ show, index }) {
  const donutRef = useRef(null);
  const barRef = useRef(null);
  const donutInstance = useRef(null);
  const barInstance = useRef(null);

  const profit = show.Price * show.BookedSeats;
  const maxProfit = show.Price * show.Total;
  const bookedPct = Math.round((show.BookedSeats / show.Total) * 100);

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
  }

  useEffect(() => {
    if (donutInstance.current) donutInstance.current.destroy();
    if (barInstance.current) barInstance.current.destroy();

    // Donut — dark theme
    donutInstance.current = new Chart(donutRef.current, {
      type: "doughnut",
      data: {
        labels: ["Booked", "Available"],
        datasets: [{
          data: [show.BookedSeats, show.Available],
          backgroundColor: ["#2a78d6", "#2a2a2a"],
          borderWidth: 3,
          borderColor: "#1a1a1a",
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed}` } },
        },
      },
      plugins: [{
        id: "center-text",
        afterDraw(chart) {
          const { ctx, chartArea: { left, top, width, height } } = chart;
          ctx.save();
          ctx.font = "700 22px Segoe UI";
          ctx.fillStyle = "#FFD700";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(`${bookedPct}%`, left + width / 2, top + height / 2 - 10);
          ctx.font = "12px Segoe UI";
          ctx.fillStyle = "#666";
          ctx.fillText("booked", left + width / 2, top + height / 2 + 14);
          ctx.restore();
        },
      }],
    });

    // Bar — dark theme
    barInstance.current = new Chart(barRef.current, {
      type: "bar",
      data: {
        labels: ["Earned", "Max possible"],
        datasets: [{
          data: [profit, maxProfit],
          backgroundColor: ["#FFD700", "#2a2a2a"],
          borderRadius: 4,
          borderSkipped: false,
          barThickness: 36,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx) => ` ₹${ctx.parsed.y.toLocaleString("en-IN")}` } },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#666", font: { size: 11 } },
            border: { color: "rgba(255,215,0,0.1)" },
          },
          y: {
            grid: { color: "rgba(255,215,0,0.07)" },
            ticks: {
              color: "#666",
              font: { size: 11 },
              callback: (v) => "₹" + (v >= 1000 ? (v / 1000).toFixed(0) + "k" : v),
            },
            border: { color: "rgba(255,215,0,0.1)" },
          },
        },
      },
    });

    return () => {
      donutInstance.current?.destroy();
      barInstance.current?.destroy();
    };
  }, [show]);

  return (
    <div className="show-card">
      <div className="show-header">
        <span className="show-label">Show</span>
        <span className="show-date">{formatDate(show.Show)}</span>
      </div>

      <div className="metrics">
        <div className="metric">
          <div className="metric-label">Total seats</div>
          <div className="metric-value">{show.Total}</div>
        </div>
        <div className="metric">
          <div className="metric-label">Booked</div>
          <div className="metric-value booked">{show.BookedSeats}</div>
        </div>
        <div className="metric">
          <div className="metric-label">Available</div>
          <div className="metric-value available">{show.Available}</div>
        </div>
        <div className="metric">
          <div className="metric-label">Profit</div>
          <div className="metric-value profit">₹{profit.toLocaleString("en-IN")}</div>
        </div>
      </div>

      <div className="chart-row">
        <div className="chart-box">
          <p className="chart-title">Seat status</p>
          <div className="chart-wrap">
            <canvas ref={donutRef} aria-label={`${show.BookedSeats} booked, ${show.Available} available`} />
          </div>
          <div className="legend">
            <span className="legend-item"><span className="legend-dot booked-dot" />Booked</span>
            <span className="legend-item"><span className="legend-dot available-dot" />Available</span>
          </div>
        </div>

        <div className="chart-box">
          <p className="chart-title">Profit vs max</p>
          <div className="chart-wrap">
            <canvas ref={barRef} aria-label={`Profit ₹${profit} out of max ₹${maxProfit}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashBoard() {
  const theatreid = localStorage.getItem("theatreid");
  const [Dashboarddatas, setdashboarddatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, seterr] = useState("")

  useEffect(() => {
    seterr("")
    setLoading(true)
    axios.get(`http://localhost:8080/authControll/Dashboard/${theatreid}`)
      .then((res) => {
        console.log(res.data);
        setdashboarddatas(res.data);
      })
      .catch((err) => {
        console.log(err);
        seterr(err.response?.data?.message)
    
      })
      .finally(()=>{
        setLoading(false)
      })
  }, []);


  return <>
   
    <AdminNavBar />

     {loading && <Loading />}
    
    <div className="dashboard-container">
      <h2 className="dashboard-title">Theatre Dashboard</h2>
       {err && <h6>{err}</h6>}
      <div className="dashboard">
        {Dashboarddatas.map((show, index) => (
          <ShowCard key={index} show={show} index={index + 1} />
        ))}
      </div>
    </div>

    <AdminFooter />
  </>
}