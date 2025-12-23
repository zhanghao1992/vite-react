import { Button, Form, Modal, Space, DatePicker, Tooltip } from "antd";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import React, { useEffect, useRef, useState, isValidElement } from "react";
import css from "./Gantt.module.less";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import {
  zoomLevels,
  originColumns,
  beforeWorkSite,
  afterWorkSite,
  workSite,
} from "./config";
import dayjs from "dayjs";
import classNames from "class-names";
// import { setGanttConfig } from "./base";

const INIT_ZOOM = "day";
React.useLayoutEffect = useEffect;

const Gantt = ({ tasks }) => {
  const ganttContainer = useRef();
  const formRef = useRef();
  const [curZoom, setCurZoom] = useState(INIT_ZOOM);
  const [maxCount, setMaxCount] = useState();
  const [curTask, setCurTask] = useState({});

  const [visible, setVisible] = useState(false);

  const _curZoom = useRef(INIT_ZOOM);

  useEffect(() => {
    registerLightBox();
    setGanttConfig();

    setTaskDrag();
    // setColumns();

    setDateMarker();
    setZooms();

    gantt.init(ganttContainer.current);
    gantt.parse(tasks);
  }, []);

  // 设置网格列
  const setColumns = () => {
    const tempColumns = originColumns.map((item) => {
      const { name, originField, options, type: colType } = item;
      const temp = { ...item };

      // console.log(temp);

      // 如果有 原始字段，将 动态更新后的字段还原回 原始字段
      // 并将其映射关系 记录在 fieldMap 中
      // if (originField) {
      //   fieldMap.current[originField] = name;
      //   temp.name = temp.originField;
      // }
      //       if(temp.name==='样车序号'){
      //         temp.onrender = (item, node) => {
      // return <div>{ite}</div>
      //         }
      //       }

      return temp;
    });

    gantt.config.columns = tempColumns;
  };

  // 设置 时间标识线
  const setDateMarker = () => {
    const dateToStr = gantt.date.date_to_str(gantt.config.task_date);
    const today = new Date(new Date().setHours(0, 0, 0, 0)); // 获取当天零点的时间
    gantt.addMarker({
      start_date: today,
      css: "today",
      text: "今日",
      title: `Today: ${dateToStr(today)}`,
    });
  };

  // gantt.templates.timeline_cell_class = function (start, end, task) {
  //   console.log(task.completed);
  //   if (task.completed) {
  //     return "task-completed";
  //   } else {
  //     return "task-uncompleted";
  //   }
  // };

  // 给其任务的子级 计算开始日期之间的工作日天数的差值
  function calcOffsetDuration(id) {
    const task = gantt.getTask(id);

    gantt.eachTask((child) => {
      const offsetDur = gantt.calculateDuration(
        task.start_date,
        child.start_date
      );

      child.offsetDur = offsetDur;
    }, id);

    return true;
  }

  // 注册自定义 任务弹出框
  function registerLightBox() {
    // 打开 弹出框事件
    gantt.showLightbox = (id) => {
      const task = gantt.getTask(id);
      const store = gantt.getDatastore("task");
      // console.log(task, store);

      // 设置默认值
      // setCurTask(tempTask);
      setVisible(true);
      gantt.resetLayout(); // 重置表格 布局，即新建任务的时候，可以看到新建的任务
    };

    // 关闭 弹出框事件
    gantt.hideLightbox = () => {
      setVisible(false);
      setMaxCount();
    };
  }

  // 设置 父子任务一起拖拽 以及 拖拽范围
  function setTaskDrag() {
    // 在拖拽前 获取 其与其子级开始日期的差值
    gantt.attachEvent("onBeforeTaskDrag", calcOffsetDuration);

    // 这一个 方法是 限制拖拽范围，因为他底层 应该是做了 类似 eventListener 之类的操作，所以可以写两个方法，差分开来显得清晰
    gantt.attachEvent("onTaskDrag", (id, mode, task) => {
      return true;
    });

    // 这一个方法 是用来 父子一起拖动的
    gantt.attachEvent("onTaskDrag", (id, mode, task) => {
      return true;
    });

    // 拖拽完成后的 回调事件
    gantt.attachEvent("onAfterTaskDrag", (id, mode) => {
      const modes = gantt.config.drag_mode;
      // 获取 任务 和 父级
      const task = gantt.getTask(id);
      console.log(mode, modes);

      if (mode === modes.move) {
      } else if (mode === modes.resize) {
      }

      return true;
    });
  }

  // 设置甘特图的 基础配置
  const setGanttConfig = () => {
    gantt.config.row_height = 32;
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    gantt.i18n.setLocale("cn");
    gantt.config.autosize = "y";
    gantt.config.work_time = true;
    gantt.config.drag_links = false;
    gantt.config.drag_progress = false;
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
      click_drag: true,
      drag_timeline: true, // 拖动图
      // tooltip: true,
    });

    // 配置年月日的显示格式但是没有生效
    // gantt.config.scales = [
    //   { unit: "year", step: 1, format: "%F" },
    //   { unit: "month", step: 1, format: "%F, %Y" },
    //   {
    //     unit: "week",
    //     step: 1,
    //     format: function (date) {
    //       return "Week #" + gantt.date.getWeek(date);
    //     },
    //   },
    //   {
    //     unit: "day",
    //     step: 1,
    //     format: "%d",
    //     css: function (date) {
    //       if (!gantt.isWorkTime({ date: date, unit: "day" })) {
    //         return "week_end";
    //       }
    //     },
    //   },
    // ];

    gantt.templates.progress_text = function (start, end, task) {
      return "";
    };

    // gantt.templates.task_text = function (start, end, task) {
    // return renderToString(renderTaskItem(start, end, task));
    //   return renderTaskItem(start, end, task);
    // };

    // 设置 甘特图 时间列的 class 类名，用于配置禁用日期的样式
    gantt.templates.timeline_cell_class = (task, date) => {
      const disableHighlight = ["month", "year", "quarter"].includes(
        _curZoom.current
      );

      if (!disableHighlight && !gantt.isWorkTime(date)) return css["week_end"];
      return "";
    };

    // 设置 任务的 class 类名，用于配置 任务完成时的 样式
    gantt.templates.task_class = (start, end, task) => {
      return task.completed ? css["task-completed"] : css["task-uncompleted"];
    };

    // 任务移动后的回调事件
    gantt.attachEvent("onAfterTaskMove", (id, parent, tindex) => {
      newUpdateSortCode(id, parent, tindex);
    });

    // 配置 可以让表格渲染 用 react 组件
    gantt.config.external_render = {
      // checks the element is a React element
      isElement: (element) => {
        return isValidElement(element);
      },
      // renders the React element into the DOM
      renderElement: (element, container) => {
        createRoot(container).render(element);
      },
    };
  };

  // 变更 时间刻度视图
  const handleChangeZoom = (zoom) => {
    setCurZoom(zoom);
    _curZoom.current = zoom;
    gantt.ext.zoom.setLevel(zoom);
  };

  const setZooms = () => {
    const zoomConfig = {
      levels: zoomLevels,
      // useKey: "ctrlKey",
      // trigger: "wheel",
      element: () => {
        return gantt.$root.querySelector(".gantt_task");
      },
    };
    gantt.ext.zoom.init(zoomConfig);
    gantt.ext.zoom.setLevel(INIT_ZOOM);
  };

  const taskStageClick = () => {
    console.log("asdas");
  };

  const renderTaskItem = (start, end, task) => {
    console.log(task);

    // return (
    //   <div className={css["task-wrapper"]}>
    //     <Tooltip title={`试验开始时间: ${task["试验开始时间"]}`}>
    //       <span
    //         className={classNames(css["task-item-dot"])}
    //         onClick={(e) => {
    //           e.stopPropagation();
    //           console.log("1212");
    //         }}
    //       ></span>
    //     </Tooltip>
    //   </div>
    // );
  };

  const renderZoomButton = () => {
    return (
      <div style={{ marginBottom: 12 }}>
        {zoomLevels.map((item) => {
          return (
            <Button
              key={item.name}
              type="primary"
              disabled={item.name === curZoom}
              onClick={() => {
                handleChangeZoom(item.name);
              }}
              style={{ marginRight: 6 }}
            >
              {item.label}
            </Button>
          );
        })}
      </div>
    );
  };

  // 取消编辑或新建 任务
  function handleModalCancel() {
    if (curTask.$new) {
      gantt.deleteTask(curTask.id);
    }
    setVisible(false);
    setMaxCount();
    setCurTask({});
  }

  // 保存 走 表单校验
  function handleModalSubmit() {
    const data = formRef.current.getFieldsValue();
    console.log("提交", data);
  }

  // 渲染 模态框底部
  const renderFooter = () => {
    return (
      <div className="task-modal-footer">
        <div className="footer-left"></div>
        <div className="footer-right">
          <Space>
            <Button onClick={handleModalCancel}>取消</Button>
            <Button type="primary" onClick={handleModalSubmit}>
              确定
            </Button>
          </Space>
        </div>
      </div>
    );
  };
  return (
    <>
      {renderZoomButton()}
      <div
        className={css["gantt-container"]}
        ref={ganttContainer}
        style={{ width: "100%", height: "100%" }}
      ></div>

      <Modal
        open={visible}
        onCancel={handleModalCancel}
        footer={renderFooter()}
        destroyOnClose
        title="新建/编辑任务"
        className="edit-task-modal"
      >
        <Form
          // initialValues={curTask}
          // onValuesChange={handleFormChange}
          // onFinish={handleModalSave}
          ref={formRef}
        >
          {[...beforeWorkSite, ...workSite, ...afterWorkSite].map((item) => (
            <Form.Item label={item.name} key={item.name}>
              <DatePicker />
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </>
  );
};
export default Gantt;
