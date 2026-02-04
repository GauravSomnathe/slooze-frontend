"use client";

import { useState } from "react";
import { Product } from "@/lib/mockData";

type Props = {
  initialData?: Product | null;
  onSave: (product: Product) => void;
  onClose: () => void;
};

export default function ProductForm({
  initialData,
  onSave,
  onClose,
}: Props) {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price || 0);
  const [stock, setStock] = useState(initialData?.stock || 0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Product name is required";
    }
    if (price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    if (stock < 0) {
      newErrors.stock = "Stock cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const product: Product = {
        id: initialData?.id || Date.now(),
        name,
        price,
        stock,
      };

      onSave(product);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-xl shadow-xl p-6 animate-slideInDown">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
          {initialData ? "Edit Product" : "Add New Product"}
        </h2>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Product Name
          </label>
          <input
            type="text"
            className={`input ${errors.name ? "ring-2 ring-danger" : ""}`}
            placeholder="Enter product name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: "" });
            }}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-sm text-danger mt-1">{errors.name}</p>
          )}
        </div>

        {/* Price Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Price (₹)
          </label>
          <input
            type="number"
            className={`input ${errors.price ? "ring-2 ring-danger" : ""}`}
            placeholder="Enter price"
            value={price}
            onChange={(e) => {
              setPrice(Number(e.target.value));
              if (errors.price) setErrors({ ...errors, price: "" });
            }}
            disabled={isLoading}
            min="0"
            step="0.01"
          />
          {errors.price && (
            <p className="text-sm text-danger mt-1">{errors.price}</p>
          )}
        </div>

        {/* Stock Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Stock Quantity
          </label>
          <input
            type="number"
            className={`input ${errors.stock ? "ring-2 ring-danger" : ""}`}
            placeholder="Enter stock quantity"
            value={stock}
            onChange={(e) => {
              setStock(Number(e.target.value));
              if (errors.stock) setErrors({ ...errors, stock: "" });
            }}
            disabled={isLoading}
            min="0"
          />
          {errors.stock && (
            <p className="text-sm text-danger mt-1">{errors.stock}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="btn btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : initialData ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
