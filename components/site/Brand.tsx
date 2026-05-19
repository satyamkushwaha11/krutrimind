import Image from 'next/image';

export default function Brand({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 28 : 34;
  const textSize = size === 'sm' ? 'text-lg' : 'text-xl';
  return (
    <span className="flex items-center gap-2.5">
      <Image src="/logo-mark.svg" alt="" width={dim} height={dim} priority />
      <span className={`font-extrabold tracking-tight ${textSize}`}>
        <span className="grad-text">krutri</span>
        <span>mind</span>
      </span>
    </span>
  );
}
