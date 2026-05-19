import { readContent } from '@/lib/content';
import SectionEditor from '@/components/admin/SectionEditor';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const c = await readContent();
  return (
    <SectionEditor
      section="hero"
      initial={c.hero}
      title="Hero"
      description="The top of the homepage — headline, subtitle, CTAs, and headline stats."
    />
  );
}
