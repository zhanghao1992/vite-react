/*
 * @Author: 张浩 386708307@qq.com
 * @Date: 2025-12-18 14:18:40
 * @LastEditors: 张浩 386708307@qq.com
 * @LastEditTime: 2025-12-18 14:20:43
 * @FilePath: /vite-react/src/pages/ErrorBoundary/index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {useCallback, useState} from "react";
import {ErrorBoundary as MyErrorBoundary} from "./ErrorBoundary";

import {ErrorBoundary} from 'react-error-boundary'
import ErrorFallback from "./ErrorFallback";

import BadChild from "./BadChild";

export default function App() {
    const [count, setCount] = useState(0);

    /** useCallback 避免子组件无意义渲染 */
    const inc = useCallback(() => {
        setCount((c) => c + 1);
    }, []);

    const reset = () => {
        setCount(0);
    };

    return (
        <div style={{padding: 24}}>
            <h2>React 18 子组件错误捕获 + 渲染优化</h2>

            <button onClick={inc}>+1</button>

            <MyErrorBoundary onReset={reset}>
                <BadChild count={count}/>
            </MyErrorBoundary>

            <hr/>

            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onError={(error) => {
                    console.log(error)
                }}
            >
                <BadChild count={count}/>
            </ErrorBoundary>

        </div>
    );
}
