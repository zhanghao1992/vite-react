import { renderToString } from "react-dom/server";
// 设置甘特图的 基础配置
const setGanttConfig = () => {
  gantt.config.row_height = 32;
  gantt.config.date_format = "%Y-%m-%d %H:%i";
  gantt.i18n.setLocale("cn");
  gantt.config.autosize = "y";
  gantt.config.work_time = true;
  gantt.locale.labels.new_task = "新任务";

  gantt.config.layout = {
    css: "gantt_container",
    cols: [
      {
        width: 400,
        min_width: 300,
        rows: [
          {
            view: "grid",
            scrollX: "gridScroll",
            scrollable: true,
            scrollY: "scrollVer",
          },
          { view: "scrollbar", id: "gridScroll", group: "horizontal" },
        ],
      },
      { resizer: true, width: 1 },
      {
        rows: [
          { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
          { view: "scrollbar", id: "scrollHor", group: "horizontal" },
        ],
      },
      { view: "scrollbar", id: "scrollVer" },
    ],
  };

  gantt.config.order_branch = "marker";
  gantt.config.order_branch_free = true;
  // gantt.config.date_scale = "%d";
  // gantt.config.scales = [{ unit: "day", step: 1, format: "%d" }];

  // gantt.templates.scale_cell_class = function (date) {
  //   if (date.getDay() == 0 || date.getDay() == 6) {
  //     return "weekend";
  //   }
  // };

  gantt.plugins({
    marker: true,
  });

  gantt.templates.task_text = function (start, end, task) {
    console.log(start);
    console.log(end);
    console.log(task);

    const dom = (
      <ul class="task-wrapper">
        <li>漆后车身返回计划</li>
        <li>上线计划</li>
        <li>一次电检</li>
        <li>二次电检</li>
        <li>下线计划</li>
        <li>交付计划</li>
      </ul>
    );

    return renderToString(dom);
  };

  // 设置 甘特图 时间列的 class 类名，用于配置禁用日期的样式
  gantt.templates.timeline_cell_class = (task, date) => {
    const disableHighlight = ["month", "year", "quarter"].includes(
      _curZoom.current
    );

    if (!disableHighlight && !gantt.isWorkTime(date)) return "week_end";
    return "";
  };

  // 设置 任务的 class 类名，用于配置 任务完成时的 样式
  gantt.templates.task_class = (start, end, task) => {
    if (task.progress === 1) return "completed_task";
    return "";
  };

  // 任务移动后的回调事件
  gantt.attachEvent("onAfterTaskMove", (id, parent, tindex) => {
    newUpdateSortCode(id, parent, tindex);
  });
};

export { setGanttConfig };
