import { Box, styled } from "@ignite-ui/react";

export const Form = styled(Box, {
  gap: '$2',
  padding: '$4',
  display: 'grid',
  marginTop: '$4',
  gridTemplateColumns: '1fr auto',
  
  '@media(max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
});