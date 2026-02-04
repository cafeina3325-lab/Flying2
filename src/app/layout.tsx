import "./globals.css";
import type { Metadata } from "next";
import ScrollToTop from "@/components/ScrollToTop";
import MobileMenu from "@/components/MobileMenu";

export const metadata: Metadata = {
  title: "FLYING STUDIO",
  description: "FLYING STUDIO website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
        <ScrollToTop />
        <MobileMenu />
      </body>
    </html>
  );
}
