import { redirect } from 'next/navigation';

export default function HomePage() {
  // TODO: Get default org from user session
  const defaultOrg = 'default-org';
  redirect(`/org/${defaultOrg}/chat`);
}
