'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  Filler,
  Legend,
  Decimation,
} from 'chart.js';
import { useTheme, useMediaQuery } from '@mui/material';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  Filler,
  Legend,
  Decimation,
);

export interface HistoricalData {
  date: string; // YYYY-MM-DD
  close: number; // price
}

interface StockChartProps {
  data: HistoricalData[];
  label?: string;
  color?: string;
}

const StockChart: React.FC<StockChartProps> = ({
  data,
  label = 'Stock Price',
  color = '#3b82f6',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const labels = React.useMemo(() => data.map((d) => d.date).reverse(), [data]);
  const values = React.useMemo(() => data.map((d) => d.close).reverse(), [data]);

  const chartData = {
    labels,
    datasets: [
      {
        label,
        data: values,
        borderColor: color,
        backgroundColor: `${color}33`,
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 2,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    interaction: { mode: 'index' as const, intersect: false },
    animation: { duration: isMobile ? 0 : 300 },
    plugins: {
      legend: { display: !isMobile, position: 'bottom' as const },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        displayColors: false,
      },
      decimation: {
        enabled: true,
        algorithm: 'lttb' as const,
        samples: isMobile ? 30 : 80,
      },
    },
    elements: {
      line: { capBezierPoints: true },
      point: { radius: 0 },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          autoSkip: true,
          maxTicksLimit: isMobile ? 4 : 8,
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        grid: { color: theme.palette.mode === 'dark' ? '#2a2a2a' : '#eee' },
        ticks: {
          maxTicksLimit: isMobile ? 4 : 6,
          callback: (v: number | string) => (typeof v === 'number' ? v.toLocaleString() : v),
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default StockChart;
