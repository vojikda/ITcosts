import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CategoryCosts } from '../types';
import { blue } from '@mui/material/colors';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TotalCostChartProps {
    data: CategoryCosts[];
}

const TotalCostChart: React.FC<TotalCostChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.category),
        datasets: [
            {
                data: data.map(item => item.totalCost),
                backgroundColor: [
                    blue[300],
                    blue[400],
                    blue[500],
                    blue[600],
                ],
                borderColor: [
                    blue[400],
                    blue[500],
                    blue[600],
                    blue[700],
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const value = context.raw;
                        return `$${value.toLocaleString()}`;
                    },
                },
            },
        },
    };

    return <Pie data={chartData} options={options} />;
};

export default TotalCostChart; 