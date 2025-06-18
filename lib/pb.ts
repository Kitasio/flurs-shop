// Pocketbase client
import PocketBase from 'pocketbase';
import { Poster } from '@/types/poster';

const pb = new PocketBase('https://flurs-shop-pb.fly.dev');

const SUPERUSER_EMAIL = process.env.SUPERUSER_EMAIL;
const SUPERUSER_PASS = process.env.SUPERUSER_PASS;

if (!SUPERUSER_EMAIL || !SUPERUSER_PASS) {
  throw new Error('Missing Superuser credentials.');
}

await pb.collection('_superusers').authWithPassword(SUPERUSER_EMAIL, SUPERUSER_PASS, {
  // This will trigger auto refresh or auto reauthentication in case
  // the token has expired or is going to expire in the next 30 minutes.
  autoRefreshThreshold: 30 * 60
})

export async function listAllPosters (): Promise<Poster[]> {
  const records = await pb.collection('posters').getFullList<Poster>();
  return records;
}
