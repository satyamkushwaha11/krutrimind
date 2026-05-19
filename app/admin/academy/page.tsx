import { readContent } from '@/lib/content';
import SectionEditor from '@/components/admin/SectionEditor';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const c = await readContent();
  return (
    <SectionEditor
      section="academy"
      initial={c.academy}
      title="Academy (Coming soon)"
      description="Future courses + waitlist copy. Add/remove items freely."
    />
  );
}
