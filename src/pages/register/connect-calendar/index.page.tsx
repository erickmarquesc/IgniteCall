import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { AuthError, ConnecItem, ConnectBox } from "./styles";
import { signIn, useSession } from "next-auth/react";
import { ArrowRight, Check } from "phosphor-react";
import { Container, Header } from "../styles";
import { useRouter } from "next/router";

export default function Register() {
  const session = useSession(); // contem as informações do usuário
  const sessionUserData = session.data;

  const router = useRouter();
  const hasAuthError = !!router.query.error;

  const isSignedId = session.status === "authenticated";

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
            <Text>
              {sessionUserData?.user?.name
                ? sessionUserData?.user?.name
                : 'Google Agenda'}
            </Text>
            {sessionUserData?.user?.email
              ? <Text size={"xs"}>{sessionUserData?.user?.email}</Text>
              : <></>
            }
          </div>

          {isSignedId ? (
            <Button size="sm" disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
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

        <Button type="submit" disabled={!isSignedId}>
          Próximo passo
          <ArrowRight />
        </Button>

      </ConnectBox>
    </Container>
  );
};