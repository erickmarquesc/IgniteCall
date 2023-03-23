import { Box, Heading, styled, Text } from '@ignite-ui/react';

export const Container = styled('main', {
  maxWidth: 572,
  margin: '$20 auto $4',
  padding: '0 $4',
});

export const Header = styled('div', {
  padding: '0 $6',

  [`> ${Heading}`]: {
    lineHeight: '$base',
  },

  [`> ${Text}`]: {
    marginBottom: '$6',
    color: '$gray200',
  },
});

export const Form = styled(Box, {
  gap: '$4',
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',

  label: {
    gap: '$2',
    display: 'flex',
    flexDirection: 'column',
  }
});

export const FormError = styled(Text, {
  color: '#f75a68' // Cor fora do DesignerSystem 
});