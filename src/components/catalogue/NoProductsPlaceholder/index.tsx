export default function NoProductsPlaceholder() {
  return (
    <div className="px-6 pb-6 text-center" id="no-products-placeholder">
      <p className="text-h1 px-6 pb-6 font-bold ">
        Lamentablemente no encontramos resultados para su búsqueda.
      </p>
      <p className="text-body">
        Compruebe que esté bien escrito o utilice otro término.
      </p>
    </div>
  );
}
