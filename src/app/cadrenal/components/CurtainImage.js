"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const CurtainImage = ({ src, alt, width, height, classname }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg"
      initial={{ scaleY: 0, transformOrigin: "top" }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
    >
      {/* Image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={classname}
      />

      {/* Black Curtain Overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ height: "100%" }}
        whileInView={{ height: "0%" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 1.3, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default CurtainImage;
