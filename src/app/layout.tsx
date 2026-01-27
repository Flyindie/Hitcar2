import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import MyProvider from "@/components/MyProvider";
import "./globals.css";


// โหลดฟอนต์ Outfit
const outfit = Outfit({
  subsets: ["latin"],      // เลือก subset ภาษา
  variable: "--font-outfit" // สร้าง CSS variable
});

export const metadata: Metadata = {
  title: "HitCar.com",
  description: "Booking a car",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {

  return (
    <html lang="en">
      <body className={`${outfit.variable} font-outfit antialiased`}>
          <MyProvider>{children}</MyProvider>
      </body>
    </html>
  );
}
