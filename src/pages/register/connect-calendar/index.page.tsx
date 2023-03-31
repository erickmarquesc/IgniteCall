import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { Container, Header } from "../styles";
import { ArrowRight } from "phosphor-react";
import { ConnecItem, ConnectBox } from "./styles";
import { signIn, useSession } from "next-auth/react";


export default function Register() {
  const session = useSession(); // contem as informações do usuário

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

          <Text>Google Calendar</Text>
          <Button
            variant='secondary'
            size='sm'
            onClick={() => signIn('google')}
          >
            Conectar
            <ArrowRight />
          </Button>

        </ConnecItem>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>

      </ConnectBox>

    </Container>
  );
};