import React, { useState, useRef } from "react";
import RichEditor from "../../components/RichEditor";
import MathQuillEditor from "../../components/RichEditor/FormulaEditor/MathQuillEditor";
import styles from "./index.module.less";

const WangEditor = () => {
  const [content, setContent] = useState("<p>你好，这是富文本编辑器示例</p>");
  const [showFormulaEditor, setShowFormulaEditor] = useState(false);
  const editorRef = useRef(null);
  const previewRef = useRef(null);

  // 内容变化回调
  const handleContentChange = (html) => {
    setContent(html);
    // 渲染公式
    setTimeout(() => {
      renderMathJax();
    }, 100);
  };

  // 插入公式（从可视化编辑器获取 LaTeX）
  const insertFormula = (latex) => {
    // 将 LaTeX 包装在 $$ 中
    const formulaHtml = `<p>$$${latex}$$</p>`;
    const newContent = content + formulaHtml;
    setContent(newContent);
    setShowFormulaEditor(false);

    // 渲染公式
    setTimeout(() => {
      renderMathJax();
    }, 100);
  };

  // 使用 MathJax 渲染公式
  const renderMathJax = () => {
    if (!window.MathJax) return;

    MathJax.typesetPromise([previewRef.current])
      .then(() => {
        console.log("公式渲染成功");
      })
      .catch((err) => {
        console.error("公式渲染失败", err);
      });
  };

  // 获取编辑器内容
  const getContent = () => {
    const editor = editorRef.current;
    if (!editor) return;

    console.log("HTML内容:", editor.getHtml());
    console.log("文本内容:", editor.getText());
    console.log("JSON内容:", editor.getJson());
    alert("请查看控制台输出");
  };

  // 清空内容
  const clearContent = () => {
    setContent("");
  };

  // 设置示例内容（包含表格、图片、公式）
  const setDemoContent = () => {
    const demoHtml = `
<h2>富文本编辑器演示</h2>
<p>这是一个功能强大的富文本编辑器，支持以下功能：</p>
<h3>1. 图片上传</h3>
<p>点击工具栏的图片图标可以上传图片，支持拖拽上传。</p>
<h3>2. 表格支持</h3>
<table>
  <thead>
    <tr>
      <th>功能</th>
      <th>说明</th>
      <th>状态</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>图片上传</td>
      <td>支持本地上传和 URL 插入</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>表格编辑</td>
      <td>支持插入和编辑表格</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>可视化公式编辑器</td>
      <td>支持 MathQuill 可视化编辑</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>代码高亮</td>
      <td>支持多种语言代码块</td>
      <td>✅</td>
    </tr>
  </tbody>
</table>
<h3>3. 数学公式（可视化编辑）</h3>
<p>点击"可视化公式编辑器"按钮打开图形化公式编辑器：</p>
<p>$$E = mc^2$$</p>
<p>$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$</p>
<p>$$\\int_{a}^{b} f(x)dx = F(b) - F(a)$$</p>
<p>$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$</p>
<p>$$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$$</p>
<h3>4. 代码块</h3>
<pre><code>function hello() {
  console.log("Hello, World!");
}</code></pre>
<h3>5. 其他功能</h3>
<ul>
  <li><strong>粗体</strong>、<em>斜体</em>、<u>下划线</u></li>
  <li><s>删除线</s>、上标<sup>x²</sup>、下标<sub>H₂O</sub></li>
  <li>引用块、分割线、链接等</li>
</ul>
<blockquote>这是一个引用块的示例</blockquote>
<p>更多功能请点击工具栏上的按钮进行尝试！</p>
    `;
    setContent(demoHtml);

    // 渲染公式
    setTimeout(() => {
      renderMathJax();
    }, 100);
  };

  return (
    <div className={styles["wang-editor-page"]}>
      <h1>富文本编辑器组件示例</h1>

      {/* 操作按钮区 */}
      <div className={styles["button-group"]}>
        <button onClick={getContent}>获取内容</button>
        <button onClick={clearContent}>清空内容</button>
        <button onClick={setDemoContent}>加载示例内容</button>
        <button
          onClick={() => setShowFormulaEditor(true)}
          className={styles["formula-btn"]}
        >
          🧮 可视化公式编辑器
        </button>
      </div>

      {/* 编辑器组件 */}
      <RichEditor
        ref={editorRef}
        value={content}
        onChange={handleContentChange}
        placeholder="请输入内容..."
        height={600}
        uploadUrl="/api/upload"
      />

      {/* 可视化公式编辑器弹窗 */}
      {showFormulaEditor && (
        <MathQuillEditor
          onConfirm={insertFormula}
          onCancel={() => setShowFormulaEditor(false)}
        />
      )}

      {/* 内容预览区 */}
      <div className={styles["preview-section"]}>
        <h3>内容预览（HTML 源码）</h3>
        <pre className={styles["html-preview"]}>{content}</pre>

        <h3>渲染预览</h3>
        <div
          ref={previewRef}
          className={styles["render-preview"]}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default WangEditor;
