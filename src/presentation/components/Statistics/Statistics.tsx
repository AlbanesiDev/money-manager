import React from "react";
import CountUp from "react-countup";
import { StatisticProps, Row, Col, Card, Statistic } from "antd";

interface StatisticsProps {
  income: number;
  expenses: number;
  balance: number;
}

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} separator="." duration={2} />
);

const Statistics: React.FC<StatisticsProps> = ({ income, expenses, balance }) => (
  <Row gutter={[16, 16]}>
    <Col xs={24} md={8}>
      <Card>
        <Statistic title="Ingresos" prefix="$" value={income} precision={2} formatter={formatter} />
      </Card>
    </Col>
    <Col xs={24} md={8}>
      <Card>
        <Statistic title="Gastos" prefix="$" value={expenses} precision={2} formatter={formatter} />
      </Card>
    </Col>
    <Col xs={24} md={8}>
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

export { Statistics };
