export default function BussinessInfo() {
  return (
    <div className="flex flex-col gap-6 px-6 py-12 px-6 md:w-[500px] md:mx-auto xl:py-[80px] xl:w-auto">
      <div className="flex flex-col gap-4 text-center items-center mb-8 xl:items-start">
        <p className="text-h2-tablet text-primary font-bold">Que es Toditico</p>
        <div className="w-[160px] h-[4px] rounded bg-primary"></div>
      </div>
      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="flex flex-col gap-6 xl:w-[560px]">
          <p className="text-button text-center md:text-left xl:text-body">
            TODITICO es un proyecto relativamente joven, con el concepto de
            tienda comercializadora de partes y piezas de la industria
            automotriz en el mercado cubano.
          </p>
          <p className="text-button text-center md:text-left xl:text-body">
            Surge en enero del 2022, como resultado del deseo profundo de
            satisfacer las necesidades en dicho mercado, apostando siempre al
            crecimiento y profesionalidad. Abarcando diferentes nichos
            sólidamente, hemos logrado convertirnos en una gran oportunidad para
            nuestros clientes, ofreciendo soluciones confiables y duraderas para
            mantener los vehículos en su mejor estado y garantizar la seguridad
            en las carreteras.
          </p>
          <p className="text-button text-center md:text-left xl:text-body">
            Con la vista en nuestra prioridad, la satisfacción del cliente,
            contamos con un equipo altamente capacitado y apasionado por la
            industria, siempre dispuesto a dar el soporte necesario a nuestros
            clientes, proporcionando un servicio amable y eficiente.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-center md:text-left xl:w-[560px]">
          <p className="font-bold text-button xl:text-body">
            Misión: <br />
            <span className="font-normal text-button xl:text-body">
              Proveer partes y piezas de la industria automotriz, en el mercado
              cubano.
            </span>
          </p>
          <p className="font-bold text-button xl:text-body">
            Visión: <br />
            <span className="font-normal text-button xl:text-body">
              En función de nuestra misión, ser el proyecto más exitoso y
              respetado en Cuba. Con un stock estable, de fácil alcance y
              precios altamente competitivos. Ofrecer un servicio de venta y
              postventa de excelencia.
            </span>
          </p>
          <p className="font-bold text-button xl:text-body">
            Valores: <br />
            <span className="font-normal text-button xl:text-body">
              Integridad, transparencia, compromiso y enfoque.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
