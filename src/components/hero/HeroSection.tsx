"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/MagneticButton";
import { siteConfig } from "@/lib/content";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[92vh] w-full items-center overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,90,0,0.1),transparent_60%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          {siteConfig.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="mt-6 max-w-xl text-lg text-foreground-muted"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <Button asChild size="lg" className="group bg-accent text-white hover:bg-accent/90">
              <Link href="/contact">
                Start a project
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button asChild size="lg" variant="outline" className="border-white/15 bg-transparent hover:bg-white/5">
              <Link href="/work">See our work</Link>
            </Button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
