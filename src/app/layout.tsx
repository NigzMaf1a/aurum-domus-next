// app/layout.tsx
import './globals.css';
import '../styles/Nigel.styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


//import Footer from '../components/sections/Footer';
import ClientLayoutShell from './ClientLayoutShell';

export const metadata = {
  title: 'Aurum Domus',
  description: 'Luxury redefined ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="d-flex flex-column min-vh-100" id="Site">
        <ClientLayoutShell>{children}</ClientLayoutShell>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
