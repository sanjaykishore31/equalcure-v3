export default function ReferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12">
      <div className="container max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Refer a Patient for Hepatitis C Treatment
        </h1>
        {children}
      </div>
    </div>
  );
} 