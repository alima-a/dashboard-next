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

export interface MarketCapPoint {
  date: string; // ISO: '2025-10-30'
  marketCap: number; // USD
  symbol: string;
}

interface StockChartProps {
  data: MarketCapPoint[];
  label?: string;
  color?: string;
  /** форматировать ось Y кратко: 1.2B/340M */
  compactTicks?: boolean;
  /** локаль и валюта для тултипа */
  locale?: string; // e.g. 'en-US'
  currency?: string; // e.g. 'USD'
}

const formatCompact = (n: number) =>
  Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 2 }).format(n);

const formatMoney = (n: number, locale = 'en-US', currency = 'USD') =>
  Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);

const HistoricalMarketCapChart: React.FC<StockChartProps> = ({
  data,
  label = 'Market Cap',
  color = '#3b82f6',
  compactTicks = true,
  locale = 'en-US',
  currency = 'USD',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // normalize order: oldest -> newest
  const series = React.useMemo(() => {
    if (!data?.length) return [];
    // sort by date asc; cheap check to avoid resorting if already asc
    const asc = data.every((v, i, a) => i === 0 || a[i - 1].date <= v.date);
    const arr = asc ? data : [...data].sort((a, b) => (a.date < b.date ? -1 : 1));
    return arr;
  }, [data]);

  const labels = React.useMemo(
    () =>
      series.map((d) =>
        // короткая подпись даты: Oct 30, 2025 (или по локали)
        new Date(d.date).toLocaleDateString(locale, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      ),
    [series, locale],
  );

  const values = React.useMemo(() => series.map((d) => d.marketCap), [series]);

  const chartData = {
    labels,
    datasets: [
      {
        label,
        data: values,
        borderColor: color,
        backgroundColor: `${color}33`, // 20% fill
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
        callbacks: {
          label: (ctx: any) => {
            const v = ctx.parsed.y as number;
            // money in tooltip, not compact
            return `${ctx.dataset.label}: ${formatMoney(v, locale, currency)}`;
          },
          title: (items: any[]) => items?.[0]?.label ?? '',
        },
      },
      decimation: { enabled: true, algorithm: 'lttb' as const, samples: isMobile ? 30 : 120 },
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
          callback: (v: number | string) => {
            if (typeof v !== 'number') return v;
            return compactTicks ? formatCompact(v) : v.toLocaleString();
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default HistoricalMarketCapChart;
