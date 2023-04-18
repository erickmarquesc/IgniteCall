import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { GlobalStyles } from '@/styles/globals';
import { queryClient } from '@/lib/react-query';
import type { AppProps } from 'next/app';
import '../lib/dayjs';

GlobalStyles();

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        < Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  );
};
