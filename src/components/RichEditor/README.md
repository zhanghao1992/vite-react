# RichEditor 富文本编辑器组件

基于 wang-editor 封装的富文本编辑器 React 组件，支持图片上传、表格编辑、数学公式等功能。

## 功能特性

- ✅ 图片上传（支持本地上传和 URL 插入）
- ✅ 表格编辑（插入、删除行列等）
- ✅ 数学公式（支持 LaTeX 格式，通过 MathJax 渲染）
- ✅ 代码块高亮
- ✅ 全屏模式
- ✅ 撤销/重做
- ✅ 多种格式化选项（粗体、斜体、下划线等）

## 安装依赖

```bash
pnpm install @wangeditor-next/editor @wangeditor-next/editor-for-react
```

## 基本用法

```jsx
import React, { useState, useRef } from "react";
import RichEditor from "../../components/RichEditor";

function MyComponent() {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);

  const handleSave = () => {
    // 通过 ref 获取编辑器内容
    const html = editorRef.current.getHtml();
    console.log("保存内容:", html);
  };

  return (
    <div>
      <RichEditor
        ref={editorRef}
        value={content}
        onChange={setContent}
        placeholder="请输入内容..."
        height={500}
        uploadUrl="/api/upload"
      />
      <button onClick={handleSave}>保存</button>
    </div>
  );
}

export default MyComponent;
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `string` | `""` | 编辑器内容 (HTML 格式) |
| `onChange` | `function` | - | 内容变化回调，接收 HTML 字符串 |
| `placeholder` | `string` | `"请输入内容..."` | 占位符文本 |
| `height` | `number` | `500` | 编辑器高度 (px) |
| `uploadUrl` | `string` | `"/api/upload"` | 图片上传接口地址 |
| `maxFileSize` | `number` | `5242880` | 最大文件大小 (默认 5MB) |
| `disabled` | `boolean` | `false` | 是否禁用编辑器 |
| `toolbarConfig` | `object` | `{}` | 工具栏配置 |

## Ref 方法

通过 ref 可以访问以下方法：

```jsx
// 获取 HTML 内容
const html = editorRef.current.getHtml();

// 获取纯文本内容
const text = editorRef.current.getText();

// 获取 JSON 格式
const json = editorRef.current.getJson();

// 设置内容
editorRef.current.setHtml("<p>新内容</p>");

// 清空内容
editorRef.current.clear();

// 禁用编辑器
editorRef.current.disable();

// 启用编辑器
editorRef.current.enable();

// 获取编辑器实例
const editor = editorRef.current.getEditor();
```

## 图片上传配置

编辑器会向 `uploadUrl` 发送 POST 请求，请求格式如下：

```javascript
// 请求参数
const formData = new FormData();
formData.append("file", file);

// 期望的响应格式
{
  "url": "https://example.com/image.jpg",
  "alt": "图片描述",
  "href": "https://example.com"
}
```

如果后端返回格式不同，可以在组件中修改 `customInsert` 函数来适配。

## 数学公式

组件支持 LaTeX 格式的数学公式，使用 `$$...$$` 包裹：

```
$$E = mc^2$$
$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$
```

## 样式自定义

组件使用 CSS Modules，样式文件位于 `index.module.less`，可以根据需要修改样式。

## 完整示例

参考 `src/pages/wang-editor/index.jsx` 查看完整示例。
