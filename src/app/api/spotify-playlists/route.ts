import { NextResponse } from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN
});

// ID de tu playlist principal
const MAIN_PLAYLIST_ID = '2lk45v8v1wBksvfiqZzC8x';

export async function GET() {
  try {
    const data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body['access_token']);

    // Obtener la playlist principal
    const playlist = await spotifyApi.getPlaylist(MAIN_PLAYLIST_ID);
    const tracks = await spotifyApi.getPlaylistTracks(MAIN_PLAYLIST_ID, {
      limit: 1
    });

    const playlistData = {
      id: playlist.body.id,
      name: playlist.body.name,
      description: playlist.body.description,
      imageUrl: playlist.body.images[0]?.url,
      trackCount: playlist.body.tracks.total,
      firstTrack: tracks.body.items[0]?.track?.name || 'No tracks',
      firstTrackArtist: tracks.body.items[0]?.track?.artists[0].name || 'Unknown artist',
      url: playlist.body.external_urls.spotify
    };

    // Devolver la playlist como un array de un elemento para mantener la compatibilidad
    return NextResponse.json([playlistData]);
  } catch (error: any) {
    console.error('Error fetching Spotify playlist:', error?.body || error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch Spotify playlist', 
        details: error?.body?.error?.message || error.message,
        status: error?.body?.error?.status || 500
      },
      { status: error?.body?.error?.status || 500 }
    );
  }
}
