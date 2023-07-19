import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import Providers from "./Providers";

export const metadata = {
  title: "TATA Motors",
  description:
    "Find Best Car & Limousine From as low as $10 per day with limited time offer discounts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative" suppressHydrationWarning={true}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
