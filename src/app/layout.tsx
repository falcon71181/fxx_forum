import "./globals.css";
import NavBar from "./(components)/NavBar";
import Footer from "./(components)/Footer";
import { ReactNode } from 'react';

export const metadata = {
  title: "FXX",
  description: "FXX Forum",
};


interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-700">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
