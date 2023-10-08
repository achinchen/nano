import '~frontend/styles/index.css';
import { Global } from './global';

export const metadata = {
  title: 'Nano',
  description: 'the fantastic application',
};

function Header() {
  return <header className="h-10 px-4 py-1" />;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Global />
      </body>
    </html>
  );
}
