type Props = {
  label: "asociados" | "ofertas" | "garantías";
  text: string;
};
export default function OurBussinessCard({ label, text }: Props) {
  const getCircleClass = (label: "asociados" | "ofertas" | "garantías") => {
    const common =
      "w-[120px] h-[120px] rounded-full flex items-center justify-center text-white text-number-card font-black";
    const color =
      label === "asociados"
        ? "bg-secondary"
        : label === "garantías"
        ? "bg-primary"
        : "bg-tertiary";
    return `${common} ${color}`;
  };
  const getCircleContent = (label: "asociados" | "ofertas" | "garantías") => {
    return label === "asociados" ? "01" : label === "garantías" ? "02" : "03";
  };
  const getLabelClass = (label: "asociados" | "ofertas" | "garantías") => {
    const common = "text-h3 font-medium uppercase";
    const color =
      label === "asociados"
        ? "text-secondary"
        : label === "garantías"
        ? "text-primary"
        : "text-tertiary";
    return `${common} ${color}`;
  };
  const getBarClass = (label: "asociados" | "ofertas" | "garantías") => {
    const common = "w-[80px] h-[4px] rounded";
    const color =
      label === "asociados"
        ? "bg-secondary"
        : label === "garantías"
        ? "bg-primary"
        : "bg-tertiary";
    return `${common} ${color}`;
  };

  return (
    <div className="flex flex-col items-center shadow-lg">
      <div className={getCircleClass(label)}>{getCircleContent(label)}</div>
      <div className="px-6 py-6 flex flex-col gap-[10px] items-center">
        <p className={getLabelClass(label)}>{label}</p>
        <div className={getBarClass(label)}></div>
        <p className="text-button font-normal text-center">{text}</p>
      </div>
    </div>
  );
}
