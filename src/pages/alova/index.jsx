import { useState, useEffect } from "react";

import { Button, Space, Typography, Divider } from "antd";
const { Title } = Typography;

// 模拟一个异步
const getData = async() =>
  new Promise((resove, reject) => {
    setTimeout(() => {
      resove({
        code: 0,
        data: 1
      });
    }, 1 * 2000);
  });

  const getJsonData = () => {}

function AHooks() {
  const [count, setCount] = useState(0);



  const fnGet= async() => {
    const res =  await getData();
    console.log(res);
    // fnGet()
  }

  useEffect(() => {
    fnGet()
    return () => {
      console.log('This will be logged on unmount');
    };
  }, []);

  return (
    <div>
      {/* <Title level={4}>useRequest</Title>
      <Title level={4}>useTable</Title> */}
      <Divider />
    </div>
  );
}

export default AHooks;
