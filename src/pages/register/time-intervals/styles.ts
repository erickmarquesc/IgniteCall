import { Box, styled, Text } from '@ignite-ui/react';

export const IntervalBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
});

export const IntervalContainer = styled('div', {
  marginBottom: '$4',
  borderRadius: '$md',
  border: '1px solid $gray600',
});

export const IntervalItem = styled('div', {
  display: 'flex',
  padding: '$3 $4',
  alignItems: 'center',
  justifyContent: 'space-between',

  '& + &': {
    borderTop: '1px solid $gray600',
  },

});

export const IntervalDay = styled('div', {
  gap: '$3',
  display: 'flex',
  alignItems: 'center',
});

export const IntervalInputs = styled('div', {
  gap: '$2',
  display: 'flex',
  alignItems: 'center',

  /* modificar icone do componente do google */
  'input::-webkit-calendar-picker-indicator': {
    filter: 'invert(100%) brightness(40%)',
  },
});

export const FormError = styled(Text, {
  color: '#f75a68',
  marginBottom: '$4',
});