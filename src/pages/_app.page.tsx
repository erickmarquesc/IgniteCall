import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { GlobalStyles } from '@/styles/globals';
import { queryClient } from '@/lib/react-query';
import type { AppProps } from 'next/app';
import '../lib/dayjs';
import { DefaultSeo } from 'next-seo';

GlobalStyles();

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'pt_BR',
            url: 'https://ignitecall.ecom.com.br',
            siteName: 'Ignite Call',
        }}
        />
        < Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  );
};
