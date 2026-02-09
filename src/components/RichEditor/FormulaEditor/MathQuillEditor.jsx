import React, { useState, useEffect, useRef } from "react";
import styles from "./MathQuillEditor.module.less";

/**
 * 基于 MathQuill 的可视化公式编辑器
 * 替代 KityFormula，使用 npm 包
 */
const MathQuillEditor = ({ onConfirm, onCancel, initialValue = "" }) => {
  const mathFieldRef = useRef(null);
  const mathQuillRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // 初始化 MathQuill
  useEffect(() => {
    if (!mathFieldRef.current || !window.MathQuill) return;

    try {
      const MQ = window.MathQuill.getInterface(2);
      mathQuillRef.current = MQ.MathField(mathFieldRef.current, {
        spaceBehavesLikeTab: true,
        leftRightIntoCmdGoes: "up",
        restrictMismatchedBrackets: true,
        sumStartsWithNEquals: true,
        supSubsRequireOperand: true,
        symbolsThatEndOutsideScope: "\\)",
        autoSubscriptNumerals: true,
        maxDepth: 10,
        substituteTextarea: function () {
          const textarea = document.createElement("textarea");
          return textarea;
        },
        handlers: {
          edit: function () {
            // 可以在这里处理编辑事件
          },
        },
      });

      // 设置初始值
      if (initialValue) {
        mathQuillRef.current.latex(initialValue);
      }

      setIsReady(true);
    } catch (error) {
      console.error("初始化 MathQuill 失败:", error);
    }

    return () => {
      mathQuillRef.current = null;
    };
  }, []);

  // 确认插入
  const handleConfirm = () => {
    if (!mathQuillRef.current) return;

    try {
      const latex = mathQuillRef.current.latex();
      if (latex && latex.trim()) {
        onConfirm(latex);
      }
    } catch (error) {
      console.error("获取公式失败:", error);
    }
  };

  // 插入命令
  const insertCommand = (cmd) => {
    if (!mathQuillRef.current) return;
    try {
      mathQuillRef.current.cmd(cmd).focus();
    } catch (error) {
      console.error("插入命令失败:", error);
    }
  };

  // 插入预设公式
  const insertPreset = (latex) => {
    if (!mathQuillRef.current) return;
    try {
      mathQuillRef.current.latex(latex);
    } catch (error) {
      console.error("插入预设公式失败:", error);
    }
  };

  // 命令按钮配置
  const commandGroups = [
    {
      name: "基础运算",
      commands: [
        { label: "+", cmd: "+" },
        { label: "-", cmd: "-" },
        { label: "×", cmd: "\\times" },
        { label: "÷", cmd: "\\div" },
        { label: "=", cmd: "=" },
        { label: "≠", cmd: "\\neq" },
        { label: "<", cmd: "<" },
        { label: ">", cmd: ">" },
        { label: "≤", cmd: "\\leq" },
        { label: "≥", cmd: "\\geq" },
      ],
    },
    {
      name: "上下标",
      commands: [
        { label: "x²", cmd: "^" },
        { label: "x₂", cmd: "_" },
        { label: "x^y", cmd: "^" },
        { label: "x_y", cmd: "_" },
      ],
    },
    {
      name: "分数根号",
      commands: [
        { label: "分数", cmd: "/" },
        { label: "根号", cmd: "\\sqrt" },
        { label: "n次根", cmd: "\\nthRoot" },
      ],
    },
    {
      name: "希腊字母",
      commands: [
        { label: "α", cmd: "\\alpha" },
        { label: "β", cmd: "\\beta" },
        { label: "γ", cmd: "\\gamma" },
        { label: "δ", cmd: "\\delta" },
        { label: "θ", cmd: "\\theta" },
        { label: "λ", cmd: "\\lambda" },
        { label: "π", cmd: "\\pi" },
        { label: "Σ", cmd: "\\Sigma" },
        { label: "Δ", cmd: "\\Delta" },
        { label: "Ω", cmd: "\\Omega" },
      ],
    },
    {
      name: "微积分",
      commands: [
        { label: "∫", cmd: "\\int" },
        { label: "∬", cmd: "\\iint" },
        { label: "∂", cmd: "\\partial" },
        { label: "∞", cmd: "\\infty" },
        { label: "lim", cmd: "\\lim" },
      ],
    },
  ];

  // 预设公式
  const presets = [
    { name: "二次公式", latex: "x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}" },
    { name: "勾股定理", latex: "a^2+b^2=c^2" },
    { name: "质能方程", latex: "E=mc^2" },
    { name: "微分", latex: "\\frac{dy}{dx}" },
    { name: "积分", latex: "\\int_a^b f(x)dx" },
    { name: "求和", latex: "\\sum_{i=1}^n x_i" },
    { name: "极限", latex: "\\lim_{x\\to\\infty}" },
    { name: "矩阵", latex: "\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}" },
  ];

  return (
    <div className={styles["formula-editor-modal"]}>
      <div className={styles["modal-content"]}>
        <div className={styles["modal-header"]}>
          <h3>可视化公式编辑器</h3>
          <button className={styles["close-btn"]} onClick={onCancel}>
            ✕
          </button>
        </div>

        {/* MathQuill 编辑器 */}
        <div className={styles["editor-wrapper"]}>
          <div className={styles["toolbar"]}>
            {commandGroups.map((group) => (
              <div key={group.name} className={styles["command-group"]}>
                <div className={styles["group-name"]}>{group.name}</div>
                <div className={styles["command-buttons"]}>
                  {group.commands.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => insertCommand(item.cmd)}
                      className={styles["command-btn"]}
                      disabled={!isReady}
                      title={item.cmd}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles["math-field-container"]}>
            <span ref={mathFieldRef} className={styles["math-field"]}></span>
          </div>
        </div>

        {/* 预设公式 */}
        <div className={styles["preset-section"]}>
          <p className={styles["preset-title"]}>常用公式：</p>
          <div className={styles["preset-buttons"]}>
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => insertPreset(preset.latex)}
                className={styles["preset-btn"]}
                disabled={!isReady}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* LaTeX 预览 */}
        {isReady && (
          <div className={styles["latex-preview"]}>
            <span className={styles["latex-label"]}>LaTeX：</span>
            <code className={styles["latex-code"]}>
              {mathQuillRef.current?.latex() || ""}
            </code>
          </div>
        )}

        {/* 操作按钮 */}
        <div className={styles["modal-footer"]}>
          <button onClick={onCancel} className={styles["cancel-btn"]}>
            取消
          </button>
          <button
            onClick={handleConfirm}
            className={styles["confirm-btn"]}
            disabled={!isReady}
          >
            插入公式
          </button>
        </div>
      </div>
    </div>
  );
};

export default MathQuillEditor;
