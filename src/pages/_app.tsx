import { GlobalStyles } from '@/styles/globals';
import type { AppProps } from 'next/app';

GlobalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
};
