import React from "react";
import { Button, DatePicker, DatePickerProps, Flex, Tooltip } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import es from "dayjs/locale/es";

import { useDrawer } from "../../context/DrawerContext";
import "./Navbar.css";

dayjs.extend(customParseFormat);
dayjs.extend(customParseFormat);
dayjs.locale(es);

interface NavbarProps {
  setSelectedDate: (date: Dayjs | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setSelectedDate }) => {
  const { showDrawer } = useDrawer();

  const onChange: DatePickerProps["onChange"] = (date) => {
    setSelectedDate(date);
  };

  const currentMaxDate = dayjs();

  return (
    <Flex align="center" justify="space-between" className="navbar">
      <Tooltip placement="right" title="Seleccionar mes">
        <DatePicker
          inputReadOnly
          size="large"
          picker="month"
          format="MM/YYYY"
          className="cursor-pointer"
          maxDate={currentMaxDate}
          allowClear={false}
          defaultValue={currentMaxDate}
          onChange={onChange}
        />
      </Tooltip>

      <Button size="large" icon={<MenuOutlined />} onClick={showDrawer} />
    </Flex>
  );
};

export default Navbar;
