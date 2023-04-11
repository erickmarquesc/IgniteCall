import { Avatar, Heading, Text } from "@ignite-ui/react";
import { Container, UserHeader } from "./styles";
import { GetStaticPaths, GetStaticProps } from "next";
import { prisma } from "@/lib/prisma";

interface IScheduleProps {
  user: {
    name: string;
    bio: string;
    avatarURL: string;
  },
};

export default function Schedule({ user }: IScheduleProps) {
  return (
    <Container>
      <UserHeader>
        <Avatar src={user.avatarURL} />
        <Heading>{user.name}</Heading>
        <Text>{user.bio}</Text>
      </UserHeader>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username);
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) { return { notFound: true, } };

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url
      },
    },
    revalidate: 60 * 60 * 24, // 1day
  };
};