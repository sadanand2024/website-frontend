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
import { ThemeProvider } from "@mui/material/styles";
import theme from "../components/theme";

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
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Parkinsans:wght@300..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        {/* Metadata is used here */}
      </Head>
      <body>
        {/* GoogleOAuthProvider is wrapping your app to provide Google login functionality */}
        {/* <GoogleOAuthProvider clientId="<your_google_client_id_here>"> */}
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
        {/* </GoogleOAuthProvider> */}
      </body>
    </html>
  );
}
