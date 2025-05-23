import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/lib/auth";
import Providers from "@/components/layout/providers";
import Header from "@/components/layout/header";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" 
      className={`${inter.className}`}  
      style={{ colorScheme: "light" }}
    >
      <body className="bg-white text-gray-900">
        <Providers session={session}>
          <Header />
          <main className="mt-18">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
