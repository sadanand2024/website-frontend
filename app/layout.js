import { Questrial } from "next/font/google";
import "@fonts/css/switzer.css";
import "./globals.css";
import "@fonts/font-awesome.min.css";
import "@css/plugins/bootstrap-grid.css";
import "@css/plugins/swiper.min.css";
import "@css/plugins/magnific-popup.css";
import Preloader from "@/layouts/Preloader";
import "@css/style.css";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider
import Head from "next/head";

// Server-side metadata (do not use `use client` with this)
export const metadata = {
  title: "Tara",
  description: "Financial Solution",
};

const secondary_font = Questrial({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-secondary",
  display: "swap",
  adjustFontFallback: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${secondary_font.variable}`}>
      <Head>{/* Metadata is used here */}</Head>
      <body>
        {/* GoogleOAuthProvider is wrapping your app to provide Google login functionality */}
        <GoogleOAuthProvider clientId="<your_google_client_id_here>">
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
