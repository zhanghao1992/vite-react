import { useState } from "react";
import {
  RouterProvider,
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
  useNavigate
} from "react-router-dom";
import { Button, Space } from "antd";
import style from "./index.module.less";
const nav = [
  {
    name: "home",
    path: "/home",
  },
  {
    name: "about",
    path: "/about/1?name=张浩",
  },
  {
    name: "ahooks",
    path: "/ahooks",
  },
  {
    name: "alova",
    path: "/alova",
  },
  {
    name: "gantt",
    path: "/gantt",
  },
];

const MainLayout = () => {


  return (
    <div className={style["m-layout"]}>
      <div className={style["m-header"]}>
        <Space>
          {nav.map((r) => (
            <Button key={r.name} color="primary" variant="link" href={r.path}>
              {r.name}
            </Button>
          ))}
        </Space>
      </div>
      <div className={style["m-body"]}>
        <Outlet />
      </div>
      <div className={style["m-footer"]}>footer</div>
    </div>
  );
};

export default MainLayout;
