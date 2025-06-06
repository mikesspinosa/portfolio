import { NextResponse } from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.json({ error: `Authorization failed: ${error}` }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: 'No authorization code provided' }, { status: 400 });
  }

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const accessToken = data.body['access_token'];
    const refreshToken = data.body['refresh_token'];

    // Return an HTML page that displays the refresh token
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Spotify Authorization Success</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              max-width: 800px;
              margin: 40px auto;
              padding: 20px;
              line-height: 1.6;
            }
            .token-box {
              background: #f5f5f5;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              word-break: break-all;
            }
            .copy-button {
              background: #1DB954;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 4px;
              cursor: pointer;
            }
            .copy-button:hover {
              background: #1ed760;
            }
          </style>
        </head>
        <body>
          <h1>🎉 Authorization Successful!</h1>
          <p>Your Spotify refresh token has been generated successfully. Copy this token and add it to your Vercel environment variables as <code>SPOTIFY_REFRESH_TOKEN</code>:</p>
          
          <div class="token-box">
            <strong>Refresh Token:</strong><br>
            <code id="refreshToken">${refreshToken}</code>
          </div>

          <button class="copy-button" onclick="copyToken()">Copy Refresh Token</button>

          <script>
            function copyToken() {
              const token = document.getElementById('refreshToken').textContent;
              navigator.clipboard.writeText(token);
              alert('Refresh token copied to clipboard!');
            }
          </script>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Error getting tokens:', error);
    return NextResponse.json(
      { error: 'Failed to get tokens' },
      { status: 500 }
    );
  }
}
