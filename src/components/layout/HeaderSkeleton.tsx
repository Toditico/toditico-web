import { Skeleton } from "@mui/material";

function NavigationBarSkeleton() {
  return (
    <div className="h-[120px] bg-white flex flex-col px-6 py-3 gap-2.5 fixed z-[1100] w-full top-0 xl:h-20 xl:flex-row xl:justify-between xl:items-center">
      <div className="flex flex-row justify-between items-center w-full">
        <Skeleton variant="rectangular" height={40} width={160} />
        <div className="flex flex-row gap-4 xl:hidden">
          <Skeleton variant="rectangular" height={24} width={24} />
          <Skeleton variant="rectangular" height={24} width={24} />
          <Skeleton variant="rectangular" height={24} width={24} />
        </div>
        <div className="flex flex-row gap-2 xl:w-[600px] xl:items-center">
          <Skeleton
            variant="rectangular"
            height={40}
            className="w-[calc(100%-100px)] xl:w-[500px]"
          />
          <Skeleton variant="rectangular" height={40} width={96} />
          <div className="flex-row gap-4 hidden xl:flex">
            <Skeleton variant="rectangular" height={24} width={24} />
            <Skeleton variant="rectangular" height={24} width={24} />
            <Skeleton variant="rectangular" height={24} width={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeaderSkeleton() {
  return (
    <>
      <NavigationBarSkeleton />
    </>
  );
}
