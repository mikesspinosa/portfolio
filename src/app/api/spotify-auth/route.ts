// src/app/api/spotify-auth/route.ts

import { NextResponse } from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

export async function GET() {
  const scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-top-read',
    'user-library-read'
  ];
  const state = 'spotify-auth-' + Date.now();
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

  return NextResponse.redirect(authorizeURL);
}
