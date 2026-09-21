"use client";

import { motion, type Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { FormattedMessage } from "react-intl";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;


export default function MapSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: EASE_OUT, // ✅ FIX
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
      },
    },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.4,
      },
    },
  };

  return (
    <motion.section
      className="pb-20 md:pb-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <div className="site-container">
        <motion.div
          className=""
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="grid overflow-hidden border-white/10 bg-[#111416] p-0 shadow-none md:grid-cols-[1.4fr_.6fr]">
              <div className="relative h-[28rem]">
                <iframe
                  title="Ubicación de Madryn Buceo"
                  className="h-full w-full grayscale-[25%]"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2928.441243190807!2d-65.017134!3d-42.779021!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbe024aaf5130b587%3A0x67d8409a6b02a656!2sMadryn%20Buceo!5e0!3m2!1ses!2sar!4v1747014001371!5m2!1ses!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <CardContent className="flex flex-col justify-center p-8 text-white md:p-10">
                <motion.div
                  className="mb-4"
                  variants={contentVariants}
                >
                  <h2 className="font-display text-4xl font-bold uppercase text-white flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-rojo" />
                    <FormattedMessage id="here" defaultMessage="here" />
                  </h2>
                </motion.div>
                <motion.p
                  className="text-white/55 text-sm leading-7 whitespace-pre-line"
                  variants={contentVariants}
                >
                  <FormattedMessage id="see.you" defaultMessage="About Us" />
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
