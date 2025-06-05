import React from 'react';
import Image from 'next/image';

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

interface SpotifyPlaylistsProps {
  playlists: SpotifyPlaylist[];
}

const SpotifyPlaylists: React.FC<SpotifyPlaylistsProps> = ({ playlists }) => {
  return (
    <div className="rounded-3xl bg-[#1DB954]/20 p-6 pt-12 text-black shadow-lg">
      <h3 className="mb-4 text-2xl font-bold text-[#1DB954]">
        Mis canciones más escuchadas
      </h3>
      <div className="flex flex-col gap-6">
        <iframe
          title="Spotify Embed: Mi Playlist"
          src={`https://open.spotify.com/embed/playlist/2lk45v8v1wBksvfiqZzC8x?utm_source=generator&theme=0`}
          width="100%"
          height="360"
          style={{ minHeight: '360px' }}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
        {playlists.map((playlist) => (
          <a
            key={playlist.id}
            href={playlist.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col rounded-md bg-white/10 p-4 transition-all duration-300 hover:bg-opacity-80"
          >
            <div className="relative mb-4 w-full pb-[100%]">
              <Image
                src={playlist.imageUrl || '/placeholder-playlist.png'}
                alt={`${playlist.name} cover`}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <h4 className="mb-1 truncate text-lg font-semibold">
              {playlist.name}
            </h4>
            <p className="mb-2 line-clamp-2 text-sm text-gray-600">
              Mis canciones más escuchadas
            </p>
            <p className="text-sm text-gray-600">
              {playlist.trackCount} canciones
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SpotifyPlaylists;
