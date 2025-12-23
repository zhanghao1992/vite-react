import { useState } from "react";
import { Button, Space } from "antd";
import "./assets/css/app.css";
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
