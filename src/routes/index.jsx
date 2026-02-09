/*
 * @Author: 张浩 386708307@qq.com
 * @Date: 2024-11-03 12:04:56
 * @LastEditors: 张浩 386708307@qq.com
 * @LastEditTime: 2026-02-09 11:10:44
 * @FilePath: /vite-react/src/routes/index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 此文件用于统一配置路由表
import {
  Navigate,
  createHashRouter,
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout/main";
import Home from "../pages/home";
import About from "../pages/about";
import AHooks from "../pages/ahooks";
import Alova from "../pages/alova";
import Gantt from "../pages/gantt";
import RCGantt from "../pages/rc-gantt";
import MyHooks from "../pages/myhooks";
import Tinymce from "../pages/tinymce";
import WangEditor from "../pages/wang-editor";
import Gis from "../pages/gis";
import Supabasec from "../pages/supabasec";
import ErrorPage from "../pages/ErrorBoundary";
import ReactQuery from "../pages/react-query";
import Gantt2 from "../pages/gantt2";

// 定义路由表
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "ahooks",
        element: <Navigate to="ahooks" />,
      },
      {
        path: "home",
        element: <Home />,
        name: "home",
      },
      {
        path: "about/:id",
        element: <About />,
      },
      {
        path: "ahooks",
        element: <AHooks />,
      },
      {
        path: "alova",
        element: <Alova />,
      },
      {
        path: "gantt",
        element: <Gantt />,
      },
      {
        path: "rc-gantt",
        element: <RCGantt />,
      },
      {
        path: "my-hooks",
        element: <MyHooks />,
      },
      {
        path: "gis",
        element: <Gis />,
      },
      {
        path: "supabasec",
        element: <Supabasec />,
      },
      {
        path: "tinymce",
        element: <Tinymce />,
      },

      {
        path: "wang-editor",
        element: <WangEditor />,
      },

      // {
      //   path: "gantt2",
      //   element: <Gantt2 />,
      // },

      {
        path: "error-boundary",
        element: <ErrorPage />,
      },
      {
        path: "react-query",
        element: <ReactQuery />,
      },
    ],
  },
  // 仍旧配置路由重定向
  {
    path: "*",
    element: <Navigate to="/supabasec" />,
  },
]);
// 导出
export default router;
