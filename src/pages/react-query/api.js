/*
 * @Author: 张浩 386708307@qq.com
 * @Date: 2025-12-22 09:29:48
 * @LastEditors: 张浩 386708307@qq.com
 * @LastEditTime: 2026-02-09 09:46:19
 * @FilePath: /vite-react/src/pages/react-query/api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const getUser = async () => {
  console.log("get user");
  const response = await fetch("/api/mock/public/users");

  return response.json();
};

const updateUser = (user) => {
  console.log("user", user);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(user);
    }, 2000);
  });
};

export { getUser, updateUser };
