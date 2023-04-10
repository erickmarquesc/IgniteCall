import { Avatar, Button, Heading, MultiStep, Text, TextArea, TextInput } from "@ignite-ui/react";
import { Container, Form, FormError, Header } from "../styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AvatarContainer, FormAnnotation, ProfileBox } from "./styles";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { buildNextAuthOptions } from "@/pages/api/auth/[...nextauth].api";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";

const updateProfileSchema = z.object({
  bio: z.string(),
});

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export default function Register() {
  const session = useSession();
  const router = useRouter();

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  });

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/users/profile', {
      bio: data.bio,
    });

    await router.push(`/schedule/${session.data?.user.username}`);
  };

  return (
    <Container>
      <Header>
        <Heading as='strong'>
          Bem-vindo ao Ignite Call!
        </Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil!
          Ah, você pode editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={4} />

        <ProfileBox as='form' onSubmit={handleSubmit(handleUpdateProfile)} >
          <AvatarContainer>
            <Avatar
              src={session.data?.user.avatar_url}
              alt={session.data?.user.username}
            />
            <Text>
              {session.data?.user.username}
            </Text>
          </AvatarContainer>

          <label>
            <Text size='sm'>
              Sobre você
            </Text>
            <TextArea
              placeholder="Descreva-se de forma amigável e convidativa."
              {...register('bio')} />
            <FormAnnotation size='sm'>
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </FormAnnotation>
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Finalizar
            <ArrowRight />
          </Button>
        </ProfileBox>

      </Header>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, buildNextAuthOptions(req, res));

  return {
    props: {
      session,
    }
  }
};