"use client";

import { ResumeProvider } from "@/context/ResumeContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastContainer } from "react-toastify";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ResumeProvider>
        {children}
        <ToastContainer closeOnClick autoClose={2000} stacked />
      </ResumeProvider>
    </ThemeProvider>
  );
}
