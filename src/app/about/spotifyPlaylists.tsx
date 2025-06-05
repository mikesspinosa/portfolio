import React from 'react';
import Image from 'next/image';

// Interfaz para la estructura de una playlist de Spotify
interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  trackCount: number;
  firstTrack: string;
  firstTrackArtist: string;
  url: string;
}

// Props que recibe el componente
interface SpotifyPlaylistsProps {
  playlists: SpotifyPlaylist[];
}

const SpotifyPlaylists: React.FC<SpotifyPlaylistsProps> = ({ playlists }) => {
  return (
    <div className="rounded-3xl bg-[#1DB954]/90 p-6 pt-8 text-white shadow-lg h-full">
      <h3 className="mb-6 text-2xl font-bold text-white text-center">
        Mis canciones más escuchadas
      </h3>
      <div className="flex flex-col gap-6 h-full">
        <div className="w-full" style={{ height: '450px' }}>
          <iframe
            title="Spotify Embed: Mi Playlist"
            src={`https://open.spotify.com/embed/playlist/2lk45v8v1wBksvfiqZzC8x?utm_source=generator&theme=0`}
            width="100%"
            height="100%"
            style={{ minHeight: '100%' }}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {playlists.map((playlist) => (
            <a
              key={playlist.id}
              href={playlist.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col rounded-md bg-white/20 p-4 transition-all duration-300 hover:bg-white/30"
            >
              <div className="relative mb-3 aspect-square w-full">
                <Image
                  src={playlist.imageUrl || '/placeholder-playlist.png'}
                  alt={`${playlist.name} cover`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <h4 className="truncate text-base font-semibold text-white">
                {playlist.name}
              </h4>
              <p className="truncate text-sm text-white/80">
                Mis canciones más escuchadas
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlaylists;
