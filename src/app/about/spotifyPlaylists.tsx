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
    <div className="rounded-3xl bg-[#1DB954]/90 p-6 text-white shadow-lg h-full flex flex-col">
      <h3 className="mb-6 text-3xl font-bold text-white text-center">
        Mis canciones más escuchadas
      </h3>
      <div className="grid grid-cols-1 gap-4 flex-1">
        <div className="aspect-square w-full bg-white/10 rounded-lg overflow-hidden">
          <iframe
            title="Mi Playlist de Spotify"
            src={`https://open.spotify.com/embed/playlist/2lk45v8v1wBksvfiqZzC8x?utm_source=generator&theme=0`}
            width="100%"
            height="100%"
            style={{ minHeight: '100%' }}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
        <div className="aspect-square w-full bg-white/10 rounded-lg p-6">
          {playlists.map((playlist) => (
            <a
              key={playlist.id}
              href={playlist.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center rounded-md bg-white/20 p-4 transition-all duration-300 hover:bg-white/30 h-full w-full mb-12"
            >
              <div className="relative aspect-square w-full max-w-md mb-8">
                <Image
                  src={playlist.imageUrl || '/placeholder-playlist.png'}
                  alt={`Portada de ${playlist.name}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-xl"
                  priority
                />
              </div>
              <div className="flex flex-col items-center w-full">
                <h4 className="text-xl font-bold text-white mb-2">
                  {playlist.name}
                </h4>
              </div>
            </a>
          ))}
          <p className="text-base text-white/90 text-center mt-20">
            Mi gusto musical refleja mi personalidad ecléctica: desde el hip-hop alternativo de Travis Scott y Gorillaz hasta la electrónica experimental. Me apasiona especialmente la música que fusiona géneros y rompe barreras convencionales, siempre buscando sonidos innovadores que inspiren mi creatividad en el desarrollo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlaylists;
