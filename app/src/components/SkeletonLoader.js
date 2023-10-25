import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = ({ params }) => {
  return (
    <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row mb-8">
          <div className="lg:w-1/2 pr-8">
            <div className="mb-6 relative rounded-lg overflow-hidden">
              <Skeleton height={400} />
            </div>
          </div>
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-semibold mb-4">
              <Skeleton width={200} />
            </h1>
            <p className="text-gray-600 mb-4">
              <Skeleton count={3} />
            </p>
            <div className="flex items-center mb-4">
              <Skeleton width={20} height={20} className="mr-2" />
              <Skeleton width={150} />
            </div>
            <p className="text-2xl font-semibold text-blue-600 mb-6">
              <Skeleton width={100} />
            </p>
            <div className="flex mb-4 space-x-4">
              <Skeleton width={60} height={20} />
              <Skeleton width={60} height={20} />
            </div>
            <Skeleton width={100} height={40} />
          </div>
        </div>
     
    </div>
  );
};

export default SkeletonLoader;
