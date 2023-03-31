import { Box, styled, Text } from "@ignite-ui/react";

export const ConnectBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
});

export const ConnecItem = styled('div', {
  display: 'flex',
  padding: '$4 $6',
  marginBottom: '$4',
  borderRadius: '$md',
  alignItems: 'center',
  border: '1px solid $gray600',
  justifyContent: 'space-between',
});

export const ProfileImg = styled('div', {
  display: 'flex',
  borderRadius: "$sm",
  alignItems: "center",
  justifyContent: "center",
  border: '4px solid $ignite500',
});

export const AuthError = styled(Text, {
  color: '#f75a68',
  marginBottom: '$4',
});