import { readContent } from '@/lib/content';
import SectionEditor from '@/components/admin/SectionEditor';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const c = await readContent();
  return (
    <SectionEditor
      section="testimonials"
      initial={c.testimonials}
      title="Client Reviews"
      description="The horizontal marquee on the homepage. Cards are split into two rows that scroll in opposite directions."
    />
  );
}
