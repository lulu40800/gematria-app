import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "גימטריה ערכים מתקדמים",
    description: "כלי מתקדם לחישוב גימטריה פשוטה, מילוי ומילוי דמילוי",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="he" dir="rtl">
            <body>{children}</body>
        </html>
    );
}
