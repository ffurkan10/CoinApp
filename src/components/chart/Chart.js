import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchChart } from "../../api/Api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Chart = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.chart.status);
  const error = useSelector((state) => state.chart.error);
  const chart = useSelector((state) => state.chart.charts);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchChart(id));
    }
  }, [status, id, dispatch]);

  if (status === "failed") {
    return <div>{error}</div>;
  }

  const chartData = chart?.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  const options = {
    responsive: true,
  };

  const data = {
    labels: chartData.map((value) => moment(value.x).format("MMM DD")),
    datasets: [
      {
        fill: true,
        label: id,
        data: chartData.map((val) => val.y),
        borderColor: "#8dc647",
        backgroundColor: "transparent",
      },
    ],
  };

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;
