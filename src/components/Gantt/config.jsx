export const originColumns = [
  {
    type: null,
    align: "center",
    name: "样车序号",
    originField: "样车序号",
    label: "样车序号",
    min_width: 100,
    onrender: (item, node) => {
      return <span className="xxx">{item.样车序号}</span>;
    },
  },
  {
    type: null,
    align: "center",
    name: "试验项目",
    originField: "试验项目",
    label: "试验项目",
    hide: true,
  },
  {
    type: null,
    align: "center",
    name: "配置",
    originField: "配置",
    label: "配置",
  },
  {
    type: null,
    align: "center",
    name: "试验开始时间",
    originField: "试验开始时间",
    label: "试验开始时间",
    min_width: 160,
  },
  {
    type: "date",
    align: "center",
    name: "start_date",
    originField: "start_date",
    label: "漆后车身返回计划",
    min_width: 160,
  },
];

export const zoomLevels = [
  // {
  //   name: "hour",
  //   label: '小时',
  //   scale_height: 50,
  //   min_column_width: 30,
  //   scales: [
  //     { unit: "day", format: "%Y-%m-%d" },
  //     { unit: "hour", format: "%H" },
  //   ],
  // },
  {
    name: "day",
    label: "日",
    scale_height: 70,
    min_column_width: 30,
    scales: [
      { unit: "month", format: "%Y年 %F" },
      // { unit: "day", step: 1, format: "%j %D" },
      {
        unit: "day",
        step: 1,
        format: (date) => {
          const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
          const day = new Date(date).getDate();
          const weekDay = new Date(date).getDay();
          return `<div class='scale-formate-date'>
          <span class='formate-date'>${day}</span>
          <span class='formate-weekDay'>${weekDays[weekDay]}</span>
          </div>`;
          // return "<strong>Day " + dayNumber(date) + "</strong><br/>" + dateFormat(date);
        },
      },
    ],
  },
  {
    name: "week",
    label: "周",
    scale_height: 50,
    min_column_width: 50,
    scales: [
      { unit: "month", format: "%Y年 %F" },
      { unit: "week", step: 1, date: "%W周" },
    ],
  },
  {
    name: "month",
    label: "月",
    scale_height: 50,
    min_column_width: 50,
    scales: [
      // { unit: "year", step: 1, format: "%Y年" },
      {
        unit: "quarter",
        step: 1,
        format: (date) => {
          const year = new Date(date).getFullYear();
          const month = new Date(date).getMonth();
          const quarter = Math.floor(month / 3 + 1);
          return `${year}年-Q${quarter}`;
          // return `Q${quarter}`;
        },
      },
      { unit: "month", step: 1, format: "%F" },
    ],
  },
  {
    name: "quarter",
    label: "季",
    scale_height: 50,
    min_column_width: 50,
    scales: [
      { unit: "year", step: 1, format: "%Y年" },
      {
        unit: "quarter",
        step: 1,
        format: (date) => {
          // const year = new Date(date).getFullYear();
          const month = new Date(date).getMonth();
          const quarter = Math.floor(month / 3 + 1);
          // return `${year}年-Q${quarter}`;
          return `Q${quarter}`;
        },
      },
    ],
  },
  {
    name: "year",
    label: "年",
    scale_height: 50,
    min_column_width: 50,
    scales: [{ unit: "year", step: 1, format: "%Y年" }],
  },
];

export const zoomMap = {
  day: "日",
  week: "周",
  month: "月",
  quarter: "季",
  year: "年",
};

export const beforeWorkSite = [
  {
    id: "fixed1",
    name: "漆后车身需求计划",
    disabled: true,
  },
  {
    id: "fixed2",
    name: "上线计划",
    disabled: true,
  },
];
export const workSite = [
  {
    id: "1",
    name: "一次电检",
  },
  {
    id: "2",
    name: "二次电检",
  },
];
export const afterWorkSite = [
  {
    id: "fixed3",
    name: "下线计划",
    disabled: true,
  },
  {
    id: "fixed4",
    name: "交付计划",
    disabled: true,
  },
];
