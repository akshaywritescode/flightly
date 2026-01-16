let cachedToken: string | null = null;
let tokenExpiry = 0;

export async function getAmadeusToken() {
  //don't create, if didn't expire
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const res = await fetch(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_API_KEY!,
        client_secret: process.env.AMADEUS_API_SECRET!,
      }),
    }
  );

  const data = await res.json();

  cachedToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000;

  return cachedToken;
}
