import { useMemo, useRef, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useDraggable,
  useSensor,
  useSensors,
  pointerWithin,
  rectIntersection,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Button, Space, Tag } from "antd";

// ========== 左侧组件库定义 ==========

const COMPONENT_LIBRARY = [
  {
    type: "header",
    label: "标题组件",
    height: 80,
    color: "#1677ff",
    icon: "H",
  },
  {
    type: "text",
    label: "文本段落",
    height: 120,
    color: "#52c41a",
    icon: "T",
  },
  {
    type: "image",
    label: "图片组件",
    height: 160,
    color: "#faad14",
    icon: "I",
  },
  {
    type: "button",
    label: "按钮组件",
    height: 98,
    color: "#eb2f96",
    icon: "B",
  },
  {
    type: "divider",
    label: "分割线",
    height: 64,
    color: "#8c8c8c",
    icon: "—",
  },
  {
    type: "card",
    label: "卡片组件",
    height: 200,
    color: "#722ed1",
    icon: "C",
  },
];

// 左侧可拖拽组件
const LibraryItem = ({ component }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `library-${component.type}`,
    data: { type: "library-item", component },
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
    border: `2px solid ${component.color}`,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    gap: 12,
    transition: "opacity 0.2s",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: component.color,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          fontSize: 18,
        }}
      >
        {component.icon}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{component.label}</div>
        <div style={{ fontSize: 12, color: "#8c8c8c" }}>
          高度: {component.height}px
        </div>
      </div>
    </div>
  );
};

// ========== 右侧编辑区 ==========

// 编辑区内的可排序组件
const EditorItem = ({ item, index, isDragging, registerRef }) => {
  const { attributes, listeners, setNodeRef, transform, isSorting } =
    useSortable({
      id: item.id,
      data: { type: "editor-item", item },
    });

  // 合并 ref
  const mergedRef = (node) => {
    setNodeRef(node);
    registerRef(node, index);
  };

  // 拖拽态由 dnd-kit 接管；非拖拽态用 virtualizer 的 start 偏移
  const finalTransform = transform
    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    : `translateY(${item.start}px)`;

  const style = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: item.height,
    transform: finalTransform,
    transition: isSorting
      ? "transform 180ms cubic-bezier(0.2, 0, 0, 1)"
      : undefined,
    zIndex: isSorting || isDragging ? 100 : 1,
    boxSizing: "border-box",
    marginBottom: 8,
  };

  const innerStyle = {
    height: item.height - 8,
    border: `2px solid ${item.color}`,
    borderRadius: 8,
    background: isSorting || isDragging ? "#f0f5ff" : "#fff",
    padding: 12,
    display: "flex",
    alignItems: "center",
    gap: 12,
    boxShadow: isSorting || isDragging ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
  };

  return (
    <div ref={mergedRef} style={style} data-index={index} {...attributes}>
      <div style={innerStyle}>
        <span
          {...listeners}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            fontSize: 16,
            color: "#999",
            padding: "4px 8px",
            background: "#f5f5f5",
            borderRadius: 4,
          }}
          title="拖拽排序"
        >
          ⋮⋮
        </span>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 6,
            background: item.color,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          {item.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{item.label}</div>
          <div style={{ fontSize: 12, color: "#8c8c8c" }}>
            #{index + 1} · 高度 {item.height}px
          </div>
        </div>
        <Tag color={item.color}>{item.type}</Tag>
      </div>
    </div>
  );
};

// 虚拟滚动的编辑区容器
const VirtualizedEditor = ({ items, activeId, insertIndex }) => {
  const parentRef = useRef(null);

  // 动态高度：根据每个 item 的 height 计算
  const getItemHeight = (index) => items[index]?.height || 80;

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => getItemHeight(index),
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  // 设置 Droppable 区域，接收从左侧拖来的组件
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: "editor-dropzone",
  });

  // 合并 ref
  const mergedRef = (node) => {
    parentRef.current = node;
    setDroppableRef(node);
  };

  // 缓存 registerRef
  const registerRef = useMemo(
    () => (node, index) => {
      if (node) rowVirtualizer.measureElement(node, index);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // 给每个 item 附上 start 值
  const itemsWithStart = items.map((item, i) => ({
    ...item,
    start: virtualItems.find((v) => v.index === i)?.start ?? i * item.height,
  }));

  // 计算插入指示线的位置
  const getInsertLinePosition = () => {
    if (insertIndex === null || insertIndex === undefined) return null;
    if (insertIndex === 0) return 0;
    if (insertIndex >= items.length) {
      // 插入到末尾
      let totalHeight = 0;
      items.forEach((item) => {
        totalHeight += item.height;
      });
      return totalHeight;
    }
    // 插入到中间某个位置
    let heightSum = 0;
    for (let i = 0; i < insertIndex; i++) {
      heightSum += items[i]?.height || 80;
    }
    return heightSum;
  };

  const insertLineTop = getInsertLinePosition();

  return (
    <div
      ref={mergedRef}
      style={{
        height: 600,
        overflow: "auto",
        border: isOver ? "2px solid #1677ff" : "1px solid #d9d9d9",
        borderRadius: 8,
        background: isOver ? "#f0f5ff" : "#fafafa",
        position: "relative",
        transition: "border-color 0.2s, background 0.2s",
      }}
    >
      {items.length === 0 ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#8c8c8c",
            fontSize: 14,
          }}
        >
          从左侧拖拽组件到这里
        </div>
      ) : (
        <div
          style={{
            height: totalSize,
            width: "100%",
            position: "relative",
          }}
        >
          {/* 插入指示线 */}
          {isOver && insertLineTop !== null && (
            <div
              style={{
                position: "absolute",
                top: insertLineTop,
                left: 0,
                right: 0,
                height: 3,
                background: "#1677ff",
                zIndex: 200,
                boxShadow: "0 0 8px rgba(22, 119, 255, 0.5)",
              }}
            />
          )}

          <SortableContext items={items.map((it) => it.id)}>
            {virtualItems.map((virtualRow) => {
              const item = itemsWithStart[virtualRow.index];
              if (!item) return null;
              return (
                <EditorItem
                  key={item.id}
                  item={item}
                  index={virtualRow.index}
                  isDragging={activeId === item.id}
                  registerRef={registerRef}
                />
              );
            })}
          </SortableContext>
        </div>
      )}
    </div>
  );
};

// ========== 拖拽时的 Overlay（跟随鼠标的视觉反馈） ==========

const DragOverlayItem = ({ component }) => {
  const style = {
    border: `2px solid ${component.color}`,
    borderRadius: 8,
    padding: 12,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    gap: 12,
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    opacity: 0.9,
    pointerEvents: "none",
  };

  return (
    <div style={style}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: component.color,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          fontSize: 18,
        }}
      >
        {component.icon}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{component.label}</div>
        <div style={{ fontSize: 12, color: "#8c8c8c" }}>
          高度: {component.height}px
        </div>
      </div>
    </div>
  );
};

// ========== 主页面 ==========

const DnDKitPage = () => {
  const [editorItems, setEditorItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);
  const [insertIndex, setInsertIndex] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 生成唯一 ID
  const generateId = () =>
    `editor-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  // 拖拽开始
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
    const data = event.active.data.current;
    if (data?.type === "library-item") {
      setActiveComponent(data.component);
    } else if (data?.type === "editor-item") {
      setActiveComponent(data.item);
    }
  };

  // 拖拽过程中实时更新插入位置
  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) {
      setInsertIndex(null);
      return;
    }

    const activeData = active.data.current;
    const overData = over.data.current;

    // 只有从左侧拖入时才计算插入位置
    if (activeData?.type === "library-item") {
      if (over.id === "editor-dropzone") {
        // 落在编辑区空白处，插入到末尾
        setInsertIndex(editorItems.length);
      } else if (overData?.type === "editor-item") {
        // 落在某个组件上，插入到该组件位置
        const idx = editorItems.findIndex((it) => it.id === over.id);
        setInsertIndex(idx >= 0 ? idx : null);
      } else {
        setInsertIndex(null);
      }
    } else {
      setInsertIndex(null);
    }
  };

  // 拖拽结束
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveComponent(null);
    setInsertIndex(null);

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    // 从左侧组件库拖入编辑区
    if (activeData?.type === "library-item") {
      if (over.id === "editor-dropzone" || overData?.type === "editor-item") {
        const newId = generateId();
        const newComponent = {
          id: newId,
          ...activeData.component,
        };

        if (overData?.type === "editor-item") {
          // 插入到指定位置
          const targetIndex = editorItems.findIndex((it) => it.id === over.id);
          setEditorItems((curr) => {
            const newItems = [...curr];
            newItems.splice(targetIndex, 0, newComponent);
            return newItems;
          });
        } else {
          // 追加到末尾
          setEditorItems((curr) => [...curr, newComponent]);
        }
        return;
      }
    }

    // 编辑区内排序
    if (
      activeData?.type === "editor-item" &&
      overData?.type === "editor-item"
    ) {
      if (active.id === over.id) return;
      setEditorItems((curr) => {
        const oldIndex = curr.findIndex((it) => it.id === active.id);
        const newIndex = curr.findIndex((it) => it.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return curr;
        return arrayMove(curr, oldIndex, newIndex);
      });
    }
  };

  // 清空编辑区
  const handleClear = () => setEditorItems([]);

  // 添加示例数据
  const handleAddDemo = () => {
    const demoItems = COMPONENT_LIBRARY.slice(0, 4).map((c) => ({
      id: generateId(),
      ...c,
    }));
    setEditorItems((curr) => [...curr, ...demoItems]);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={() => {
        setActiveId(null);
        setActiveComponent(null);
        setInsertIndex(null);
      }}
    >
      <div style={{ padding: 16, minHeight: "100vh", background: "#f5f5f5" }}>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Button onClick={handleAddDemo}>添加示例组件</Button>
            <Button onClick={handleClear} danger>
              清空编辑区
            </Button>
            <span style={{ color: "#8c8c8c", fontSize: 13 }}>
              编辑区共 <b>{editorItems.length}</b> 个组件
            </span>
          </Space>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {/* 左侧组件库 */}
          <div
            style={{
              width: 240,
              background: "#fff",
              borderRadius: 8,
              padding: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 16,
                paddingBottom: 12,
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              组件库
            </div>
            {COMPONENT_LIBRARY.map((component) => (
              <LibraryItem key={component.type} component={component} />
            ))}
          </div>

          {/* 右侧编辑区 */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 16,
                paddingBottom: 12,
                borderBottom: "1px solid #f0f0f0",
                background: "#fff",
                borderRadius: 8,
                padding: 16,
              }}
            >
              页面编辑区
            </div>

            <VirtualizedEditor
              items={editorItems}
              activeId={activeId}
              insertIndex={insertIndex}
            />
          </div>
        </div>

        {/* 拖拽时的视觉反馈 */}
        <DragOverlay>
          {activeComponent && <DragOverlayItem component={activeComponent} />}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default DnDKitPage;