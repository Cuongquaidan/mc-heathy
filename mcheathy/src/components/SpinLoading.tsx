import React from "react";

function SpinLoading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-gray-500 rounded-full border-t-transparent animate-spin"></div>
                <p className="mt-4 text-lg text-gray-700">Đang tải...</p>
            </div>
        </div>
    );
}

export default SpinLoading;
