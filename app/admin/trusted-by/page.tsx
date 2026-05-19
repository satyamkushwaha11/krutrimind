import { readContent } from '@/lib/content';
import SectionEditor from '@/components/admin/SectionEditor';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const c = await readContent();
  return (
    <SectionEditor
      section="trustedBy"
      initial={c.trustedBy}
      title="Trusted-by strip"
      description="Logo cloud below the hero. List company names you want shown in the marquee."
    />
  );
}
