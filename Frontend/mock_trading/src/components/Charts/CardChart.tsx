
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
  Legend
} from 'chart.js';
import { ChartData } from 'chart.js/auto';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: {
    dates: string[];
    value: number[];
  };
}

const CardChart: React.FC<LineChartProps> = ({ data }) => {
  const chartData: ChartData<'line', number[], string> = {
    labels: data ? data.dates : [],
    datasets: [
      {
        label: 'Data',
        data: data ? data.value : [],
        pointRadius: .09,
        pointHoverRadius: 7,
        fill: false,
        borderColor: '#007FFF',
        borderWidth: 1,
        tension: 0.1,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        title: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          display: false,
          color: 'black',
        },
      },
      y: {
        title: {
          display: false,
          text: '$ US Dollars',
          color: 'black',
        },
        grid: {
          display: false,
          color: 'black',
        },
        ticks: {
          display: false,
          color: 'black',
        },
      },
    },
    plugins: {
      legend: {

        display: false,
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
      <Line data={chartData} options={options} className='w-16 h-16' />
    </div>
  );
};

export default CardChart;
