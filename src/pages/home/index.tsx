import { Heading, Text } from '@ignite-ui/react';
import { Container, Hero, Preview } from './styled';

/* Estrutura de imagem para next */
import Image from 'next/image';
import previewImg from '../../assets/previewAppImg.png';
import { ClaimUsernameForm } from './ClaimUsernameForm';
import { NextSeo } from 'next-seo';

/* Quando usamos imagens estruturas (imagens/assets),
 * é importante que no Next seja utilizado um compornente do next/image,
 * esse compornente ajuda a renderizar a imagem otimizando-a,
 */
export default function Home() {
  return (
    <>
      <NextSeo
        title='Descomplique sua agenda | Ignite Call'
        description='Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.'
      />
      
      <Container>
        <Hero>
          <Heading>Agendamento descomplicado</Heading>
          <Text>
            Conecte seu calendário e permita que as
            pessoas marquem agendamentos no seu tempo livre.
          </Text>
          <ClaimUsernameForm />
        </Hero>
        <Preview>
          <Image
            src={previewImg}
            height={400} /* Altura máxima que a imagem vai esticar */
            quality={100} /* Por padrão o next reduz a qualidade para 80% então voltei para 100% */
            priority /* Assim terá prioridade no carregamento não sendo o ultimo elemento a carregar */
            alt='Calendário simbolizando aplicação em funcionamento'
          />
        </Preview>
      </Container>
    </>
  );
};
