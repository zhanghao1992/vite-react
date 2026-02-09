import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Editor, Toolbar } from "@wangeditor-next/editor-for-react";
import "@wangeditor-next/editor/dist/css/style.css";
import styles from "./index.module.less";

/**
 * 富文本编辑器组件
 * @param {Object} props
 * @param {string} props.value - 编辑器内容 (HTML)
 * @param {Function} props.onChange - 内容变化回调 (html) => void
 * @param {string} props.placeholder - 占位符文本
 * @param {number} props.height - 编辑器高度 (默认 500px)
 * @param {string} props.uploadUrl - 图片上传接口地址
 * @param {number} props.maxFileSize - 最大文件大小 (默认 5MB)
 * @param {boolean} props.disabled - 是否禁用
 * @param {Object} props.toolbarConfig - 工具栏配置
 */
const RichEditor = forwardRef(({
  value = "",
  onChange,
  placeholder = "请输入内容...",
  height = 500,
  uploadUrl = "/api/upload",
  maxFileSize = 5 * 1024 * 1024,
  disabled = false,
  toolbarConfig = {},
}, ref) => {
  const [editor, setEditor] = useState(null);
  const [html, setHtml] = useState(value);

  // 工具栏默认配置
  const defaultToolbarConfig = {
    // 排除某些按钮（可选）
    // excludeKeys: ["group-video"],
  };

  // 合并工具栏配置
  const finalToolbarConfig = { ...defaultToolbarConfig, ...toolbarConfig };

  // 编辑器配置
  const editorConfig = {
    placeholder,
    readOnly: disabled,
    onChange(editor) {
      const newHtml = editor.getHtml();
      setHtml(newHtml);
      onChange?.(newHtml);
    },
    MENU_CONF: {
      // 配置上传图片
      uploadImage: {
        fieldName: "file",
        server: uploadUrl,
        maxFileSize: maxFileSize,
        allowedFileTypes: ["image/*"],
        onSuccess(file, res) {
          console.log("图片上传成功", file, res);
        },
        onFailed(file, res) {
          console.error("图片上传失败", file, res);
        },
        onError(file, err, res) {
          console.error("图片上传错误", file, err, res);
        },
        // 自定义插入图片
        customInsert(res, insertFn) {
          // res 是服务端返回的数据
          // insertFn(url, alt, href) 插入图片
          // 假设服务端返回格式: { url, alt, href }
          const url = res?.url || res?.data?.url;
          if (url) {
            insertFn(url, res?.alt || "图片", res?.href || "");
          }
        },
      },
      // 配置表格
      insertTable: {
        // 可配置表格样式等
      },
    },
  };

  // 及时销毁 editor，防止内存泄漏
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  // 外部 value 变化时更新编辑器内容
  useEffect(() => {
    if (editor && value !== html) {
      editor.setHtml(value);
      setHtml(value);
    }
  }, [value]);

  // 暴露编辑器实例的方法
  useImperativeHandle(ref, () => ({
    // 获取 HTML
    getHtml: () => editor?.getHtml() || "",
    // 获取文本
    getText: () => editor?.getText() || "",
    // 获取 JSON
    getJson: () => editor?.children || [],
    // 设置内容
    setHtml: (content) => {
      if (editor) {
        editor.setHtml(content);
        setHtml(content);
      }
    },
    // 清空内容
    clear: () => {
      if (editor) {
        editor.clear();
        setHtml("");
      }
    },
    // 禁用
    disable: () => editor?.disable(),
    // 启用
    enable: () => editor?.enable(),
    // 获取编辑器实例
    getEditor: () => editor,
  }));

  return (
    <div className={styles["rich-editor-wrapper"]} style={{ height: `${height}px` }}>
      <Toolbar
        editor={editor}
        defaultConfig={finalToolbarConfig}
        mode="default"
        style={{ borderBottom: "1px solid #ccc" }}
      />
      <Editor
        defaultConfig={editorConfig}
        value={html}
        onCreated={setEditor}
        mode="default"
        style={{ height: "calc(100% - 41px)", overflowY: "hidden" }}
      />
    </div>
  );
});

// 设置 displayName 以便调试
RichEditor.displayName = "RichEditor";

export default RichEditor;
