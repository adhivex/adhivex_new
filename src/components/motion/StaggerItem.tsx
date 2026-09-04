"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { staggerItem } from "./Reveal";

export function StaggerItem({ children }: { children: ReactNode }) {
  return <motion.div variants={staggerItem}>{children}</motion.div>;
}
