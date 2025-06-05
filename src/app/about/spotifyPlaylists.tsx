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
    <div className="rounded-3xl bg-[#1DB954]/90 p-6 text-white shadow-lg">
      <h3 className="mb-4 text-xl font-bold text-white text-center">
        Mis canciones más escuchadas
      </h3>
      <div className="flex flex-col gap-4">
        <div className="w-full" style={{ height: '300px' }}>
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
        {playlists.map((playlist) => (
          <a
            key={playlist.id}
            href={playlist.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-md bg-white/20 p-3 transition-all duration-300 hover:bg-white/30"
          >
            <div className="relative h-12 w-12 flex-shrink-0">
              <Image
                src={playlist.imageUrl || '/placeholder-playlist.png'}
                alt={`${playlist.name} cover`}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="truncate text-base font-semibold text-white">
                {playlist.name}
              </h4>
              <p className="truncate text-sm text-white/80">
                Mis canciones más escuchadas
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SpotifyPlaylists;
