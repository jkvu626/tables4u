// src/app/layout.tsx
import './globals.css'; // Import global styles
import Header from '../components/Header';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Tables4U',
  description: 'Reservation App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
