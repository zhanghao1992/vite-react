/**
 * wang-editor 公式插件
 * 支持 KaTeX 公式渲染
 */
import { Boot } from "@wangeditor-next/editor";

// 公式菜单配置
function withFormula(editor) {
  const { isInline, isVoid } = editor;
  const newEditor = editor;

  // 插入公式
  newEditor.insertFormula = (latex) => {
    // 使用 span 标签插入公式，标记为不可编辑
    const formulaElement = {
      type: "formula",
      children: [{ text: latex }],
    };
    newEditor.insertNode(formulaElement);
  };

  return newEditor;
}

// 注册公式节点类型
export default function registerFormulaPlugin() {
  // 如果已注册，跳过
  if (Boot.plugins.has("formula-plugin")) {
    return;
  }

  Boot.registerPlugin({
    key: "formula-plugin",
    // 配置
    config: {},
    // 扩展 editor
    extendEditorMethods: (methods) => {
      const { insertNode } = methods;
      return {
        insertNode(node) {
          // 处理公式节点插入
          return insertNode(node);
        },
      };
    },
    // 扩展 node
    nodes: {
      formula: {
        // 是否为行内元素
        isInline: true,
        // 是否为 void 元素（不可编辑内容）
        isVoid: true,
      },
    },
  });
}
