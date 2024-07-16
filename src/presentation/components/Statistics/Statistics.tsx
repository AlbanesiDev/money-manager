import React from "react";
import { Card, Col, Row, Statistic, StatisticProps } from "antd";
import CountUp from "react-countup";

interface StatisticsProps {
  income: number;
  expenses: number;
  balance: number;
}

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} separator="." duration={2} />
);

const Statistics: React.FC<StatisticsProps> = ({ income, expenses, balance }) => (
  <Row gutter={16}>
    <Col span={8}>
      <Card>
        <Statistic title="Ingresos" prefix="$" value={income} precision={2} formatter={formatter} />
      </Card>
    </Col>
    <Col span={8}>
      <Card>
        <Statistic title="Gastos" prefix="$" value={expenses} precision={2} formatter={formatter} />
      </Card>
    </Col>
    <Col span={8}>
      <Card>
        <Statistic
          title="Equilibrio"
          prefix="$"
          value={balance}
          precision={2}
          formatter={formatter}
        />
      </Card>
    </Col>
  </Row>
);

export default Statistics;
