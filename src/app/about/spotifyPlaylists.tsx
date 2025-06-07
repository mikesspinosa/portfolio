import { useEffect, useState } from 'react';
import Image from 'next/image';

// Interfaz para la estructura de una playlist de Spotify
interface Track {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  trackCount: number;
  firstTrack: string;
  firstTrackArtist: string;
  url: string;
  isPublic: boolean;
  owner: string;
}

export default function SpotifyPlaylists() {
  const [playlists, setPlaylists] = useState<Track[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('/api/spotify-playlists');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details?.message || 'Failed to fetch playlists');
        }
        const data = await response.json();
        setPlaylists(data);
        setError('');
      } catch (err: any) {
        console.error('Error fetching playlists:', err);
        setError(err.message || 'Failed to load playlists');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading playlists...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">My Spotify Playlists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <a
            key={playlist.id}
            href={playlist.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <div className="relative aspect-square">
              {playlist.imageUrl && (
                <Image
                  src={playlist.imageUrl}
                  alt={playlist.name}
                  fill
                  className="rounded-t-lg object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{playlist.name}</h3>
              {playlist.description && (
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {playlist.description}
                </p>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {playlist.trackCount} tracks
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Created by: {playlist.owner}
              </p>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="font-medium">Now Playing:</p>
                <p className="text-sm">{playlist.firstTrack}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  by {playlist.firstTrackArtist}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
