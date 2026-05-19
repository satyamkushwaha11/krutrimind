import { readContent } from '@/lib/content';
import SectionEditor from '@/components/admin/SectionEditor';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const c = await readContent();
  return (
    <SectionEditor
      section="agents"
      initial={c.agents}
      title="AI Agents"
      description="Section copy and the live agent log demo on the right."
    />
  );
}
