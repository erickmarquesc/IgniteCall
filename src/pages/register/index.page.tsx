import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Form, FormError, Header } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { z } from "zod";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

const registerFormSchema = z.object({
  username: z.string()
    .min(6, { message: 'O usuário deve ter pelomenos 6 caracteres' })/* Minimo de caracteres */
    .regex(/^([a-z\\-]+)$/i, { message: 'Só é permitido letras e hifens' }) /* permite que comece com qualquer letra, permite infen e pode repetir */
    .transform((username) => username.toLowerCase()),/* Joga tudo para minusculo */
  name: z.string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 caracteres' })
    .regex(/^([a-z\\ ]+)$/i, { message: 'Só é permitido letras' })/* foi necessário por um espaço depois das \\ para validar o espaço entre nomes */
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const { register, handleSubmit, setValue, formState: { errors, isValid, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter(); // serve para pegar o corpo da requisição tbm
  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue]);

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      await router.push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message);
      };
    };
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

        <MultiStep size={4} currentStep={1} />

        <Form as='form' onSubmit={handleSubmit(handleRegister)} >
          <label>
            <Text size='sm'>
              Nome de uauário
            </Text>
            <TextInput
              prefix="ignite.com/"
              placeholder="seu-usuario"
              {...register('username')} />

            {errors.username && (
              <FormError size='sm'>
                {errors.username.message}
              </FormError>
            )}

          </label>

          <label>
            <Text size='sm'>
              Nome completo
            </Text>
            <TextInput
              placeholder="Seu nome"
              {...register('name')} />

            {errors.name && (
              <FormError size='sm'>
                {errors.name.message}
              </FormError>
            )}

          </label>

          <Button type="submit" disabled={!isValid || isSubmitting}>
            Próximo passo
            <ArrowRight />
          </Button>
        </Form>

      </Header>
    </Container>
  );
};