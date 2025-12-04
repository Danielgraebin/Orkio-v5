import { ReactNode } from 'react';

export default function OrgLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ orgSlug: string }>;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* TODO: Add navigation sidebar */}
      <div className="container mx-auto py-8">
        {children}
      </div>
    </div>
  );
}
