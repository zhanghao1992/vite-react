/*
 * @Author: 张浩 386708307@qq.com
 * @Date: 2025-12-06 13:38:40
 * @LastEditors: 张浩 386708307@qq.com
 * @LastEditTime: 2025-12-06 14:26:01
 * @FilePath: /vite-react/src/pages/supabasec/index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from "react";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ozggvjjyaohlaxmpeewx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96Z2d2amp5YW9obGF4bXBlZXd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NzUzODMsImV4cCI6MjA4MDU1MTM4M30.NSfxivPvlz_KUIedFE-EWaHo7QPaAJ8LaXTl2yPeNII";

const Supabasec = () => {
  useEffect(() => {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const fetchData = async () => {
      //注册用户
      //   const { data: aData, error: aError } = await supabase.auth.signUp({
      //     email: "386708307@qq.com",
      //     password: "4pK1j98Zho",
      //   });

      const { data: signInData, error: signInDataError } =
        await supabase.auth.signInWithPassword({
          email: "386708307@qq.com",
          password: "4pK1j98Zho",
        });

      //查数据
      //   const { data, error } = await supabase
      //     .from("user_info")
      //     .select("*")
      //     .eq("first_name", "张");
      //   if (error) {
      //     console.error("Error fetching data:", error);
      //   } else {
      //     console.log("Data:", data);
      //   }

      //插入数据
      const { data, error } = await supabase
        .from("user_info")
        .insert([
          {
            first_name: "张",
            last_name: "浩",
            age: 30,
            user_id: signInData?.user?.id,
          },
        ])
        .select();
      console.log(data);
      console.log(error);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Supabasec Page</h1>
      <p>This is the Supabasec page content.</p>
    </div>
  );
};

export default Supabasec;
