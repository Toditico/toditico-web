"use client";
import { useCommonData } from "@/hooks/useCommonData";
import { CommonResponse } from "@/types/home";

type Props = {
  commonData: CommonResponse;
};

export default function StoreCommonData({ commonData }: Props) {
  useCommonData(commonData);
  return <></>;
}
