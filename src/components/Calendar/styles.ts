import { Text, styled } from "@ignite-ui/react";

export const CalendarContainer = styled('div', {
  gap: '$6',
  padding: '$6',
  display: 'flex',
  flexDirection: 'column',
});

export const CalendarHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const CalendarTitle = styled(Text, {
  fontWeight: '$medium',

  span: {
    color: '$gray200',
  },

});

export const CalendarActions = styled('div', {
  gap: '$2',
  display: 'flex',
  color: '$gray200',

  button: {
    all: 'unset', /* tira todos os estilos padrões do componente */
    lineHeight: 0, /* como esse botão é apenas um icone é recomendado zerar o lineHeight */
    cursor: 'pointer',
    borderRadius: '$sm',

    svg: {
      width: '$5',
      height: '$5',
    },

    '&:hover': {
      color: '$gray100',
    },

    '&:focus': {
      boxShadow: '0 0 0 2px $colors$gray100',
    },
  },
});

export const CalendarBody = styled('table', {
  width: '100%',
  tableLayout: 'fixed',
  fontFamily: '$default',
  borderSpacing: '0.25rem',

  'thead th': {
    fontSize: '$sm',
    color: '$gray200',
    fontWeight: '$medium',
  },

  'tbody:before': {
    content: '.',
    display: 'block',
    color: '$gray800',
    lineHeight: '0.75rem',
  },

  'tbody td': {
    boxSizing: 'border-box',
  }
});

export const CalendarDay = styled('button', {
  all: 'unset',
  width: '100%',
  cursor: 'pointer',
  aspectRatio: '1/1',
  textAlign: 'center',
  borderRadius: '$sm',
  background: '$gray600',

  '&:disabled': {
    opacity: 0.4,
    cursor: 'default',
    background: 'none',
  },
  
  '&:not(:disabled):hover': {
    background:'$gray500',
  },

  '&:focus': {
    boxShadow:'0 0 0 2px $colors$gray100',
  }
});