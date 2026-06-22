/*
 * @Author: 张浩 386708307@qq.com
 * @Date: 2026-03-27 10:25:00
 * @LastEditors: zhanghao
 * @LastEditTime: 2026-03-27 10:27:23
 * @FilePath: /vite-react/src/pages/react-query-advanced/api.js
 * @Description: React Query 高级示例 API
 */

// 模拟用户数据
const mockUsers = [
  { id: 1, name: "张三", age: 25, email: "zhangsan@example.com" },
  { id: 2, name: "李四", age: 30, email: "lisi@example.com" },
  { id: 3, name: "王五", age: 28, email: "wangwu@example.com" },
  { id: 4, name: "赵六", age: 35, email: "zhaoliu@example.com" },
  { id: 5, name: "钱七", age: 22, email: "qianqi@example.com" },
  { id: 6, name: "孙八", age: 33, email: "sunba@example.com" },
  { id: 7, name: "周九", age: 29, email: "zhoujiu@example.com" },
  { id: 8, name: "吴十", age: 31, email: "wushi@example.com" },
];

// 模拟帖子数据
const mockPosts = [
  {
    id: 1,
    title: "React Query 入门",
    content: "React Query 是一个强大的数据请求库...",
    userId: 1,
  },
  {
    id: 2,
    title: "React  hooks 最佳实践",
    content: "使用 hooks 可以让代码更简洁...",
    userId: 2,
  },
  {
    id: 3,
    title: "Vite 性能优化",
    content: "Vite 是一个快速的构建工具...",
    userId: 1,
  },
  {
    id: 4,
    title: "TypeScript 进阶",
    content: "TypeScript 可以提供类型安全...",
    userId: 3,
  },
];

// 获取用户列表（支持分页）
export const getUsers = async ({ page = 1, pageSize = 4 }) => {
  console.log("获取用户列表", { page, pageSize });
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 800));

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedUsers = mockUsers.slice(start, end);

  return {
    data: paginatedUsers,
    total: mockUsers.length,
    page,
    pageSize,
  };
};

// 获取单个用户
export const getUserById = async (userId) => {
  console.log("获取用户详情", userId);
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = mockUsers.find((u) => u.id === userId);
  if (!user) {
    throw new Error("用户不存在");
  }
  return user;
};

// 创建用户
export const createUser = async (userData) => {
  console.log("创建用户", userData);
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newUser = {
    id: mockUsers.length + 1,
    ...userData,
  };
  mockUsers.push(newUser);
  return newUser;
};

// 更新用户
export const updateUser = async (userId, userData) => {
  console.log("更新用户", userId, userData);
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const index = mockUsers.findIndex((u) => u.id === userId);
  if (index === -1) {
    throw new Error("用户不存在");
  }

  mockUsers[index] = {
    ...mockUsers[index],
    ...userData,
  };
  return mockUsers[index];
};

// 删除用户
export const deleteUser = async (userId) => {
  console.log("删除用户", userId);
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 800));

  const index = mockUsers.findIndex((u) => u.id === userId);
  if (index === -1) {
    throw new Error("用户不存在");
  }

  mockUsers.splice(index, 1);
  return { success: true };
};

// 获取用户的帖子
export const getPostsByUserId = async (userId) => {
  console.log("获取用户帖子", userId);
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 600));

  return mockPosts.filter((post) => post.userId === userId);
};

// 并行获取多个用户
export const getMultipleUsers = async (userIds) => {
  console.log("并行获取多个用户", userIds);
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return mockUsers.filter((user) => userIds.includes(user.id));
};
