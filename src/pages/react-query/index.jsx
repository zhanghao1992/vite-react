/*
 * @Author: 张浩 386708307@qq.com
 * @Date: 2025-12-22 09:24:45
 * @LastEditors: 张浩 386708307@qq.com
 * @LastEditTime: 2026-02-09 09:46:07
 * @FilePath: /vite-react/src/pages/react-query/index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getUser, updateUser } from "./api";
import {
  QueryClient,
  QueryClientProvider,
  queryOptions,
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
} from "@tanstack/react-query";
import { Button, Space } from "antd";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const ReactQuery = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  );
};

const Example = () => {
  const {
    data, // 获取的数据
    isLoading, // 初始加载期间为true
    isError, // 如果发生错误则为true
    error, // 如果存在则为错误对象
    status, // 'loading'、'error'或'success'
    isFetching, // 在任何获取期间为true（包括后台）
  } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
    staleTime: 10 * 1000,
  });

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return updateUser(newTodo);
    },
    onSuccess: () => {
      // 使待办事项列表无效并重新获取
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    },
  });

  // Access the client
  const queryClient = useQueryClient();

  // if (isPending) return "Loading...";
  // if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>Example</h1>
      <div>data: {data?.message}</div>
      <div>status: {status}</div>
      <div className="text-red-500 ">
        isFetching: {isFetching ? "true" : "false"}
      </div>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: ["getUser"] });
            console.log("再查询");
          }}
        >
          再查询
        </Button>
        <Button
          type="dashed"
          variant="filled"
          loading={mutation.isPending}
          onClick={() => {
            mutation.mutate({ name: "zhanghao", age: 23 });
          }}
        >
          更新
        </Button>
      </Space>
    </div>
  );
};
export default ReactQuery;
