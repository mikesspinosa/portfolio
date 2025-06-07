import { NextResponse } from 'next/server';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN
});

export async function GET() {
  try {
    // Refresh the access token
    const data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body['access_token']);

    // Verificar que tenemos los tokens necesarios
    if (!process.env.SPOTIFY_REFRESH_TOKEN) {
      throw new Error('Missing SPOTIFY_REFRESH_TOKEN');
    }

    // Lista de IDs de playlists a mostrar
    const playlistIds = [
      '2lk45v8v1wBksvfiqZzC8x', // Tu playlist principal
      '5gxD39PRtgwy8GCGMjB7oE', // Playlist del otro proyecto
      '7uC1v1Juca1fTeng1P9y8Q', // Playlist del otro proyecto
      '1UKWjkEXm2tYZ5R6BqVJR4'  // Playlist del otro proyecto
    ];

    console.log('Fetching playlists:', playlistIds);

    // Obtener todas las playlists
    const playlistsData = await Promise.all(
      playlistIds.map(id => spotifyApi.getPlaylist(id))
    );

    // Procesar cada playlist
    const playlists = await Promise.all(
      playlistsData.map(async (playlist) => {
        console.log('Processing playlist:', playlist.body.name);
        console.log('Is public:', playlist.body.public);
        console.log('Owner:', playlist.body.owner.display_name);

        const tracks = await spotifyApi.getPlaylistTracks(playlist.body.id, {
          limit: 1
        });

        return {
          id: playlist.body.id,
          name: playlist.body.name,
          description: playlist.body.description,
          imageUrl: playlist.body.images[0]?.url,
          trackCount: playlist.body.tracks.total,
          firstTrack: tracks.body.items[0]?.track?.name || 'No tracks',
          firstTrackArtist: tracks.body.items[0]?.track?.artists[0].name || 'Unknown artist',
          url: playlist.body.external_urls.spotify,
          isPublic: playlist.body.public,
          owner: playlist.body.owner.display_name
        };
      })
    );

    return NextResponse.json(playlists);
  } catch (error: any) {
    console.error('Error fetching Spotify playlists:', error?.body || error);
    
    // Intentar obtener información más detallada del error
    const errorDetails = {
      message: error?.body?.error?.message || error.message,
      status: error?.body?.error?.status || 500,
      reason: error?.body?.error?.reason || 'Unknown error',
      stack: error.stack
    };

    console.error('Error details:', errorDetails);

    return NextResponse.json(
      { 
        error: 'Failed to fetch Spotify playlists', 
        details: errorDetails
      },
      { status: errorDetails.status }
    );
  }
}
