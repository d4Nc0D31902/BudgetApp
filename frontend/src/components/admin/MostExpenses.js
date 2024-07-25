import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";

export default function ProductSalesChart({ data }) {
  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const dataMap = new Map();

      data.forEach((item) => {
        const existing = dataMap.get(item.description);
        if (existing) {
          dataMap.set(item.description, {
            description: item.description,
            amount: existing.amount + item.amount,
          });
        } else {
          dataMap.set(item.description, { ...item });
        }
      });

      const aggregatedData = Array.from(dataMap.values());

      const totalAmount = aggregatedData.reduce(
        (sum, item) => sum + item.amount,
        0
      );

      const calculatedData = aggregatedData.map((item) => ({
        ...item,
        percent: ((item.amount / totalAmount) * 100).toFixed(2),
      }));

      setProcessedData(calculatedData);
    }
  }, [data]);

  const pieColors = [
    "#78ABA8",
    "#C8CFA0",
    "#FCDC94",
    "#EF9C66",
    "#95D2B3",
    "#A5DD9B",
    "#F6F193",
    "#C5EBAA",
    "#F2C18D",
    "#B4B4B8",
    "#C7C8CC",
    "#F5EEE6",
    "#F3D7CA",
    "#FF90BC",
    "#8ACDD7",
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${processedData[index].percent}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="90%" height={1000}>
      <PieChart width={1000} height={1000}>
        <Pie
          dataKey="amount"
          nameKey="description"
          isAnimationActive={true}
          data={processedData}
          cx="50%"
          cy="50%"
          outerRadius={300}
          fill="#8884d8"
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {processedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={pieColors[index % pieColors.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="vertical" verticalAlign="top" align="right" />
      </PieChart>
    </ResponsiveContainer>
  );
}
