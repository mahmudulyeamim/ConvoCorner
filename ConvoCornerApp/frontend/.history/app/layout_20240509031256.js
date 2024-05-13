import { Lato  } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const manrope = Lato({ subsets: ["latin"], weight : '400' });

export const metadata = {
  title: "ConvoCorner",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manrope.className}>{children}</body>
      <Toaster />
    </html>
  );
}
