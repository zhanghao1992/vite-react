import { useState, useEffect } from "react";

import { Button, Space, Typography, Divider, message } from "antd";
const { Title } = Typography;
import { useRequest } from "ahooks";
import Mock from "mockjs";
import { useMyRequest } from "./myHooks";
// 模拟一个异步
const getData = async (id = 1) => {
  return new Promise((resove, reject) => {
    setTimeout(() => {
      // resove({
      //   code: 0,
      //   message: "响应的参数id：" + id,
      // });

      resove("响应的参数id：" + Math.random());
    }, 1 * 2000);
  });
};

function getUsername() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock("@name"));
    }, 1000);
  });
}

const getJsonData = () => {};

function AHooks() {
  const [result, setResult] = useState({});

  const fnGet = async (id) => {
    const res = await getData(id);
    console.log(res);
  };

  const { data, error, run, loading } = useMyRequest(getData);

  useEffect(() => {
    // fnGet(2);
    // return () => {
    //   console.log('This will be logged on unmount');
    // };
  }, []);

  return (
    <div>
      <Title level={4}>
        useRequest
        <Button
          type="primary"
          onClick={() => {
            run(3);
          }}
        >
          发出请求
        </Button>
      </Title>
      <p>{loading && "loading"}</p>
      <p>{data}</p>
      <Divider />
      <Title level={4}>useTable</Title>
    </div>
  );
}

export default AHooks;
