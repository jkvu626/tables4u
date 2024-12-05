// src/app/layout.tsx
import './globals.css'; // Import global styles
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
  title: 'Tables4U',
  description: 'Reservation App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          <Header />
          <Navbar />
          <main>
            {children}
          </main>
        </body>
      </AuthProvider>
    </html>
  );
}
