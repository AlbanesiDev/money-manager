import React from "react";
import { useAuth, useSigninCheck } from "reactfire";

import { Button, DatePicker, DatePickerProps, Flex, Tooltip } from "antd";
import {
  AreaChartOutlined,
  HomeOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import es from "dayjs/locale/es";

import { useTheme, useAuthModal, useProfile, useView, useMonth } from "../../hooks";

import "./Navbar.css";

dayjs.extend(customParseFormat);
dayjs.extend(customParseFormat);
dayjs.locale(es);

const Navbar: React.FC = () => {
  const { setSelectedMonth } = useMonth();
  const auth = useAuth();

  const { status, data: singInCheckResult } = useSigninCheck();
  const { darkMode, toggleDarkMode } = useTheme();
  const { viewMode, toggleView } = useView();
  const { openSignInModal } = useAuthModal();
  const { openModal } = useProfile();

  const onChange: DatePickerProps["onChange"] = (date) => {
    setSelectedMonth(date);
  };

  const currentMaxDate = dayjs();

  return (
    <Flex align="center" justify="space-between" className="navbar">
      <Tooltip placement="bottom" title="Seleccionar mes">
        <DatePicker
          inputReadOnly
          id="datePickerMonth"
          size="large"
          picker="month"
          format="MM/YYYY"
          className="cursor-pointer"
          allowClear={false}
          defaultValue={currentMaxDate}
          onChange={onChange}
        />
      </Tooltip>

      <Flex gap={16}>
        <Tooltip placement="bottom" title={viewMode ? "Inicio" : "Estadísticas"}>
          <Button
            size="large"
            icon={viewMode ? <HomeOutlined /> : <AreaChartOutlined />}
            onClick={toggleView}
          />
        </Tooltip>
        <Tooltip placement="bottom" title={darkMode ? "Modo Claro" : "Modo Oscuro"}>
          <Button
            size="large"
            icon={darkMode ? <MoonOutlined /> : <SunOutlined />}
            onClick={toggleDarkMode}
          />
        </Tooltip>
        {status === "loading" ? (
          <Button loading disabled size="large">
            Cargando...
          </Button>
        ) : singInCheckResult.signedIn ? (
          <Button size="large" icon={<UserOutlined />} onClick={openModal}>
            {auth?.currentUser?.displayName}
          </Button>
        ) : (
          <Button type="primary" size="large" icon={<UserOutlined />} onClick={openSignInModal}>
            Iniciar Sesión
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
