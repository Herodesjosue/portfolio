import type { Metadata } from "next";
import "./css/globals.css";
import localFont from "next/font/local";

const matte = localFont({
  src: [
    { path: "../fonts/Matte-Extralight.woff", weight: "200", style: "normal" },
    { path: "../fonts/Matte-Light.woff", weight: "300", style: "normal" },
    { path: "../fonts/Matte-Regular.woff", weight: "400", style: "normal" },
    { path: "../fonts/Matte-Medium.woff", weight: "500", style: "normal" },
  ],
  variable: "--font-matte",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Herodes Dev",
  openGraph: {
    description: "",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${matte.variable} ${matte.className}  bg-dark text-white min-h-screen  sm:overflow-hidden`}>
        {/* <Header /> */}
        {children}
      </body>
    </html>
  );
}
