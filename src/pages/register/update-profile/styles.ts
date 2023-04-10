import { Box, Text, styled } from "@ignite-ui/react";

export const ProfileBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  }
});

export const AvatarContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

export const FormAnnotation = styled(Text, {
  color: '$gray200',
});