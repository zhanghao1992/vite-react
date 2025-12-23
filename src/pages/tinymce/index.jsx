/*
 * @Author: zhanghao
 * @Date: 2025-05-16 13:33:54
 * @LastEditors: zhanghao
 * @LastEditTime: 2025-07-23 16:00:02
 * @Description:
 * @FilePath: /vite-react/src/pages/tinymce/index.jsx
 */
import { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
// import wirisPlugin from "@wiris/mathtype-tinymce7/plugin.min.js?url";
// import mathjax from "mathjax";

const initialValue =
  '<table style="border-collapse: collapse; width: 99.9825%;" border="1"><colgroup><col style="width: 14.2709%;"><col style="width: 14.2709%;"><col style="width: 14.2709%;"><col style="width: 14.2709%;"><col style="width: 14.2709%;"><col style="width: 14.2709%;"><col style="width: 14.2709%;"></colgroup>\n<tbody>\n<tr>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n</tr>\n<tr>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n</tr>\n<tr>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n</tr>\n<tr>\n<td colspan="7">\n<p class="zhu">注1：</p>\n</td>\n</tr>\n<tr>\n<td colspan="7">\n<p class="jiao_zhu">a)：</p>\n</td>\n</tr>\n</tbody>\n</table>';

export default function TinyMce() {
  const editorRef = useRef(null);
  const [conValue, setConValue] = useState(initialValue);

  //   useEffect(() => {
  //     console.log(editorRef.current);
  //   }, []);

  const log = () => {
    console.log(editorRef.current);
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const editorChange = (value) => {
    // console.log(value);

    setConValue(value);
  };

  const beforeSetContent = (content) => {
    // console.log(content);
    return content;
  };

  const onClick = () => {
    // console.log("onClick");
  };

  const change = () => {
    // console.log("editorChange");
  };

  const onNodeChange = (e) => {
    // console.log("onNodeChange", e);
  };
  return (
    <>
      <Editor
        apiKey="w3a55ba7ya3kly80zlhgthbwwro2ovwns20t53bi3khr586k"
        onInit={(_evt, editor) => {
          editorRef.current = editor;

          let originalRowIndex = 0;
          let newRowIndex = 0;
          editor.on("BeforeExecCommand", (e) => {
            editor.on("BeforeExecCommand", function (e) {
              if (
                e.command === "mceTableInsertRowBefore" ||
                e.command === "mceTableInsertRowAfter"
              ) {
                const selection = editor.selection;
                const cell = selection.getNode(); // 当前选中的表格单元（td/th）
                const row = cell.closest("tr"); // 所在行（tr）

                const table = row.closest("table"); // 所在表格
                const rows = Array.from(table.rows); // 所有行的数组
                originalRowIndex = rows.indexOf(row); // 当前行索引
                // 记录插入方向
                const isInsertAbove = e.command === "mceTableInsertRowBefore";

                // 计算新行位置
                newRowIndex = isInsertAbove
                  ? originalRowIndex
                  : originalRowIndex + 1;

                // console.log(editor.dom.select("tr")[newRowIndex]);

                // editor.dom.setHTML(
                //   editor.dom.select("tr")[newRowIndex],
                //   "some inner html"
                // );
              }
            });
          });

          editor.on("ExecCommand", (e) => {
            // console.log("eeeeeeeeee", e);
            if (
              e.command === "mceTableInsertRowBefore" ||
              e.command === "mceTableInsertRowAfter"
            ) {
              console.log("原始行索引:", originalRowIndex);
              console.log("新行将插入的位置:", newRowIndex);

              //通过className判断是zhu还是jiao_zhu
              let zhuTypeClass = "";
              let zhuText = "";
              if (
                editor.dom
                  .select("tr")
                  [originalRowIndex].querySelector("p")
                  ?.className.includes("jiao_zhu")
              ) {
                zhuTypeClass = "jiao_zhu";
                zhuText = "脚注";
              } else {
                zhuTypeClass = "zhu";
                zhuText = "注";
              }

              const zhuList = editor.dom.select(`p.${zhuTypeClass}`);

              console.log(zhuList);

              editor.dom.setHTML(
                editor.dom.select("tr")[newRowIndex].querySelector("p"),
                `${zhuText}${zhuList.length}：`
              );
            }
            // var content = editor.getContent();
            // console.log(content);
          });
        }}
        value={conValue}
        onEditorChange={editorChange}
        onChange={change}
        onBeforeSetContent={beforeSetContent}
        onClick={onClick}
        onNodeChange={onNodeChange}
        init={{
          height: 500,
          // inline: true,
          // menubar: false,
          setup: function (editor) {
            console.log(editor);

            // editor.on("init", function () {
            //   // 初始化时渲染已存在的公式
            //   MathJax.typesetPromise();
            // });
            // editor.on("change", function () {
            //   // 内容变化后重新渲染
            //   MathJax.typesetPromise();
            // });
          },
          plugins: [
            "table",
            // "kityformula-editor",
            // "advtable",
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "tiny_mce_wiris",
            "charmap",
          ],
          external_plugins: {
            tiny_mce_wiris:
              "/node_modules/@wiris/mathtype-tinymce7/plugin.min.js",
          },

          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help" +
            "image | fullscreen | kityformula-editor | mathjax | charmap | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry",
          // tiny_mce_wiris_formulaEditorParameters: {
          //   language: "en",
          //   backgroundColor: "#FFFFFF",
          // },

          // external_plugins: {
          //   mathjax:
          //     "/node_modules/@dimakorotkov/tinymce-mathjax/plugin.min.js",
          // },
          // mathjax: {
          //   lib: "/node_modules/mathjax/es5/tex-mml-chtml.js", //required path to mathjax
          //   //symbols: {start: '\\(', end: '\\)'}, //optional: mathjax symbols
          //   //className: "math-tex", //optional: mathjax element class
          //   //configUrl: '/your-path-to-plugin/@dimakorotkov/tinymce-mathjax/config.js' //optional: mathjax config js
          // },
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}
