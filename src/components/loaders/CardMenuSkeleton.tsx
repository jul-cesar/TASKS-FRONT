import { Skeleton } from "../ui/skeleton";

const CardMenuSkeleton = () => {
  return (
    <div className="flex justify-evenly w-full">
      <Skeleton className="h-[30px] w-[50px]  rounded-xl" />
      <Skeleton className="h-[30px] w-[50px]  rounded-xl" />
      <Skeleton className="h-[30px] w-[50px]  rounded-xl" />
    </div>
  );
};

export default CardMenuSkeleton;
