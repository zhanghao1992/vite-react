# 可视化公式编辑器使用指南

## 概述

集成了 **KityFormula** 可视化公式编辑器，类似于 TinyMCE 中的公式编辑器，提供图形化界面来创建数学公式。

## 功能特性

### 🎨 图形化编辑界面
- 点击工具栏的数学符号按钮插入公式元素
- 支持分数、根号、积分、求和、矩阵等
- 实时预览公式效果

### 📦 内置公式模板
- 二次公式
- 勾股定理
- 质能方程
- 微分、积分
- 求和公式
- 矩阵

## 使用方式

### 1. 基本使用

```jsx
import React, { useState } from "react";
import RichEditor from "../../components/RichEditor";
import FormulaEditor from "../../components/RichEditor/FormulaEditor";

function MyPage() {
  const [content, setContent] = useState("");
  const [showFormulaEditor, setShowFormulaEditor] = useState(false);

  const insertFormula = (latex) => {
    // LaTeX 代码会被包装在 $$ 中
    const formulaHtml = `<p>$$${latex}$$</p>`;
    setContent(content + formulaHtml);
    setShowFormulaEditor(false);
  };

  return (
    <div>
      <button onClick={() => setShowFormulaEditor(true)}>
        插入公式
      </button>

      <RichEditor
        value={content}
        onChange={setContent}
        height={500}
      />

      {showFormulaEditor && (
        <FormulaEditor
          onConfirm={insertFormula}
          onCancel={() => setShowFormulaEditor(false)}
        />
      )}
    </div>
  );
}
```

### 2. FormulaEditor 组件 Props

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `onConfirm` | `(latex: string) => void` | ✅ | 确认插入时回调，返回 LaTeX 代码 |
| `onCancel` | `() => void` | ✅ | 取消时回调 |
| `initialValue` | `string` | ❌ | 初始 LaTeX 代码 |

### 3. 生成的 LaTeX 格式

公式会被包装在 `$$...$$` 中，支持 MathJax 渲染：

```latex
E = mc^2
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
\int_{a}^{b} f(x)dx
\sum_{i=1}^{n} x_i
\begin{pmatrix} a & b \\ c & d \end{pmatrix}
```

## 编辑器界面说明

### 工具栏分类

1. **基础符号**
   - 加减乘除
   - 等号、不等号
   - 括号

2. **希腊字母**
   - α β γ δ ε ...
   - 大写希腊字母

3. **运算符**
   - 分数 \frac{a}{b}
   - 根号 \sqrt{x}
   - 上标 x^2、下标 x_2

4. **微积分**
   - 积分 \int
   - 极限 \lim
   - 求导

5. **矩阵与括号**
   - 矩阵 \begin{pmatrix}...\end{pmatrix}
   - 大括号、中括号

## CDN 依赖

已在 `index.html` 中引入以下依赖：

```html
<script src="https://cdn.jsdelivr.net/npm/kity@2.0.4/dist/kity.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/kityformula-parser@1.0.0/dist/kityformula-parser.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/kityformula-render@1.0.0/dist/kityformula-render.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/kityformula-editor@1.0.0/dist/kityformula-editor.min.js"></script>
```

## 示例页面

完整示例参考：`src/pages/wang-editor/index.jsx`

访问 http://localhost:5173/wang-editor 点击"🧮 可视化公式编辑器"按钮体验。

## 常见问题

### Q: 公式不显示？
A: 确保 index.html 中已引入 MathJax 和 KityFormula 的 CDN 资源。

### Q: 如何自定义公式模板？
A: 在 `FormulaEditor/index.jsx` 中修改 `presets` 数组。

### Q: 如何调整编辑器大小？
A: 修改 `FormulaEditor/index.module.less` 中的样式。
