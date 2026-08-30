import { redirect } from 'next/navigation';

export default function GalleryPage() {
  // কেউ /gallery তে ঢুকলে তাকে সরাসরি /gallery/client-meetings পেজে নিয়ে যাবে
  redirect('/gallery/client-meetings');
}