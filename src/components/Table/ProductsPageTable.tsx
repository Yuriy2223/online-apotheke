import { Edit, Trash2, Search, Package } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { Spinner } from "@/shared/Spinner";
import { MedicineProduct } from "@/types/medicine-products";
import {
  selectLoading,
  selectProducts,
  selectFilters,
} from "@/redux/dashboard-product/selectors";

export interface ProductsPageTableProps {
  singleProduct?: MedicineProduct;
  highlightId?: string;
  onEditProduct: (productId: string) => void;
  onDeleteProduct: (productId: string) => void;
}

export function ProductsPageTable({
  singleProduct,
  highlightId,
  onEditProduct,
  onDeleteProduct,
}: ProductsPageTableProps) {
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectLoading);
  const filters = useAppSelector(selectFilters);
  const data = singleProduct ? [singleProduct] : products;

  if (loading) {
    return <Spinner />;
  }

  const hasActiveFilters = filters.search || filters.category;
  const isEmpty = data.length === 0;

  const EmptyState = () => (
    <tr>
      <td colSpan={6} className="px-6 py-12 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          {hasActiveFilters ? (
            <>
              <div className="w-16 h-16 bg-gray-light rounded-full flex items-center justify-center">
                <Search size={32} className="text-green-light" />
              </div>
              <div className="space-y-6">
                <p className="text-black-true text-xl max-w-lg">
                  За вашими критеріями пошуку нічого не знайдено.
                </p>
                <p className="text-gray-dark text-lg">
                  Спробуйте змінити критерії пошуку або очистити фільтри.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-gray-light rounded-full flex items-center justify-center">
                <Package size={32} className="text-green-light" />
              </div>
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-black-true">
                  Немає продуктів
                </h3>
                <p className="text-black-true max-w-lg">
                  Поки що немає жодного продукту в системі. Додайте перший
                  продукт, щоб почати.
                </p>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <table className="w-[1300px] desktop:w-full border-collapse">
      <thead>
        <tr className="bg-gray-light divide-x divide-gray-soft">
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Product Info
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Category
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Stock
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Suppliers
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Price
          </th>
          <th className="px-6 py-3 text-left text-base font-medium text-gray-dark">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-soft">
        {isEmpty ? (
          <EmptyState />
        ) : (
          data.map((product) => (
            <tr
              key={product._id}
              className={`divide-x divide-gray-soft ${
                highlightId === product._id ? "bg-yellow-100" : ""
              }`}
            >
              <td className="px-6 py-3 flex items-center gap-3">
                {product.photo ? (
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="w-9 h-9 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const initialsElement = e.currentTarget
                        .nextElementSibling as HTMLElement;
                      if (initialsElement)
                        initialsElement.style.display = "flex";
                    }}
                  />
                ) : null}

                <div
                  className="w-9 h-9 rounded-full bg-gray-light flex items-center justify-center text-xs font-medium text-gray-dark"
                  style={{ display: product.photo ? "none" : "flex" }}
                >
                  {product.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>

                <span className="text-sm font-medium text-black-true">
                  {product.name}
                </span>
              </td>

              <td className="px-6 py-3 text-sm font-medium text-black-true">
                {product.category}
              </td>

              <td className="px-6 py-3 text-sm font-medium text-black-true">
                {product.stock}
              </td>

              <td className="px-6 py-3 text-sm font-medium text-black-true">
                {product.suppliers}
              </td>

              <td className="px-6 py-3 text-sm font-medium text-black-true">
                $
                {Number(product.price).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="px-6 py-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => onEditProduct(product._id)}
                    className="flex items-center justify-center w-8 h-8 text-green-light hover:text-white-true hover:bg-green-light rounded-md transition-all duration-200 border border-green-light group"
                    aria-label="Edit product"
                    title="Edit product"
                  >
                    <Edit
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </button>
                  <button
                    onClick={() => onDeleteProduct(product._id)}
                    className="flex items-center justify-center w-8 h-8 text-red-dark hover:text-white-true hover:bg-red-dark rounded-md transition-all duration-200 border border-red-dark group"
                    aria-label="Delete product"
                    title="Delete product"
                  >
                    <Trash2
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
