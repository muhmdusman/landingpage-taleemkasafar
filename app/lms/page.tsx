import React from "react";
import Lmsheader from "@/components/lms/lmsheader";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1">
        <Lmsheader />

        {/* Content Section */}
        <main className="flex-1 flex flex-col items-center justify-start pt-34 sm:pt-30 px-4 sm:px-6 bg-gray-100 text-center">
          {/*  Title */}
          <h2 className="  text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-700 bg-clip-text text-transparent mt-24 sm:mt-4">
            Prepare for NUST Entry Test
          </h2>

          <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg text-gray-700 max-w-md sm:max-w-2xl">
            Maximize your NUST Entry Test score with our mock tests, resources
            and expert strategies.
          </p>

          {/* Start Test Button */}
          <Link href="/quiz">
            <button className="mt-6 sm:mt-4 px-4 py-2 text-sm sm:text-lg font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 transition-all">
              Start Your Test
            </button>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Page;
