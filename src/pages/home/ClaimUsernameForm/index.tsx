import { Button, Text, TextInput } from "@ignite-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FromAnnotation } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
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
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ClaimUsernameFormData>({
    /* Estrutura para validações */
    resolver: zodResolver(claimUsernameFormSchema),
  });

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data);
  };
  
  console.log(errors)
  console.log(isValid)
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
          disabled={!isValid}
        >
          Reservar
          <ArrowRight />
        </Button>

      </Form>
      <FromAnnotation>
        <Text size={'sm'}>
          {errors.username
            ? errors.username.message
            : isValid ? 'Usuário válido' : 'Digite o nome do usuário desejado'
          }
        </Text>
      </FromAnnotation>
    </>
  );
};