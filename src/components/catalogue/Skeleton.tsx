import { Skeleton } from "@mui/material";

export default function CatalogueSkeleton() {
  return (
    <>
      <Skeleton variant="rectangular" height={320} width={320} />
      <Skeleton variant="rectangular" height={56} width={"100%"} />
      <Skeleton variant="rectangular" height={56} width={"100%"} />
      <Skeleton variant="rectangular" height={56} width={"100%"} />
    </>
  );
}
