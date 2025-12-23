import React from "react";
import { Input } from "antd";
import DatePicker from "./date-picker";
import Select from "./select";
import Slider from "./slider";
import InputNumber from "./number";

export default function modalFormItem(props) {
  const { config } = props;

  const componentMap = {
    input: Input,
    number: InputNumber,
    date: DatePicker,
    select: Select,
    slider: Slider
  };

  const Component = componentMap[config?.type];
  if (Component) return <Component {...props} />;
  else return null;
}
