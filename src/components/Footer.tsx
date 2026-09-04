import Link from "next/link";
import { Logo } from "@/components/Logo";
import { navItems, siteConfig } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm text-foreground-muted">{siteConfig.description}</p>
        </div>

        <div className="flex gap-16">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-foreground">Site</span>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-foreground-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-foreground">Connect</span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              Twitter / X
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-white/5 px-6 py-6 text-xs text-foreground-muted">
        <span>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
      </div>
    </footer>
  );
}
