import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'K2 Auto Service | Auto Repair & Car Sales in Garden Grove, CA',
    description:
        "Garden Grove's leading automotive center. K2 Auto Service offers certified auto repair, fast DMV registration, and a premium selection of new and used cars.",
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
