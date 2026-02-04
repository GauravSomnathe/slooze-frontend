"use client";

import { useState } from "react";
import { Product } from "@/lib/mockData";
import ProductForm from "./ProductForm";

export default function ProductTable({
  products,
  onSaveProduct,
}: {
  products: Product[];
  onSaveProduct?: (product: Product) => void;
}) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSave = (product: Product) => {
    onSaveProduct?.(product);
    setEditingProduct(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      // Handle delete
      console.log("Delete product:", id);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="text-left">Product Name</th>
              <th className="text-right">Price</th>
              <th className="text-right">Stock</th>
              <th className="text-right">Inventory Value</th>
              <th className="text-left">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-neutral-500">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((p) => {
                const inventoryValue = p.price * p.stock;
                const isLowStock = p.stock < 20;

                return (
                  <tr key={p.id}>
                    <td className="font-medium text-neutral-900 dark:text-white">
                      {p.name}
                    </td>
                    <td className="text-right font-semibold text-primary">
                      ₹{p.price.toLocaleString()}
                    </td>
                    <td className="text-right">
                      <span
                        className={`font-semibold ${
                          isLowStock ? "text-warning" : "text-neutral-700 dark:text-neutral-300"
                        }`}
                      >
                        {p.stock}
                      </span>
                    </td>
                    <td className="text-right text-neutral-700 dark:text-neutral-300">
                      ₹{inventoryValue.toLocaleString()}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          isLowStock ? "badge-warning" : "badge-success"
                        }`}
                      >
                        {isLowStock ? "Low Stock" : "In Stock"}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="text-primary hover:text-primary/70 transition-colors text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-danger hover:text-danger/70 transition-colors text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Form Modal */}
      {editingProduct && (
        <ProductForm
          initialData={editingProduct}
          onSave={handleSave}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </>
  );
}
