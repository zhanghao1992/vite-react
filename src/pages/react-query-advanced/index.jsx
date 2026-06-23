/*
 * @Author: 张浩 386708307@qq.com
 * @Date: 2026-03-27 10:25:00
 * @LastEditors: zhanghao
 * @LastEditTime: 2026-06-23 13:50:29
 * @FilePath: /vite-react/src/pages/react-query-advanced/index.jsx
 * @Description: React Query 高级示例
 */
import { useState, useMemo } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
  useInfiniteQuery,
  useIsFetching,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Button,
  Space,
  List,
  Card,
  Input,
  Form,
  message,
  Table,
  Pagination,
  Tag,
  Alert,
  Select,
  Spin,
} from "antd";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getPostsByUserId,
  getMultipleUsers,
} from "./api";

const { Option } = Select;
const { TextArea } = Input;

// 创建 QueryClient 实例
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000, // 数据30秒内视为新鲜
      retry: 1, // 失败后重试1次
    },
  },
});

const ReactQueryAdvanced = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">React Query 高级示例</h1>

        {/* 全局加载状态 */}
        <GlobalLoadingIndicator />

        {/* 基本查询示例 */}
        <Card title="1. 基本查询示例" className="mb-6">
          <BasicQueryExample />
        </Card>

        {/* 分页查询示例 */}
        <Card title="2. 分页查询示例" className="mb-6">
          <PaginationExample />
        </Card>

        {/* 并行查询示例 */}
        <Card title="3. 并行查询示例" className="mb-6">
          <ParallelQueriesExample />
        </Card>

        {/* 动态查询示例 */}
        <Card title="4. 动态查询示例" className="mb-6">
          <DynamicQueryExample />
        </Card>

        {/* 突变示例 */}
        <Card title="5. 突变（Mutation）示例" className="mb-6">
          <MutationExample />
        </Card>

        {/* 无限查询示例 */}
        <Card title="6. 无限查询示例" className="mb-6">
          <InfiniteQueryExample />
        </Card>
      </div>

      {/* React Query DevTools */}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

// 全局加载指示器
const GlobalLoadingIndicator = () => {
  const isFetching = useIsFetching();

  if (!isFetching) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-blue-50 text-blue-600 py-2 px-4 flex items-center justify-center">
      <Spin size="small" className="mr-2" />
      <span>正在加载数据...</span>
    </div>
  );
};

// 基本查询示例
const BasicQueryExample = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users", { page: 1, pageSize: 3 }],
    queryFn: () => getUsers({ page: 1, pageSize: 3 }),
  });

  if (isLoading) return <Spin tip="加载中..." />;
  if (isError)
    return <Alert message="错误" description={error.message} type="error" />;

  return (
    <div>
      <List
        dataSource={data?.data || []}
        renderItem={(user) => (
          <List.Item>
            <Space size="middle">
              <span>ID: {user.id}</span>
              <span>姓名: {user.name}</span>
              <span>年龄: {user.age}</span>
              <span>邮箱: {user.email}</span>
            </Space>
          </List.Item>
        )}
      />
      <Button onClick={() => refetch()} className="mt-4">
        刷新数据
      </Button>
    </div>
  );
};

// 分页查询示例
const PaginationExample = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", { page, pageSize }],
    queryFn: () => getUsers({ page, pageSize }),
  });

  if (isLoading) return <Spin tip="加载中..." />;
  if (isError)
    return <Alert message="错误" description={error.message} type="error" />;

  return (
    <div>
      <Table
        dataSource={data?.data || []}
        columns={[
          { title: "ID", dataIndex: "id", key: "id" },
          { title: "姓名", dataIndex: "name", key: "name" },
          { title: "年龄", dataIndex: "age", key: "age" },
          { title: "邮箱", dataIndex: "email", key: "email" },
        ]}
        pagination={false}
      />
      <Pagination
        current={page}
        pageSize={pageSize}
        total={data?.total || 0}
        onChange={(newPage, newPageSize) => {
          setPage(newPage);
          setPageSize(newPageSize);
        }}
        style={{ marginTop: 16, textAlign: "center" }}
      />
    </div>
  );
};

// 并行查询示例
const ParallelQueriesExample = () => {
  const userIds = [1, 2, 3];

  const queries = useQueries({
    queries: userIds.map((id) => ({
      queryKey: ["user", id],
      queryFn: () => getUserById(id),
    })),
  });

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);

  if (isLoading) return <Spin tip="加载中..." />;
  if (isError)
    return <Alert message="错误" description="加载用户失败" type="error" />;

  return (
    <List
      dataSource={queries.map((query) => query.data)}
      renderItem={(user) => (
        <List.Item>
          <Card size="small" style={{ width: "100%" }}>
            <p>ID: {user.id}</p>
            <p>姓名: {user.name}</p>
            <p>年龄: {user.age}</p>
            <p>邮箱: {user.email}</p>
          </Card>
        </List.Item>
      )}
    />
  );
};

// 动态查询示例
const DynamicQueryExample = () => {
  const [userId, setUserId] = useState(1);
  const [showPosts, setShowPosts] = useState(false);

  // 获取用户信息
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId, // 只有当 userId 存在时才执行查询
  });

  // 获取用户帖子
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => getPostsByUserId(userId),
    enabled: showPosts && !!userId, // 只有当 showPosts 为 true 且 userId 存在时才执行查询
  });

  return (
    <div>
      <div className="mb-4">
        <label>选择用户: </label>
        <Select
          value={userId}
          onChange={setUserId}
          style={{ width: 120, marginLeft: 8 }}
        >
          {[1, 2, 3, 4, 5].map((id) => (
            <Option key={id} value={id}>
              用户 {id}
            </Option>
          ))}
        </Select>
        <Button
          type="dashed"
          onClick={() => setShowPosts(!showPosts)}
          style={{ marginLeft: 16 }}
        >
          {showPosts ? "隐藏帖子" : "显示帖子"}
        </Button>
      </div>

      {userLoading ? (
        <Spin tip="加载用户信息..." />
      ) : userError ? (
        <Alert message="错误" description="加载用户失败" type="error" />
      ) : user ? (
        <Card className="mb-4">
          <h3>用户信息</h3>
          <p>ID: {user.id}</p>
          <p>姓名: {user.name}</p>
          <p>年龄: {user.age}</p>
          <p>邮箱: {user.email}</p>
        </Card>
      ) : null}

      {showPosts && (
        <div>
          {postsLoading ? (
            <Spin tip="加载帖子..." />
          ) : posts ? (
            <List
              dataSource={posts}
              renderItem={(post) => (
                <List.Item>
                  <Card size="small">
                    <h4>{post.title}</h4>
                    <p>{post.content}</p>
                  </Card>
                </List.Item>
              )}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

// 突变示例
const MutationExample = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // 创建用户
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      message.success("用户创建成功");
      form.resetFields();
      // 使相关查询无效，触发重新获取
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      message.error(`创建失败: ${error.message}`);
    },
  });

  // 更新用户
  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }) => updateUser(id, data),
    onSuccess: (data) => {
      message.success("用户更新成功");
      // 使相关查询无效，触发重新获取
      queryClient.invalidateQueries({ queryKey: ["user", data.id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      message.error(`更新失败: ${error.message}`);
    },
  });

  // 删除用户
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      message.success("用户删除成功");
      // 使相关查询无效，触发重新获取
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      message.error(`删除失败: ${error.message}`);
    },
  });

  const handleCreate = (values) => {
    createMutation.mutate(values);
  };

  const handleUpdate = (values) => {
    updateMutation.mutate(values);
  };

  const handleDelete = (userId) => {
    deleteMutation.mutate(userId);
  };

  return (
    <div>
      <div className="mb-6">
        <h3>创建用户</h3>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreate}
          className="max-w-md"
        >
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="年龄"
            rules={[{ required: true, message: "请输入年龄" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[{ required: true, message: "请输入邮箱" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={createMutation.isPending}
            >
              创建用户
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="mb-6">
        <h3>更新用户</h3>
        <Form layout="vertical" onFinish={handleUpdate} className="max-w-md">
          <Form.Item
            name="id"
            label="用户ID"
            rules={[{ required: true, message: "请输入用户ID" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="name" label="姓名">
            <Input />
          </Form.Item>
          <Form.Item name="age" label="年龄">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="email" label="邮箱">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={updateMutation.isPending}
            >
              更新用户
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div>
        <h3>删除用户</h3>
        <Space>
          {[1, 2, 3, 4, 5].map((id) => (
            <Button
              key={id}
              danger
              onClick={() => handleDelete(id)}
              loading={
                deleteMutation.isPending && deleteMutation.variables === id
              }
            >
              删除用户 {id}
            </Button>
          ))}
        </Space>
      </div>
    </div>
  );
};

// 无限查询示例
const InfiniteQueryExample = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["infiniteUsers"],
    queryFn: ({ pageParam = 1 }) => getUsers({ page: pageParam, pageSize: 4 }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= Math.ceil(lastPage.total / lastPage.pageSize)
        ? nextPage
        : undefined;
    },
  });

  const users = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  if (isLoading) return <Spin tip="加载中..." />;
  if (isError)
    return <Alert message="错误" description={error.message} type="error" />;

  return (
    <div>
      <List
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <Space size="middle">
              <Tag color="blue">{user.id}</Tag>
              <span>{user.name}</span>
              <span>{user.age}岁</span>
              <span>{user.email}</span>
            </Space>
          </List.Item>
        )}
      />
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          loading={isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "加载中..."
            : hasNextPage
              ? "加载更多"
              : "没有更多数据"}
        </Button>
      </div>
    </div>
  );
};

export default ReactQueryAdvanced;
