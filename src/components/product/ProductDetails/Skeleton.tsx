import { Skeleton } from "@mui/material";

export default function ProductDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton variant="rectangular" height={350} width="100%" />
      <div className="flex flex-col gap-4">
        <Skeleton variant="text" className="text-h3-desktop" />
        <Skeleton variant="text" className="text-body" />
      </div>
    </div>
  );
}
