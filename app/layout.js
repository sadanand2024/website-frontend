// app/layout.js

import { Questrial } from "next/font/google";

import "@fonts/css/switzer.css";
import "./globals.css";
import "@fonts/font-awesome.min.css";
import "@css/plugins/bootstrap-grid.css";
import "@css/plugins/swiper.min.css";
import "@css/plugins/magnific-popup.css";
import Preloader from "@/layouts/Preloader";
import "@css/style.css";

import Page from "./home-2/page";
import Head from "next/head";

const secondary_font = Questrial({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-secondary",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata = {
  title: "Tara Finance ",
  description: "One Stop Solution for all your Financial Needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${secondary_font.variable}`}>
      {/* <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-M7GNMG0ZGE"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-M7GNMG0ZGE');
            `,
          }}
        />
      </Head> */}
      <body>
        {/* <Preloader /> */}
        {children}
      </body>
    </html>
  );
}
