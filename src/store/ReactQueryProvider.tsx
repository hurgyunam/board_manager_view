// src/components/providers/ReactQueryProvider.tsx

"use client"; // 🚨 반드시 선언해야 합니다.

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// QueryClient는 한 번만 생성되어야 하므로, useState나 React Ref를 사용하여 관리합니다.
// 여기서는 useState를 사용하여 컴포넌트 라이프사이클 동안 인스턴스가 유지되도록 합니다.
export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // 💡 중요한 부분: QueryClient 인스턴스는 클라이언트 환경에서 생성됩니다.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
