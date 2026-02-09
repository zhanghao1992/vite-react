/*
 * @Author: 张浩 386708307@qq.com
 * @Date: 2024-11-02 22:56:44
 * @LastEditors: 张浩 386708307@qq.com
 * @LastEditTime: 2026-02-09 09:36:16
 * @FilePath: /vite-react/src/App.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from "react";
import { Button, Space } from "antd";
import "./assets/css/app.css";
// import "@wangeditor/editor/dist/css/style.css";
import router from "./routes/index";
import { RouterProvider, createHashRouter } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
