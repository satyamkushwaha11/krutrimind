import { readContent } from '@/lib/content';
import SectionEditor from '@/components/admin/SectionEditor';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const c = await readContent();
  return (
    <SectionEditor
      section="site"
      initial={c.site}
      title="Site & SEO"
      description="Company identity, meta tags, keywords, and social profiles. Drives every page's SEO."
    />
  );
}
