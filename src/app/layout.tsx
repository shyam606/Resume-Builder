import type { Metadata } from "next";
import "./globals.css";
import "antd/dist/reset.css";
import 'react-toastify/dist/ReactToastify.css';
import { ResumeProvider } from "../context/ResumeContext";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/context/ThemeContext";

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
      <body>
        <ThemeProvider>
          <ResumeProvider>{children}</ResumeProvider>
          <ToastContainer closeOnClick={true} autoClose={2000} stacked />
        </ThemeProvider>
      </body>
    </html>
  );
}
