/*
 * @Author: 张浩 386708307@qq.com
 * @Date: 2026-03-23
 * @Description: @hello-pangea/dnd 拖拽示例
 */
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./index.less";

// 左侧组件库的数据
const COMPONENT_LIBRARY = [
  { id: "comp-1", type: "header", name: "标题组件", icon: "📝" },
  { id: "comp-2", type: "paragraph", name: "段落组件", icon: "📄" },
  { id: "comp-3", type: "image", name: "图片组件", icon: "🖼️" },
  { id: "comp-4", type: "button", name: "按钮组件", icon: "🔘" },
  { id: "comp-5", type: "form", name: "表单组件", icon: "📋" },
  { id: "comp-6", type: "card", name: "卡片组件", icon: "🎴" },
];

const DndDemo = () => {
  // 右侧内容区的组件列表
  const [canvasItems, setCanvasItems] = useState([
    { id: "item-1", type: "header", name: "标题组件", icon: "📝" },
    { id: "item-2", type: "card", name: "卡片组件", icon: "🎴" },
  ]);

  // 拖拽结束处理
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // 没有有效的拖放位置
    if (!destination) {
      return;
    }

    // 从组件库拖到画布
    if (source.droppableId === "component-library" && destination.droppableId === "canvas") {
      const component = COMPONENT_LIBRARY.find((c) => c.id === draggableId);
      if (component) {
        const newItem = {
          ...component,
          id: `${component.id}-${Date.now()}`,
        };
        setCanvasItems((prev) => {
          const newItems = [...prev];
          newItems.splice(destination.index, 0, newItem);
          return newItems;
        });
      }
      return;
    }

    // 画布内部排序
    if (source.droppableId === "canvas" && destination.droppableId === "canvas") {
      if (source.index === destination.index) {
        return;
      }

      setCanvasItems((prev) => {
        const newItems = [...prev];
        const [removed] = newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, removed);
        return newItems;
      });
    }
  };

  // 删除画布组件
  const handleDelete = (id) => {
    setCanvasItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="dnd-demo">
      <div className="dnd-demo-header">
        <h1>拖拽组件示例</h1>
        <p>从左侧组件库拖拽组件到右侧画布，画布内的组件可以拖拽排序</p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="dnd-demo-content">
          {/* 左侧组件库 */}
          <div className="component-library">
            <h3>组件库</h3>
            <Droppable droppableId="component-library" isDropDisabled={true}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className={`component-list ${snapshot.isDraggingOver ? "dragging-over" : ""}`}
                  {...provided.droppableProps}
                >
                  {COMPONENT_LIBRARY.map((component, index) => (
                    <Draggable
                      key={component.id}
                      draggableId={component.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`component-item ${snapshot.isDragging ? "dragging" : ""}`}
                        >
                          <span className="component-icon">{component.icon}</span>
                          <span className="component-name">{component.name}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* 右侧画布 */}
          <div className="canvas-area">
            <h3>
              画布区域
              <span className="item-count">({canvasItems.length} 个组件)</span>
            </h3>
            <Droppable droppableId="canvas">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`canvas ${snapshot.isDraggingOver ? "dragging-over" : ""} ${canvasItems.length === 0 ? "empty" : ""}`}
                >
                  {canvasItems.length === 0 ? (
                    <div className="empty-hint">
                      <p>👈 从左侧拖拽组件到这里</p>
                    </div>
                  ) : (
                    canvasItems.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`canvas-item ${snapshot.isDragging ? "dragging" : ""}`}
                          >
                            <div className="item-header">
                              <span className="drag-handle">⋮⋮</span>
                              <span className="item-icon">{item.icon}</span>
                              <span className="item-name">{item.name}</span>
                              <button
                                className="delete-btn"
                                onClick={() => handleDelete(item.id)}
                              >
                                ✕
                              </button>
                            </div>
                            <div className="item-content">
                              {item.type === "header" && <h2>这是一个标题</h2>}
                              {item.type === "paragraph" && <p>这是一段文字内容。</p>}
                              {item.type === "image" && (
                                <div className="placeholder-image">图片占位符</div>
                              )}
                              {item.type === "button" && <button className="demo-button">按钮</button>}
                              {item.type === "form" && (
                                <div className="demo-form">
                                  <input type="text" placeholder="输入内容" disabled />
                                </div>
                              )}
                              {item.type === "card" && (
                                <div className="demo-card">
                                  <p>卡片内容</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default DndDemo;
