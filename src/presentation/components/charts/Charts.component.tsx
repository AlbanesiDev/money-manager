import { PieChart, PieChartSlotProps } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { Col, Row } from "antd";
import { transformData } from "../../utils";
import "./Charts.css";

interface ChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

const Charts: React.FC<ChartProps> = ({ data }) => {
  const { incomeData, expenseData } = transformData(data);

  const slotProps: PieChartSlotProps = {
    legend: {
      direction: "row",
      position: { vertical: "bottom", horizontal: "left" },
      padding: 0,
      labelStyle: {
        fill: "var(--text-color)",
      },
    },
  };

  return (
    <Row style={{ minHeight: "100vh" }}>
      <Col xs={24} md={12}>
        <PieChart
          className="pie_chart"
          margin={{ bottom: 100 }}
          series={[
            {
              data: incomeData,
              innerRadius: 60,
              outerRadius: 125,
              paddingAngle: 4,
              cornerRadius: 4,
            },
          ]}
          slotProps={slotProps}
        />
      </Col>
      <Col xs={24} md={12}>
        <PieChart
          className="pie_chart"
          margin={{ bottom: 100 }}
          series={[
            {
              data: expenseData,
              innerRadius: 60,
              outerRadius: 125,
              paddingAngle: 4,
              cornerRadius: 4,
            },
          ]}
          slotProps={slotProps}
        />
      </Col>
      <Col span={24}>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
        />
      </Col>
    </Row>
  );
};

export default Charts;
