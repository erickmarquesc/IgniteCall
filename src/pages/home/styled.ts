import { Heading, styled, Text } from "@ignite-ui/react";

export const Container = styled('div', {
  gap: '$20',
  height: '100vh',
  display: 'flex',
  marginLeft: 'auto',
  overflow: 'hidden',
  alignItems: 'center',
  maxWidth: 'calc(100vw - (100vw - 1160px)/2)',
});

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 $10',

  /* Estilizando componentes */
  /* Usando o sinal > eu deixo claro que a estilização
   * é apenas para os componentes de maior nível e não 
   * os que estão dentro dos componentes
   */

  [`> ${Heading}`]: {
    fontSize: '$4xl',
    '@media(max-width: 600px)': {
      fontSize: '$6xl',
    },
  },

  [`> ${Text}`]: {
    fontSize: '$lg',
    maskType: '$2',
    color: '$gray200',
  },
});

export const Preview = styled('div', {
  paddingRight: '$8',
  overflow: 'hidden',

  '@media(max-width:600px)': {
    display: 'none',
  },
});