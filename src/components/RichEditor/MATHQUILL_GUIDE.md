# MathQuill 可视化公式编辑器

## 概述

已从 **KityFormula** 切换到 **MathQuill**，因为 MathQuill 有可用的 npm 包，更适合本地开发。

## 为什么切换？

- ✅ **KityFormula** 没有 npm 包，无法本地安装
- ✅ **MathQuill** 有成熟的 npm 包 (`mathquill`, `react-mathquill`)
- ✅ MathQuill 活跃维护，文档完善
- ✅ 功能更强大，支持更多数学符号

## 本地依赖

已安装的 npm 包：

```bash
pnpm add mathquill react-mathquill kity
```

## CDN 资源（index.html）

```html
<!-- MathQuill CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mathquill@0.10.1/build/mathquill.css" />

<!-- jQuery (MathQuill 依赖) -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>

<!-- MathQuill JS -->
<script src="https://cdn.jsdelivr.net/npm/mathquill@0.10.1/build/mathquill.min.js"></script>
```

## 使用方式

```jsx
import MathQuillEditor from "../../components/RichEditor/FormulaEditor/MathQuillEditor";

function MyPage() {
  const [showFormulaEditor, setShowFormulaEditor] = useState(false);

  const insertFormula = (latex) => {
    // latex: "E = mc^2"
    const formulaHtml = `<p>$$${latex}$$</p>`;
    setContent(content + formulaHtml);
    setShowFormulaEditor(false);
  };

  return (
    <>
      <button onClick={() => setShowFormulaEditor(true)}>
        插入公式
      </button>

      {showFormulaEditor && (
        <MathQuillEditor
          onConfirm={insertFormula}
          onCancel={() => setShowFormulaEditor(false)}
        />
      )}
    </>
  );
}
```

## 组件 Props

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `onConfirm` | `(latex: string) => void` | ✅ | 确认插入时回调，返回 LaTeX 代码 |
| `onCancel` | `() => void` | ✅ | 取消时回调 |
| `initialValue` | `string` | ❌ | 初始 LaTeX 代码 |

## 功能特性

### 🎨 图形化编辑界面
- 点击工具栏按钮插入数学符号
- 支持基础运算、上下标、分数根号
- 支持希腊字母、微积分符号
- 实时 LaTeX 预览

### 📦 内置公式模板
- 二次公式
- 勾股定理
- 质能方程
- 微分、积分
- 求和、极限
- 矩阵

### 🔧 支持的命令

**基础运算：**
`+`, `-`, `×`, `\times`, `÷`, `\div`, `=`, `\neq`, `<`, `>`, `\leq`, `\geq`

**上下标：**
`^`, `_`

**分数根号：**
`/`, `\sqrt`, `\nthRoot`

**希腊字母：**
`\alpha`, `\beta`, `\gamma`, `\delta`, `\theta`, `\lambda`, `\pi`, `\Sigma`, `\Delta`, `\Omega`

**微积分：**
`\int`, `\iint`, `\partial`, `\infty`, `\lim`

## 示例

访问 http://localhost:5173/wang-editor 点击"🧮 可视化公式编辑器"按钮体验。

## 完全本地化的优势

相比使用 CDN，完全本地化具有以下优势：

1. **离线可用** - 不依赖网络
2. **加载更快** - 无需从外部下载
3. **版本固定** - 避免 CDN 版本变更导致的问题
4. **安全性** - 不受 CDN 服务影响

MathQuill 通过 npm 包实现本地化，只使用 CDN 加载 CSS 和基础 JS，大大降低了对外部依赖的依赖程度。
