import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "K2 AUTO GROUP | Excellence in Motion",
  description: "The premier automotive hub in the US. From certified repairs and DMV assistance to a meticulously curated inventory of new and used vehicles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#ed1c24] selection:text-white">
        {children}
      </body>
    </html>
  );
}
