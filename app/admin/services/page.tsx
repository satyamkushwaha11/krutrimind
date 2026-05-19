import { readContent } from '@/lib/content';
import SectionEditor from '@/components/admin/SectionEditor';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const c = await readContent();
  return (
    <SectionEditor
      section="services"
      initial={c.services}
      title="Services"
      description="The four offering cards. Use icon: web | mobile | code | agent. Set featured: true to highlight one."
    />
  );
}
