import { products } from "./123";
import { Edit, Trash2 } from "lucide-react";

export interface MedicineAllProducts {
  _id: string;
  photo: string;
  name: string;
  category: string;
  stock: number;
  suppliers: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsPageTableProps {
  singleProduct?: MedicineAllProducts;
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
  const data = singleProduct ? [singleProduct] : products;

  return (
    <table className="w-[1300px] desktop:w-full border-collapse">
      <thead>
        <tr className="bg-gray-light divide-x divide-gray-300">
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
      <tbody className="divide-y divide-gray-300">
        {data.map((product) => (
          <tr
            key={product._id}
            className={`divide-x divide-gray-300 ${
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
                    if (initialsElement) initialsElement.style.display = "flex";
                  }}
                />
              ) : null}

              <div
                className="w-9 h-9 rounded-full bg-gray-light flex items-center justify-center text-xs font-medium text-gray-dark"
                style={{ display: product.photo ? "none" : "flex" }}
              >
                {product.name
                  .split(" ")
                  .map((n) => n[0])
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
        ))}
      </tbody>
    </table>
  );
}
