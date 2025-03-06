"use client"
import Image, { StaticImageData } from "next/image";
import React from "react";
import { motion } from "framer-motion";

function SpecialityItem({
    name,
    src,
    ...props
}: {
    name: string;
    src: string | StaticImageData;
}) {
    return (
        <motion.div initial={{
            opacity: 0,
            scale: 0.5,
            y: -100,
        }} whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
        }}
            whileHover={{
                x: [0, -2, 2, -2, 2, -2, 2, 0],
                transition: { duration: 1, repeat: Infinity },
            }}

            {...props} className="flex flex-col items-center gap-4 max-w-30">
            <div className="flex items-center justify-center p-4 rounded-full w-26 h-26 bg-light-gradient dark:bg-dark-gradient dark:border dark:border-t-2 dark:border-slate-500">
                <Image
                    src={src}
                    alt={name}
                    width={100}
                    height={100}
                    className="object-contain w-16 h-16"
                ></Image>
            </div>
            <p className="text-sm text-center text-primaryGray">{name}</p>
        </motion.div>
    );
}

export default SpecialityItem;
