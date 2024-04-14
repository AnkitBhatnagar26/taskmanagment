import React, { useState, useEffect } from "react";

function Loader() {
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 500); // Simulating loading for demonstration purposes
    // }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            {loading ? (
                <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-500"></div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Loader;
