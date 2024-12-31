import "./globals.css";
import IsHeader from "./isHeader";

export const metadata = {
    title: "Tripma",
    description: "Flight online booking system",
};

export default function RootLayout({ children }) {
    return (
        <IsHeader>{children}</IsHeader>
    );
}
