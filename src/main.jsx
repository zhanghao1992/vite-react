import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// 路由使用 history模式
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </StrictMode>
);
