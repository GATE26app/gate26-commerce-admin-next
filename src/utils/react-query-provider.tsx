'use client';
import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as RTKProvider } from 'react-redux';

import store from '@/features/store';

export default function ReactQueryProviders({
  children,
}: React.PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  // const [client] = useState(
  //   new QueryClient({
  //     defaultOptions: {
  //       queries: {
  //         refetchOnWindowFocus: false, // 윈도우가 다시 포커스되었을때 데이터를 refetch
  //         refetchOnMount: false, // 데이터가 stale 상태이면 컴포넌트가 마운트될 때 refetch
  //         retry: 1, // API 요청 실패시 재시도 하는 옵션 (설정값 만큼 재시도)
  //       },
  //     },
  //   }),
  // );

  return (
    <RTKProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider resetCSS>
          {children}
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </ChakraProvider>
      </QueryClientProvider>
    </RTKProvider>
  );
}
