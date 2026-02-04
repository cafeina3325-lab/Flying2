"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
    { label: "Genre", href: "/genre" }, // Redirects to genre section logic usually, but here we link page
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
];

export default function NavBar() {
    const pathname = usePathname();

    return (
        <nav
            className="fixed top-0 right-0 w-[60%] lg:w-[50%] h-24 z-[9990] hidden md:flex items-center justify-end pr-8 pointer-events-none"
            style={{
                background: `linear-gradient(to right, 
                    rgba(11, 20, 17, 0) 0%, 
                    rgba(11, 20, 17, 0.3) 30%, 
                    rgba(11, 20, 17, 0.5) 50%, 
                    rgba(11, 20, 17, 0.55) 55%, 
                    rgba(11, 20, 17, 0.70) 100%
                )`
            }}
        >
            {/* 
              Pointer Events: 
              Container is pointer-events-none to let clicks pass through the transparent part (left side).
              Inner content must be pointer-events-auto.
            */}
            <ul className="flex items-center gap-8 pointer-events-auto">
                {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <li key={link.label}>
                            <Link
                                href={link.href}
                                className={`text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 ${isActive
                                    ? "text-gold-antique"
                                    : "text-white-dim hover:text-white-main"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
