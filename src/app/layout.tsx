import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "FXX",
  description: "FXX Forum",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-700">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
