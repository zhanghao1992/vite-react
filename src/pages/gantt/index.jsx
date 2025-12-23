import React, { useEffect, useState } from "react";
import Gantt from "../../components/Gantt";
import { GANNT_DATA } from "./mock";

const GanttApp = () => {
  return <Gantt tasks={GANNT_DATA} />;
};
export default GanttApp;
