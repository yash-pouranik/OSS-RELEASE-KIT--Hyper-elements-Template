import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OSS Release Kit — Write once. Publish everywhere.',
  description: 'Turn a single release definition into an Email, Web Page, PDF Migration Guide, and Social Canvas graphic using Hyper Elements.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#09090b] text-[#f4f4f5] antialiased">
        {children}
      </body>
    </html>
  );
}
