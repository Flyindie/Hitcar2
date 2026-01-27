import Footer from "@/components/ui/Footer";

export default function bookingLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  // ใส่ footer ให้ทุกหน้า
  return (
    <div>
        {children}
        <Footer/>
    </div>
  );
}