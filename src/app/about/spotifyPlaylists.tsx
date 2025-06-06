import React from 'react';
import Image from 'next/image';

// Interfaz para la estructura de una playlist de Spotify
interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  trackCount: number;
  tracks?: {
    name: string;
    artist: string;
    albumArt: string;
    url: string;
  }[];
  url: string;
}

// Props que recibe el componente
interface SpotifyPlaylistsProps {
  playlists: SpotifyPlaylist[];
}

const SpotifyPlaylists: React.FC<SpotifyPlaylistsProps> = ({ playlists }) => {
  return (
    <div className="rounded-3xl bg-[#1DB954]/90 p-6 text-white shadow-lg h-full flex flex-col">
      <h3 className="mb-6 text-3xl font-bold text-white text-center">
        Mis canciones más escuchadas
      </h3>
      <div className="grid grid-cols-1 gap-4 flex-1">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="w-full rounded-lg overflow-hidden bg-white/10 p-6 flex flex-col items-center">
            <div className="relative aspect-square w-full max-w-xs mb-4">
              <Image
                src={playlist.imageUrl || '/placeholder-playlist.png'}
                alt={`Portada de ${playlist.name}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-xl"
                priority
              />
            </div>
            <h4 className="text-xl font-bold text-center mb-2">
              {playlist.name}
            </h4>
            <p className="text-sm text-center mb-4 opacity-80">
              {playlist.description || 'Playlist personalizada'}
            </p>

            {playlist.tracks && (
              <ul className="w-full space-y-2 max-h-72 overflow-y-auto pr-2">
                {playlist.tracks.map((track, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <div className="relative h-10 w-10 flex-shrink-0">
                      {track.albumArt ? (
                        <Image
                          src={track.albumArt}
                          alt={track.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-gray-500 rounded" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {track.name}
                      </p>
                      <p className="text-xs opacity-70 truncate">
                        {track.artist}
                      </p>
                    </div>
                    <a
                      href={track.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#1DB954] hover:underline whitespace-nowrap"
                    >
                      Ver en Spotify
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <p className="text-base text-white/90 text-center mt-10">
        Mi gusto musical refleja mi personalidad ecléctica: desde el hip-hop alternativo de Travis Scott y Gorillaz hasta la electrónica experimental. Me apasiona especialmente la música que fusiona géneros y rompe barreras convencionales, siempre buscando sonidos innovadores que inspiren mi creatividad en el desarrollo.
      </p>
    </div>
  );
};

export default SpotifyPlaylists;
