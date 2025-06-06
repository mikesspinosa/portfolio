import React from 'react';
import Image from 'next/image';

// Interfaz para la estructura de un track de Spotify
interface SpotifyTrack {
  name: string;
  artist: string;
  albumArt?: string;
  url?: string;
}

// Interfaz para la estructura de una playlist de Spotify
interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  trackCount: number;
  tracks: SpotifyTrack[];
  url: string;
}

// Props que recibe el componente
interface SpotifyPlaylistsProps {
  playlists: SpotifyPlaylist[];
}

const SpotifyPlaylists: React.FC<SpotifyPlaylistsProps> = ({ playlists }) => {
  const playlist = playlists[0]; // Solo mostramos la primera playlist

  return (
    <div className="rounded-3xl bg-[#1DB954]/90 p-6 text-white shadow-lg h-full flex flex-col">
      <h3 className="mb-6 text-3xl font-bold text-white text-center">
        Mis canciones más escuchadas
      </h3>
      {playlist ? (
        <div className="grid grid-cols-1 gap-4 flex-1">
          <div className="aspect-square w-full bg-white/10 rounded-lg overflow-hidden p-4 flex flex-col items-center">
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
            <h4 className="text-xl font-bold text-center mb-2 px-2">
              {playlist.name}
            </h4>
            <ul className="flex-1 overflow-y-auto w-full space-y-2 px-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
              {playlist.tracks.map((track, index) => (
                <li key={`${track.name}-${index}`} className="flex items-center gap-2">
                  {track.albumArt && (
                    <Image
                      src={track.albumArt}
                      alt={track.name}
                      width={40}
                      height={40}
                      className="rounded-sm"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-tight">
                      {track.name}
                    </span>
                    <span className="text-xs text-white/80 leading-tight">
                      {track.artist}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <a
              href={playlist.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-md bg-white/20 px-4 py-2 text-sm font-semibold transition-colors duration-300 hover:bg-white/30"
            >
              Escuchar en Spotify
            </a>
          </div>
        </div>
      ) : (
        <p>No se encontraron playlists.</p>
      )}
    </div>
  );
};

export default SpotifyPlaylists;
