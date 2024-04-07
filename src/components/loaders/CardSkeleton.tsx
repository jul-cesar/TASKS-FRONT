import React from "react";
import { Skeleton } from "../ui/skeleton";

const CardSkeleton = () => {
  return Array.from({ length: 3 }, (e, i) => (
    <div
      className="flex justify-center  flex-wrap sm:w-[350px] w-[320px] "
      key={i}
    >
      <div className="grid w-full items-center gap-4 max-w-[350px]">
        <div className="flex  flex-col space-y-1.5 p-6">
          <div className="flex justify-between">
            <Skeleton className="h-[10px] w-[60px]  rounded-xl" />
          </div>

          <Skeleton className="h-[12px] w-[160px]  rounded-xl" />
          <Skeleton className="h-[10px] w-[100px]  rounded-xl" />
          <Skeleton className="h-[10px] w-[200px]  rounded-xl" />
        </div>

        <div className="flex items-center justify-between gap-2 mr-4 ml-4">
          <div className="p-2 flex gap-x-1">
            <Skeleton className="h-[12px] w-[40px]  rounded-xl" />
            <Skeleton className="h-[12px] w-[46px]  rounded-xl" />
          </div>
          <div className="p-2 flex gap-x-1">
            <Skeleton className="h-[12px] w-[40px]  rounded-xl" />
            <Skeleton className="h-[12px] w-[46px]  rounded-xl" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <Skeleton className="h-[12px] w-[130px]  rounded-xl" />
          <Skeleton className="h-[12px] w-[60px]  rounded-xl" />
        </div>
        <div className="flex justify-evenly">
          <Skeleton className="h-[40px] w-[50px]  rounded-xl" />
          <Skeleton className="h-[40px] w-[50px]  rounded-xl" />
          <Skeleton className="h-[40px] w-[50px]  rounded-xl" />
        </div>
      </div>
    </div>
  ));
};

export default CardSkeleton;
