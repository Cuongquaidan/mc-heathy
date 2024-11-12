import React from "react";

function Options({ options }: { options: Array<string> }) {
    return (
        <div>
            <div className="flex gap-5">
                {options.map((item) => (
                    <div
                        key={item}
                        className="p-3 text-sm border border-pink-600 rounded-2xl"
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Options;
