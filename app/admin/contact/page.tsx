import { readContent } from '@/lib/content';
import SectionEditor from '@/components/admin/SectionEditor';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const c = await readContent();
  return (
    <SectionEditor
      section="contact"
      initial={c.contact}
      title="Contact"
      description="Contact section copy and the project-topic dropdown options."
    />
  );
}
