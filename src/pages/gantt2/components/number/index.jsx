import React, { useRef } from "react";
import { InputNumber } from "antd";

export default function CustomNumber(props) {
  const {
    // show,
    style,
    value,
    afterBlur,
    onChange,
    durationMax,
    config: { min, formatType }
  } = props;

  const formatMap = {
    date: {
      formatter: dateFormat,
      parser: dateParser
    }
  };

  const inputRef = useRef();

  function handleChange(val) {
    onChange(val);
    afterBlur(val);
  }

  function dateFormat(number) {
    return `${number} 天`;
  }

  function dateParser(str) {
    if (!str) return;
    const num = str.slice(0, -2);
    return Number(num);
  }

  return (
    <InputNumber
      {...props}
      inputRef={inputRef}
      style={style}
      value={value}
      onChange={handleChange}
      min={min}
      max={durationMax}
      formatter={formatMap[formatType]?.formatter}
      parser={formatMap[formatType]?.parser}
      // onBlur={handleBlur}
    />
  );
}
