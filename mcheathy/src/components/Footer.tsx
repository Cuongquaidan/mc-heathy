import React from "react";
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialYoutube } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";
import { TiSocialFacebookCircular } from "react-icons/ti";
function Footer() {
    return (
        <div className=" bg-lightBlue dark:bg-black">
            <div className="grid grid-cols-2 gap-20 p-10">
                <div className="font-bold">
                    Dear Valued Customer,
                    <br></br>
                    Thank you for choosing MCHealthy for your healthcare needs.
                    We sincerely appreciate your trust in our services. Our
                    dedicated team strives to provide you with exceptional care
                    and support, ensuring your experience is as comfortable as
                    possible. Your feedback is invaluable to us, and we are
                    committed to continuously improving our services. We look
                    forward to serving you and your loved ones in the future.
                    <br></br>
                    Wishing you health and happiness,<br></br>
                    The MCHealthy Team
                </div>
                <div className="grid grid-cols-2 gap-20 p-10">
                    <div>
                        <p className="text-xl font-bold">Socials</p>
                        <div className="flex items-center gap-5">
                            <TiSocialTwitter size={40}></TiSocialTwitter>
                            <TiSocialYoutube size={40}></TiSocialYoutube>
                            <SlSocialInstagram size={40}></SlSocialInstagram>
                            <TiSocialFacebookCircular
                                size={58}
                            ></TiSocialFacebookCircular>
                        </div>
                    </div>
                    <div>
                        <p className="text-xl font-bold">GET IN TOUCH</p>
                        <div className="mt-5">
                            <a
                                href="tel:+1234567890"
                                className="text-blue-500 hover:underline"
                            >
                                Call Us: +1 (234) 567-890
                            </a>
                            <br />
                            <a
                                href="mailto:example@example.com"
                                className="text-blue-500 hover:underline"
                            >
                                Email Us: example@example.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full py-4 text-center text-gray-500 border-t-2 border-gray-400 ">
                <p>Copyright © 2024 manhcuong18112004 - All Right Reserved.</p>
            </div>
        </div>
    );
}

export default Footer;
