import { readContent } from '@/lib/content';
import SectionEditor from '@/components/admin/SectionEditor';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const c = await readContent();
  return (
    <SectionEditor
      section="portfolio"
      initial={c.portfolio}
      title="Portfolio / Work"
      description="Case studies shown on /portfolio and previewed on the homepage. Add/remove items freely; slug must be URL-safe and unique."
    />
  );
}
