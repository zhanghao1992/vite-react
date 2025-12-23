/*
 * @Author: 张浩 386708307@qq.com
 * @Date: 2025-12-18 14:19:27
 * @LastEditors: 张浩 386708307@qq.com
 * @LastEditTime: 2025-12-18 14:20:18
 * @FilePath: /vite-react/src/pages/ErrorBoundary/ErrorBoundary.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";

type Props = {
  fallback?: React.ReactNode;
  onReset?: () => void;
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends React.PureComponent<Props, State> {
  state: State = {
    hasError: false,
  };

  /** 捕获 render 阶段错误 */
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  /** 记录错误（可上报 Sentry） */
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div style={{ padding: 16, color: "red" }}>
            <h3>子组件出错了</h3>
            <p>{this.state.error?.message}</p>
            <button onClick={this.reset}>重试</button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
