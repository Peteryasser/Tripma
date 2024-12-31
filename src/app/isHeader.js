"use client"

import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";
import { usePathname } from "next/navigation";

export default function IsHeader({ children }) {
    const pathname = usePathname();
    
    if(pathname != "/seats" ){
        return (
            <html lang="en">
                <body>
                    <Header />
                    <main className={'main'}>
                        {children}
                    </main>
                    <Footer />
                </body>
            </html>
        );
    }
    else{
        return (
            <html lang="en">
                <body>
                    <main className={'main'}>
                        {children}
                    </main>
                </body>
            </html>
        );
     }
}
