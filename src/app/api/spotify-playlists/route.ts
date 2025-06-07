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
    // Refresh the access token
    const data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body['access_token']);

    // Verificar que tenemos los tokens necesarios
    if (!process.env.SPOTIFY_REFRESH_TOKEN) {
      throw new Error('Missing SPOTIFY_REFRESH_TOKEN');
    }

    // Intentar obtener la playlist
    console.log('Fetching playlist:', MAIN_PLAYLIST_ID);
    const playlist = await spotifyApi.getPlaylist(MAIN_PLAYLIST_ID);
    
    // Verificar que la playlist existe
    if (!playlist.body) {
      throw new Error('Playlist not found');
    }

    console.log('Playlist found:', playlist.body.name);
    console.log('Is public:', playlist.body.public);
    console.log('Owner:', playlist.body.owner.display_name);

    // Obtener las canciones
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
      url: playlist.body.external_urls.spotify,
      isPublic: playlist.body.public,
      owner: playlist.body.owner.display_name
    };

    // Devolver la playlist como un array de un elemento para mantener la compatibilidad
    return NextResponse.json([playlistData]);
  } catch (error: any) {
    console.error('Error fetching Spotify playlist:', error?.body || error);
    
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
        error: 'Failed to fetch Spotify playlist', 
        details: errorDetails
      },
      { status: errorDetails.status }
    );
  }
}
