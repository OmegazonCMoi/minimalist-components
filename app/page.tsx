"use client";

import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/button";
import SignatureLogo from "@/components/site/signature-logo";
import SiteNavbar from "@/components/site/navbar";
import { ArrowRightIcon } from "lucide-react";

const APPLE_EASE = [0.16, 1, 0.3, 1] as const;

export default function Home() {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#080808] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-8%,rgba(255,255,255,0.05),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="relative z-10">
        <SiteNavbar
          onDarkSurface
          className="border-transparent bg-transparent backdrop-blur-0 [&_a]:text-zinc-400 [&_a:hover]:text-zinc-100"
        />
      </div>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-24">
        <div className="flex flex-col items-center gap-12">
          <SignatureLogo />

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: reduced ? 0 : 1.75,
              duration: 0.85,
              ease: APPLE_EASE,
            }}
          >
            <Button href="/docs" icon={<ArrowRightIcon className="size-4" />}>
              Discover
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
