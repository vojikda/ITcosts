import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { ITApplication } from '../types';
import { blue } from '@mui/material/colors';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface CategoryDistributionChartProps {
    data: ITApplication[];
}

const CategoryDistributionChart: React.FC<CategoryDistributionChartProps> = ({ data }) => {
    const categories = ['Digital', 'Branch Network', 'Operations', 'Financial Markets'];
    
    const infrastructureCosts = categories.map(category => 
        data.filter(app => app.category === category)
            .reduce((sum, app) => sum + app.infrastructureCost, 0)
    );

    const supportCosts = categories.map(category => 
        data.filter(app => app.category === category)
            .reduce((sum, app) => sum + app.supportCost, 0)
    );

    const chartData = {
        labels: categories,
        datasets: [
            {
                label: 'Infrastructure Cost',
                data: infrastructureCosts,
                backgroundColor: blue[400],
            },
            {
                label: 'Support Cost',
                data: supportCosts,
                backgroundColor: blue[600],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                ticks: {
                    callback: (value: number) => `$${value.toLocaleString()}`,
                },
            },
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const value = context.raw;
                        return `${context.dataset.label}: $${value.toLocaleString()}`;
                    },
                },
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default CategoryDistributionChart; 