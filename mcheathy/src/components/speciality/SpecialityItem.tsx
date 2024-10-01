import Image, { StaticImageData } from "next/image";
import React from "react";

function SpecialityItem({
    name,
    src,
    ...props
}: {
    name: string;
    src: string | StaticImageData;
}) {
    return (
        <div {...props} className="flex flex-col items-center gap-4 max-w-30">
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
        </div>
    );
}

export default SpecialityItem;
