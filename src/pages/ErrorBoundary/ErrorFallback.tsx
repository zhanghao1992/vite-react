"use client";

import {FallbackProps} from "react-error-boundary";

export default function ErrorFallback({error, resetErrorBoundary}: FallbackProps) {
    return (
        <div>
            <h2>发生错误</h2>
            <pre>{error.message}</pre>
            <button type="button" onClick={resetErrorBoundary}>
                再试一次
            </button>
        </div>
    );
}
