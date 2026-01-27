import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/navbars/Navbar";

export default function memberLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 z-100 w-full">
        <Navbar/>
      </div>
      <img className="h-20 w-full  object-cover" src="/img/Car_bg3.svg"/>
      <div className="bg-[#5A574F] relative">
        {children}
      </div>
      <Footer/>
    </div>
  )
}