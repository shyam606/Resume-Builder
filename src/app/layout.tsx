import type { Metadata } from "next";
import "./globals.css";
import "antd/dist/reset.css";
import "react-toastify/dist/ReactToastify.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Next.js Resume Builder with Ant Design and Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
