/*
 * @Author: 张浩 386708307@qq.com
 * @Date: 2025-12-18 14:20:32
 * @LastEditors: 张浩 386708307@qq.com
 * @LastEditTime: 2025-12-18 14:33:46
 * @FilePath: /vite-react/src/pages/ErrorBoundary/BadChild.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";

type Props = {
  count: number;
};

const BadChild: React.FC<Props> = ({ count, a }) => {
  if (count === 3) {
    throw new Error("count 不能等于 3！");
  }

  return (
    <div>
      当前 count：{count}
      {a.a}
    </div>
  );
};

/** 优化渲染：props 不变不重新渲染 */
export default React.memo(BadChild);
