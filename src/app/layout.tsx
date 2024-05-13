import '@/styles/globals.css';

import { Fira_Code } from 'next/font/google';
import { JobSwitcherContainer } from '@/app/_components/job-switcher';

export const metadata = {
  title: 'Looking for jobs',
  description: 'Looking for jobs',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const firaCode = Fira_Code({
  subsets: ['latin'],
});

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${firaCode.className} bg-[#F6EEE3] text-oxford`}
    >
      <body className="min-h-screen">
        <header className="border-b-oxford border py-2">
          <div className="container mx-auto flex gap-4 items-center">
            <h1 className="text-5xl font-bold">LFJ</h1>
            <JobSwitcherContainer />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
