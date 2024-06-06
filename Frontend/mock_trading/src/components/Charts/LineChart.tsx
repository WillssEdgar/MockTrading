
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { ChartData } from 'chart.js/auto';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface LineChartProps {
  data: {
    dates: string[];
    value: number[];
  };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartData: ChartData<'line', number[], string> = {
    labels: data ? data.dates : [],
    datasets: [
      {
        label: 'Data',
        fill: true,
        data: data ? data.value : [],
        pointRadius: 0.5,
        pointHoverRadius: 7,
        borderColor: '#007FFF',
        borderWidth: 1,
        backgroundColor: 'rgba(0, 127, 255, 0.2)', // Add this line for the fill color
      },
    ],
  };
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date: YYYY-MM-DD',
          color: 'black',
        },
        grid: {
          color: 'lightGrey'
        },
        ticks: {
          color: 'black',
        },
      },
      y: {
        title: {
          display: true,
          text: '$ US Dollars',
          color: 'black',
        },
        grid: {
          color: 'lightGrey',
        },
        ticks: {
          color: 'black',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'black',
        },
      },
      tooltip: {
        backgroundColor: '#000000',
        bodyColor: '#ffffff',
      },
    },
    backgroundColor: '#333333',
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
