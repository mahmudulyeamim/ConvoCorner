import { Lato  } from "next/font/google";
import "./globals.css";

const manrope = Lato({ subsets: ["latin"], weight : '400' });

export const metadata = {
  title: "ConvoCorner",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
