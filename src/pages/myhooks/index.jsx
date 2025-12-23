import { useState, useEffect } from "react";
import useLatest from "./useLatest.js";

import { Button } from "antd";

function MyHooks() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  const ref = useLatest(count);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("ref:", ref);
      setCount(ref.current + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("count2:", count);
      setCount2(count2 + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h4>kooks:useLatest</h4>
      <div>count: {ref.current}</div>
      <div>count2: {count2}</div>
    </>
  );
}

export default MyHooks;
