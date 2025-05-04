"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CurtainImage = ({ src, alt, width, height, classname, delay,delay2 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5});

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-lg"
      initial={{ scaleY: 0, transformOrigin: "top" }} // Starts from bottom
      animate={inView ? { scaleY: 1 } : {}} // Grows upward
      transition={{ duration: 0.5, ease: "easeInOut", delay : 0.2 }}
    >
      {/* Image */}
      <Image src={src} alt={alt} width={width} height={height} className={classname} />

      {/* Black Overlay (Removes after pause) */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ height: "100%" }}
        animate={inView ? { height: "0%" } : {}}
        transition={{ duration: 0.5, delay: 1.3, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default CurtainImage;
