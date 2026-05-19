'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get('next') || '/admin';
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    if (!res.ok) {
      setErr('Invalid credentials.');
      return;
    }
    router.replace(next);
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="absolute inset-0 -z-10 bg-grid opacity-50" />
      <div className="w-full max-w-[400px]">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Image src="/logo-mark.svg" alt="" width={48} height={48} />
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="grad-text">krutri</span>mind admin
          </h1>
          <p className="text-sm text-text-dim">Sign in to manage site content</p>
        </div>

        <form
          onSubmit={submit}
          className="grid gap-4 rounded-2xl border border-border-strong bg-surface p-6"
        >
          <label className="grid gap-1.5">
            <span className="label-base">Username</span>
            <input
              className="input-base"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label className="grid gap-1.5">
            <span className="label-base">Password</span>
            <input
              type="password"
              className="input-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {err && <p className="text-[13px] text-red-400">{err}</p>}
          <button type="submit" disabled={loading} className="btn btn-primary mt-1">
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
          <p className="text-[12px] text-text-faint text-center mt-2">
            Default dev creds: <code className="font-mono">admin / krutri@2026</code> · change them in
            <code className="font-mono"> .env.local</code>
          </p>
        </form>
      </div>
    </div>
  );
}
