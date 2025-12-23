import React from "react";

import { getUser, updateUser } from "./api";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Button, Space } from "antd";

const queryClient = new QueryClient();

const ReactQuery = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
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
