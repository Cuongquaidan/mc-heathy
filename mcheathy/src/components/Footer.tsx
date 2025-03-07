"use client"
import { motion } from "framer-motion";
import React, { Suspense } from "react";
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialYoutube } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";
import { TiSocialFacebookCircular } from "react-icons/ti";
import FooterSkeleton from "./skeleton/FooterSkeleton";
import Email from "@/public/assets/images/email.svg";
import Phone from "@/public/assets/images/phone.svg";
import Image from "next/image";
function Footer() {
    const text1 = "Dear Valued Customer";
    const text2 = "Thank you for choosing MCHealthy for your healthcare needs. We sincerely appreciate your trust in our services. Our dedicated team strives to provide you with exceptional care and support, ensuring your experience is as comfortable as possible. Your feedback is invaluable to us, and we are committed to continuously improving our services. We look forward to serving you and your loved ones in the future.";
    const text3 = "Wishing you health and happiness,";
    const text4 = "The MCHealthy Team";
    const variantsSocial = {
        scaleAndSpin: {
            scale: [0.9, 1, 0.9, 1],
            rotate: [0, 360],
            transition: {
                duration: 2,
            }
        }
    }
    const variantsContact = {
        ring: {
            y: [0, -5, 0, -5, 0],
            transition: {
                duration: 1,
                repeat: Infinity,
            }
        }
    }
    return (
        <Suspense fallback={<FooterSkeleton></FooterSkeleton>}>
            <motion.div className=" bg-lightBlue dark:bg-black">
                <div className="grid grid-cols-2 gap-20 p-10">
                    <div className="font-bold">
                        {text1.split("").map((char, index) => (
                            <motion.span
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: index * 0.1,
                                }}
                                key={index}
                                className="text-2xl text-textBlue dark:text-darkTextPrimary"
                            >
                                {char}
                            </motion.span>
                        ))}

                        <br></br>
                        {text2.split("").map((char, index) => (
                            <motion.span
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: index * 0.05 + text1.length * 0.1,
                                }}
                                key={index}
                                className="text-md text-textBlue dark:text-darkTextPrimary"
                            >
                                {char}
                            </motion.span>
                        ))}

                        <br></br>
                        {text3.split("").map((char, index) => (
                            <motion.span
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: index * 0.05 + text1.length * 0.1 + text2.length * 0.05,
                                }}
                                key={index}
                                className="text-md text-textBlue dark:text-darkTextPrimary"
                            >
                                {char}
                            </motion.span>
                        ))}
                        <br></br>
                        {text4.split("").map((char, index) => (
                            <motion.span
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: index * 0.05 + text1.length * 0.1 + text2.length * 0.05 + text3.length * 0.05,
                                }}
                                key={index}
                                className="text-md text-textBlue dark:text-darkTextPrimary"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-20 p-10">
                        <div>
                            <p className="text-xl font-bold">Socials</p>
                            <div className="flex items-center gap-5">
                                <motion.div whileHover={"scaleAndSpin"} variants={variantsSocial}> <TiSocialTwitter size={40} className="text-blue-400 bg-white rounded-sm cursor-pointer"></TiSocialTwitter></motion.div>
                                <motion.div whileHover={"scaleAndSpin"} variants={variantsSocial}>                                <TiSocialYoutube size={40} className="text-red-500 bg-white rounded-sm cursor-pointer"></TiSocialYoutube></motion.div>
                                <motion.div whileHover={"scaleAndSpin"} variants={variantsSocial}>   <SlSocialInstagram className="text-white bg-pink-500 p-1 rounded-sm cursor-pointer"
                                    size={40}
                                ></SlSocialInstagram></motion.div>
                                <motion.div whileHover={"scaleAndSpin"} variants={variantsSocial}>   <TiSocialFacebookCircular
                                    size={40}
                                    className="text-white bg-blue-600 rounded-sm"
                                ></TiSocialFacebookCircular></motion.div>



                            </div>
                        </div>
                        <div>
                            <p className="text-xl font-bold">GET IN TOUCH</p>
                            <div className="mt-5">
                                <motion.a
                                    whileHover={"ring"}
                                    variants={variantsContact}
                                    href="tel:+1234567890"
                                    className="text-blue-500 hover:underline flex gap-2 items-center"
                                >
                                    <Image src={Phone} alt="mc heathy" width={30} height={30}></Image> : +1 (234) 567-890
                                </motion.a>
                                <br />
                                <motion.a

                                    whileHover={"ring"}
                                    variants={variantsContact}



                                    href="mailto:example@example.com"
                                    className="text-blue-500 hover:underline flex items-center gap-2"

                                >
                                    <Image src={Email} alt="mc heathy" width={30} height={30}></Image> : example@example.com
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full py-4 text-center text-gray-500 border-t-2 border-gray-400 ">
                    <p>
                        Copyright © 2024 manhcuong18112004 - All Right Reserved.
                    </p>
                </div>
            </motion.div>
        </Suspense>
    );
}

export default Footer;
