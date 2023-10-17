import '~frontend/styles/index.css';
import { Global } from './layout/Global';

export const metadata = {
  title: 'Nano',
  description: 'the fantastic application',
};

function Header() {
  return <header className="min-h-10 px-4 py-1" />;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="md:bg-zinc-400">
        <Header />
        <main className="mx-auto max-w-5xl content-height">{children}</main>
        <Global />
      </body>
    </html>
  );
}
