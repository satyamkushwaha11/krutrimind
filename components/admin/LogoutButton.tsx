'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.replace('/admin/login');
        router.refresh();
      }}
      className="w-full text-left rounded-lg px-3 py-2 text-sm text-text-dim hover:bg-surface hover:text-text"
    >
      Sign out
    </button>
  );
}
