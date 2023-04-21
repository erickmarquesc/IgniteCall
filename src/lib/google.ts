import { google } from "googleapis";
import { prisma } from "./prisma";
import dayjs from "dayjs";

export async function getGoogleOAuthToken(userId: string) {
  const account = await prisma.account.findFirstOrThrow({
    where: {
      provider: 'google',
      user_id: userId,
    },
  });

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );

  auth.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expiry_date: account.expires_at ? account.expires_at * 1000 : null,
  });

  /* VERIFICAR SE O TOKEN ESTÁ EXPIRADO */
  if (!account.expires_at) { /* CASO Ñ TENHA TOKEN PARA EXPIRAR */
    return auth
  };

  const isTokenExpired = dayjs(account.expires_at * 1000).isBefore(new Date());

  if (isTokenExpired) { /* ATUALIZAR TOKEN */
    const { credentials } = await auth.refreshAccessToken();
    const {
      refresh_token,
      access_token,
      expiry_date,
      token_type,
      id_token,
      scope,
    } = credentials;

    await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        expires_at: expiry_date ? Math.floor(expiry_date / 1000) : null,
        refresh_token,
        access_token,
        token_type,
        id_token,
        scope,
      },
    });

    auth.setCredentials({
      refresh_token,
      access_token,
      expiry_date,
    });
  };

  return auth;
};