import NavigationBar from "@/components/layout/NavigationBar";
import { Button } from "@mui/material";
import { IconShoppingBag } from "@tabler/icons-react";
import MainBrands from "@/components/layout/MainBrands";

export default function Header() {
  return (
    <>
      <NavigationBar />
      <div className="h-[400px] bg-home bg-cover py-[10px] px-[24px] flex items-center md:bg-home-tablet xl:h-[720px]">
        <div className="mx-auto my-[24px] text-center flex flex-col gap-[24px] items-center xl:max-w-[1000px]">
          <h1 className="font-black text-h1 uppercase text-white md:text-h1-tablet xl:text-h1-desktop">
            Rueda con confianza
          </h1>
          <h3 className="font-medium text-h3 uppercase text-white md:text-h2-tablet xl:text-h2-desktop">
            Servicio superior, precios justos, calidad insuperable y garantía
            que perdura
          </h3>
          <Button
            className="text-button h-[44px] rounded-lg py-[10px] px-[16px] uppercase bg-primary font-bold max-w-[300px] md:h-[56px] md:py-[16px]"
            variant="contained"
            startIcon={<IconShoppingBag />}
          >
            Explora nuestro catálogo
          </Button>
        </div>
      </div>
      <MainBrands />
    </>
  );
}
