import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { AuthError, ConnecItem, ConnectBox, ProfileImg } from "./styles";
import { signIn, useSession } from "next-auth/react";
import { ArrowRight } from "phosphor-react";
import { Container, Header } from "../styles";
import { useRouter } from "next/router";
import Image from 'next/image';

export default function Register() {
  const session = useSession(); // contem as informações do usuário
  const sessionUserData = session.data;

  const router = useRouter();
  const hasAuthError = !!router.query.error;

  const isSignedIn = session.status === "authenticated";

  const handleConnectCalendar = async () => await signIn('google');

  return (
    <Container>
      <Header>
        <Heading as='strong'>
          Conecte sua agenda!
        </Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas ocupadas
          e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />

      </Header>

      <ConnectBox>

        <ConnecItem>
          <div>
            <Text>{sessionUserData?.user?.name}</Text>
            <Text size={"xs"}>{sessionUserData?.user?.email}</Text>
          </div>
          {isSignedIn ? (
            <ProfileImg>
              <Image
                src={sessionUserData?.user?.image ?? ''}
                width={50}
                height={50} /* Altura máxima que a imagem vai esticar */
                quality={100} /* Por padrão o next reduz a qualidade para 80% então voltei para 100% */
                priority /* Assim terá prioridade no carregamento não sendo o ultimo elemento a carregar */
                alt='Calendário simbolizando aplicação em funcionamento' />
            </ProfileImg>
          ) : (
            <Button
              variant='secondary'
              size='sm'
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}

        </ConnecItem>

        {hasAuthError && (
          <AuthError size='sm'>
            Falha ao se conectar ao Google, verifique se você habilitou
            a permissão de acesso ao Google Calendar.
          </AuthError>
        )}

        <Button type="submit" disabled={!isSignedIn}>
          Próximo passo
          <ArrowRight />
        </Button>

      </ConnectBox>

    </Container>
  );
};