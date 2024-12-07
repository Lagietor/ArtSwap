import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// type NFTTransaction = {
//     buyer: string;
//     price: string;
//     timestamp: string;
// };

const NFTHistoryChart = ({ history }) => {
    const sortedHistory = [...history].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    const data = {
        labels: sortedHistory.map((tx) => new Date(tx.timestamp).toLocaleDateString()), // Daty transakcji
        datasets: [
            {
                label: "Price NFT (ETH)",
                data: sortedHistory.map((tx) => parseFloat(tx.price)),
                borderColor: "#fbca53",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.2,
                pointRadius: 5,
                pointHoverRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `Price: ${context.raw} ETH`;
                    },
                },
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Price (ETH)",
                },
                beginAtZero: true,
            },
            x: {
                title: {
                    display: true,
                    text: "Transaction date",
                },
            },
        },
    };

    return (
        <div style={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
            <h3 className="text-light">NFT History</h3>
            <Line data={data} options={options} />
        </div>
    );
};

export default NFTHistoryChart;
