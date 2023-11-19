import '~frontend/styles/index.css';
import { Global } from './layout/global';
import Header from './layout/Header';

export const metadata = {
  title: 'Nano',
  description: 'the fantastic application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="max-h-100dvh overflow-hidden md:bg-zinc-400">
        <Header />
        <main className="mx-auto max-w-5xl">{children}</main>
        <Global />
      </body>
    </html>
  );
}
