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
    const data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body['access_token']);

    // Tu playlist específica
    const playlistId = '2lk45v8v1wBksvfiqZzC8x';

    try {
      const playlist = await spotifyApi.getPlaylist(playlistId);
      const tracks = await spotifyApi.getPlaylistTracks(playlistId, {
        limit: 10 // Obtenemos más tracks para mostrar
      });

      const playlistData = {
        id: playlist.body.id,
        name: playlist.body.name,
        description: playlist.body.description,
        imageUrl: playlist.body.images[0]?.url,
        trackCount: playlist.body.tracks.total,
        tracks: tracks.body.items.map(item => ({
          name: item.track?.name || 'Unknown Track',
          artist: item.track?.artists[0].name || 'Unknown Artist',
          albumArt: item.track?.album.images[0]?.url,
          url: item.track?.external_urls.spotify
        })),
        url: playlist.body.external_urls.spotify
      };

      return NextResponse.json([playlistData]);
    } catch (playlistError: any) {
      console.error('Error fetching specific playlist:', playlistError?.body || playlistError);
      return NextResponse.json(
        { 
          error: 'Failed to fetch playlist', 
          details: playlistError?.body?.error?.message || playlistError.message,
          playlistId: playlistId 
        },
        { status: playlistError?.body?.error?.status || 500 }
      );
    }
  } catch (error: any) {
    console.error('Error refreshing token:', error?.body || error);
    return NextResponse.json(
      { 
        error: 'Failed to refresh access token', 
        details: error?.body?.error?.message || error.message 
      },
      { status: error?.body?.error?.status || 500 }
    );
  }
}
