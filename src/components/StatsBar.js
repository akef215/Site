import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/Stats.css";
import logo from "../images/logo _final.png";
import user from "../images/Frame_5.png";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { useNavigate } from "react-router-dom";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const StatsBar = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState({ x: [], y: [] });
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/statistics/stats/chart/2?group_by=month`)
      .then((res) => {
        setChartData(res.data);
      })
      .catch((err) => {
        console.error("Erreur de chargement du graphique:", err);
      });
  }, []);

  return (
    <div>
      {/* Barre de navigation */}
      <div className='Nav'>
        <div className='Nav-Logo'>
          <img src={logo} alt='Logo'/>
        </div>
        <div className='Nav-Menu'>
          <p onClick={() => navigate("../homepage")} className={'nav-item'}>Home</p>
          <p onClick={() => navigate("../stats")} className={'nav-item active'}>Stats</p>
          <p onClick={() => navigate("../quizPage")} className={'nav-item'}>Quizzes</p>
          <p onClick={() => navigate("../profile")} className={'nav-item'}>Profile</p>
        </div>
      </div>

      <div className="profile-icon">
        <img src={user} alt="User" />
      </div>

      <div className="msg-welcome">
        <p>General statistics</p>
      </div>

      <div className="rectMenu">
        <div className="nav-second">
          <div className="second-nav">
            <p onClick={() => navigate("/StatsLine")}>Line graph</p>
            <p onClick={() => navigate("/StatsBar")}>Bar chart</p>
          </div>
          <div className="Bar-container">
            <Bar
              data={{
                labels: chartData.x,
                datasets: [
                  {
                    label: "Performance",
                    data: chartData.y,
                    backgroundColor: "rgba(107, 144, 172, 1)",
                    borderRadius: 5,
                    barThickness: 40,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: true,
                      color: "rgba(0, 0, 0, 1)",
                      font: {
                        family: "'Montserrat', sans-serif",
                        size: 12,
                        weight: "bold",
                      },
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                maintainAspectRatio: false,
              }}
              height={400}
              width={1200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
