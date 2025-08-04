'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Review {
  id?: string;
  name: string;
  review: string;
  rating: number;
}

export default function Home() {
  const [session, setSession] = useState(null);
  const [query, setQuery] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<Review>({
    name: '',
    review: '',
    rating: 5,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setReviews(data || []);
    };

    fetchReviews();
  }, []);

  const handleLogin = async () => {
    const email = prompt('Enter your email to log in:');
    if (email) {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) alert('Login failed: ' + error.message);
      else alert('Check your email for a magic login link!');
    }
  };

  const handleSubmit = async () => {
    if (!session) {
      alert('You must be signed in to submit a review.');
      return;
    }

    const { data, error } = await supabase.from('reviews').insert([newReview]).select();

    if (error) {
      alert('Error: ' + error.message);
    } else {
      setReviews((prev) => [data[0], ...prev]);
      setNewReview({ name: '', review: '', rating: 5 });
    }
  };

  const filtered = reviews.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-4">🍔 Average Adam's Food Reviews</h1>

      {!session && (
        <div className="text-center">
          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={handleLogin}
          >
            Sign in to submit a review
          </button>
        </div>
      )}

      <input
        type="text"
        placeholder="Search restaurants..."
        className="w-full border rounded px-3 py-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {session && (
        <div>
          <h2 className="text-xl font-semibold">Write a Review</h2>
          <input
            type="text"
            placeholder="Restaurant name"
            className="w-full border rounded px-3 py-2 mt-2"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          />
          <textarea
            placeholder="Your review"
            className="w-full border rounded px-3 py-2 mt-2"
            rows={3}
            value={newReview.review}
            onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
          />
          <input
            type="number"
            min={1}
            max={10}
            placeholder="Rating"
            className="w-full border rounded px-3 py-2 mt-2"
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
            onClick={handleSubmit}
          >
            Submit Review
          </button>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mt-4">Reviews</h2>
        {filtered.length === 0 ? (
          <p className="text-gray-500 mt-2">No reviews yet.</p>
        ) : (
          <ul className="space-y-3 mt-2">
            {filtered.map((r, idx) => (
              <li key={r.id || idx} className="border p-4 rounded bg-white shadow">
                <h3 className="font-bold text-lg">{r.name}</h3>
                <p className="text-sm text-gray-600">{r.review}</p>
                <p className="text-yellow-600 font-semibold mt-1">⭐ {r.rating} / 10</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
