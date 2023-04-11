import { Button, Text, TextInput } from "@ignite-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormAnnotation } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { z } from "zod";

/* Essa constante uzando o zod 
 * cria a estrutura dos dados do formulário e validações
 */
const claimUsernameFormSchema = z.object({
  username: z.string()
    .min(6, { message: 'O usuário deve ter pelomenos 6 caracteres' })/* Minimo de caracteres */
    .regex(/^([a-z\\-]+)$/i, { message: 'Só é permitido letras e hifens' }) /* permite que comece com qualquer letra, permite infen e pode repetir */
    .transform((username) => username.toLowerCase()),/* Joga tudo para minusculo */
});

/* Converte a estrutura do zod para o TypeScript */
type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<ClaimUsernameFormData>({
    /* Estrutura para validações */
    resolver: zodResolver(claimUsernameFormSchema),
  });

  const router = useRouter(); // redirecionar o usuário

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data;

    await router.push(`/register?username=${username}`);
    /* isso faz com que o usuário seja redirecionado a sintaxe é
     * /paginaQueVouMandarOusuario
     * o simbulo de ? é para indicar que estou mandando um parametro
     * e então envio a variável que desejo */
  };

  return (
    <>
      <Form as='form' onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size={"sm"}
          prefix="ignite.com/"
          placeholder="seu-usuario"
          {...register('username')} /* Identifica o input */
        />
        <Button
          size={"sm"}
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          Reservar
          <ArrowRight />
        </Button>

      </Form>
      <FormAnnotation>
        <Text size={'sm'}>
          {errors.username
            ? errors.username.message
            : isValid ? 'Usuário válido' : 'Digite o nome do usuário desejado'
          }
        </Text>
      </FormAnnotation>
    </>
  );
};