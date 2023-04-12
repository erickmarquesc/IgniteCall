import { Box, Text, styled } from "@ignite-ui/react";

export const ConfirmForm = styled(Box, {
  gap: '$4',
  maxWidth: 540,
  display: 'flex',
  margin: '$6 auto 0',
  flexDirection: 'column',

  label: {
    gap: '$2',
    display: 'flex',
    flexDirection: 'column',
  },
});

export const FormHeader = styled('div', {
  gap: '$4',
  display: 'flex',
  alignItems: 'center',

  marginBottom: '$2',
  paddingBottom: '$6',
  borderBottom: '1px solid $gray600',

  [`> ${Text}`]: {
    gap: '$2',
    display: 'flex',
    alignItems: 'center',

    svg: {
      width: '$5',
      height: '$5',
      color: '$gray200',
    },
  },
});

export const FormError = styled(Text, {
  color: '#f75a68',
});

export const FormActions = styled('div', {
  gap: '$2',
  marginTop: '$2',
  display: 'flex',
  justifyContent: 'flex-end',
});