import { readContent } from '@/lib/content';
import SectionEditor from '@/components/admin/SectionEditor';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const c = await readContent();
  return (
    <SectionEditor
      section="approach"
      initial={c.approach}
      title="Approach"
      description="Your process — the 4 steps shown on the homepage."
    />
  );
}
