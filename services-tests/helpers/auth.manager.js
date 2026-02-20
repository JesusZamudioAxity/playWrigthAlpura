let cachedToken = null;
let tokenExpiration = null;

export async function getCachedToken(request) {
  const now = Date.now();

  if (cachedToken && tokenExpiration && now < tokenExpiration) {
    return cachedToken;
  }

  const response = await request.post(
    '/api/identity/connect/token',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        grant_type: 'password',
        scope: 'offline_access',
        client_id: 'ionic',
        client_secret: 'T0k5',
        username: 'demouser@toks.com',
        password: 'ff3cc5464669af1146dfd687c064aceb9b5c0991663b95429f01c665a71157fe'
      }
    }
  );

  if (response.status() !== 200) {
    throw new Error(`Error obteniendo token: ${response.status()}`);
  }

  const body = await response.json();

  if (!body.access_token) {
    throw new Error('No se encontró access_token en la respuesta');
  }

  cachedToken = body.access_token;

  const expiresIn = body.expires_in || 3600;
  tokenExpiration = now + expiresIn * 1000 - 5000;

  return cachedToken;
}