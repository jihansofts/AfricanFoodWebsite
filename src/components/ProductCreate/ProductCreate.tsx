"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoImageOutline, IoClose } from "react-icons/io5";
import { IProduct } from "@/model/ProductModel";
import PackgeCard from "@/common/PackgeCard";
import { useAuth } from "@/context/AuthContext";
import ProductCard from "./ProductList";
import Swal from "sweetalert2";
import Image from "next/image";

export interface Form {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCreate() {
  const { user } = useAuth();
  const userId = user?.id;
  const [activeTab, setActiveTab] = useState<"list" | "listed" | "upgrade">(
    "list"
  );
  const [products, setProducts] = useState<IProduct[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [base64String, setBase64String] = React.useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [newProduct, setNewProduct] = useState<Form>({
    id: 0,
    category: "Nigerian",
    price: 0,
    image: "",
    name: "",
  });

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        Swal.fire("Error", "Please select an image file", "error");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire("Error", "Image size should be less than 5MB", "error");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64String(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setBase64String("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (user && !loading && userId) {
      fetchProducts();
    }
  }, [user, loading, userId]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/products/get?vendorId=${userId}`);
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const resetForm = () => {
    setNewProduct({
      id: 0,
      name: "",
      category: "Nigerian",
      price: 0,
      image: "",
    });
    setBase64String("");
    setIsEditing(false);
    setEditingProductId(null);
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      Swal.fire("Error", "Please fill in all required fields", "error");
      return;
    }

    if (!base64String) {
      Swal.fire("Error", "Please upload a product image", "error");
      return;
    }

    // Validate name length (max 18 chars)
    if (newProduct.name.length > 18) {
      Swal.fire("Error", "Name must be 18 characters or less", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newProduct.name,
          price: newProduct.price,
          category: newProduct.category,
          imageUrl: base64String,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        Swal.fire("Error", data.error || "Failed to add product", "error");
        return;
      }

      // Update UI
      setProducts((prev) => [...prev, data.product]);
      resetForm();
      setActiveTab("listed");
      Swal.fire("Success", "Product added successfully", "success");
    } catch (error) {
      setLoading(false);
      console.error("Error adding product:", error);
      Swal.fire("Error", "Failed to add product", "error");
    }
  };

  const handleEditProduct = async (product: IProduct) => {
    try {
      // Fetch product details and populate form
      const response = await fetch(`/api/products/${product._id}`);
      const productData = await response.json();

      if (response.ok) {
        setNewProduct({
          id: 0,
          name: productData.name,
          price: productData.price,
          category: productData.category,
          image: productData.imageUrl,
        });
        setBase64String(productData.imageUrl);
        setIsEditing(true);
        setEditingProductId(String(product._id));
        setActiveTab("list"); // Switch to form tab
      }
    } catch (error) {
      console.error("Error fetching product for edit:", error);
      Swal.fire("Error", "Failed to load product for editing", "error");
    }
  };

  const handleUpdateProduct = async () => {
    if (
      !editingProductId ||
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.category
    ) {
      Swal.fire("Error", "Please fill in all required fields", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/products/${editingProductId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newProduct.name,
          price: newProduct.price,
          category: newProduct.category,
          imageUrl: base64String,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        Swal.fire("Error", data.error || "Failed to update product", "error");
        return;
      }

      // Update UI
      setProducts((prev) =>
        prev.map((p) => (String(p._id) === editingProductId ? data : p))
      );

      resetForm();
      setActiveTab("listed");
      Swal.fire("Success", "Product updated successfully", "success");
    } catch (error) {
      setLoading(false);
      console.error("Error updating product:", error);
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  const handleDeleteProduct = async (product: IProduct) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/products/${product._id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Remove from UI
          setProducts((prev) =>
            prev.filter((p) => String(p._id) !== String(product._id))
          );
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        } else {
          const data = await response.json();
          Swal.fire("Error", data.error || "Failed to delete product", "error");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire("Error", "Failed to delete product", "error");
      }
    }
  };

  const handleSubmit = () => {
    if (isEditing) {
      handleUpdateProduct();
    } else {
      handleAddProduct();
    }
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  return (
    <div className="bg-background p-4">
      <div className="container mx-auto">
        <div className="flex justify-center gap-10 mb-8 bg-[#F5F5F5] py-3">
          <button
            onClick={() => {
              resetForm();
              setActiveTab("list");
            }}
            className={`pb-3 lg:text-2xl md:text-[18px] text-[16px] font-semibold ${
              activeTab === "list"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600"
            }`}
          >
            {isEditing ? "Edit Product" : "Add Products"}
          </button>
          <button
            onClick={() => setActiveTab("listed")}
            className={`pb-3 lg:text-2xl md:text-[18px] text-[16px] font-semibold ${
              activeTab === "listed"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600"
            }`}
          >
            Listed Products
          </button>
          <button
            onClick={() => setActiveTab("upgrade")}
            className={`pb-3 lg:text-2xl md:text-[18px] text-[16px] font-semibold ${
              activeTab === "upgrade"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600"
            }`}
          >
            Upgrade Package
          </button>
        </div>

        {activeTab === "list" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-[24px] font-sans font-blod text-[#222222]">
                {isEditing ? "Edit Product Details" : "Provide Details"}
              </h2>

              {/* Hidden product ID for editing */}
              {isEditing && editingProductId && (
                <input type="hidden" value={editingProductId} />
              )}

              <div className="space-y-2">
                <label className="block text-lg font-inter">
                  Select Category
                </label>
                <select
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="w-full border py-3 px-2 rounded border-gray-200 outline-0"
                >
                  <option value="Nigerian">Nigerian</option>
                  <option value="Ghanaian">Ghanaian</option>
                  <option value="AfricanGroceries">AfricanGroceries</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-lg font-inter">Enter Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full border py-3 px-2 rounded border-gray-200 outline-0"
                  placeholder="Food"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-lg font-inter">Enter Price</label>
                <input
                  type="number"
                  value={newProduct.price === 0 ? "" : newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: e.target.value === "" ? 0 : Number(e.target.value),
                    })
                  }
                  className="w-full border py-3 px-2 rounded border-gray-200 outline-0"
                  placeholder="5"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-primary flex-1 text-white px-6 py-2 rounded-full font-sans font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? isEditing
                      ? "Updating..."
                      : "Adding..."
                    : isEditing
                    ? "Update Product"
                    : "Add Product"}
                </button>

                {isEditing && (
                  <button
                    onClick={handleCancelEdit}
                    disabled={loading}
                    className="bg-gray-500 flex-1 text-white px-6 py-2 rounded-full font-sans font-semibold text-lg disabled:opacity-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Image Upload Section - Beautiful Design */}
            <div className="space-y-4">
              <div className="border-[3px] border-spacing-6 bg-[#FFF5F0] border-dashed border-primary rounded-4xl overflow-hidden">
                {base64String ? (
                  // Show image when uploaded
                  <div className="relative w-full h-full min-h-[400px]">
                    <Image
                      src={base64String}
                      alt="Product preview"
                      fill
                      className="object-cover"
                    />
                    {/* Remove image button */}
                    <button
                      onClick={removeImage}
                      className="absolute top-4 right-4 bg-white/90 hover:bg-white text-red-500 rounded-full p-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <IoClose className="size-6" />
                    </button>
                    {/* Change image overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <button
                        onClick={handleClick}
                        className="w-full bg-primary/90 hover:bg-primary text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 backdrop-blur-sm"
                      >
                        Change Image
                      </button>
                    </div>
                  </div>
                ) : (
                  // Show upload area when no image
                  <div
                    onClick={handleClick}
                    className="flex flex-col justify-center items-center p-2 min-h-[400px] cursor-pointer transition-all duration-200 hover:bg-[#FFF0E6]"
                  >
                    <div className="text-center space-y-6">
                      <div className="flex justify-center">
                        <div className="bg-primary/10 p-6 rounded-2xl">
                          <IoImageOutline className="size-16 text-primary" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="text-text text-2xl font-bold font-inter">
                          {isEditing
                            ? "Update Product Picture"
                            : "Upload Product Picture"}
                        </p>
                        <p className="text-gray-600 text-lg">
                          Drag & drop or click to upload
                        </p>
                      </div>

                      <div className="pt-4">
                        <button
                          type="button"
                          className="bg-primary text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-primary/90 transition-colors"
                        >
                          {isEditing ? "Choose New Image" : "Choose Image"}
                        </button>
                      </div>

                      <p className="text-gray-500 text-sm pt-4">
                        Supports: JPG, PNG, WEBP • Max: 5MB
                      </p>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Image status */}
              {base64String && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-green-800 font-semibold text-center">
                    ✓ Image {isEditing ? "updated" : "uploaded"} successfully
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "listed" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product: IProduct, index) => (
                <ProductCard
                  key={String(product._id ?? index)}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="bg-[#F7F7F7] rounded-2xl p-12">
                  <IoImageOutline className="size-20 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                    No Products Listed
                  </h3>
                  <p className="text-gray-500 mb-6">
                    You haven't added any products yet. Start by adding your
                    first product!
                  </p>
                  <button
                    onClick={() => setActiveTab("list")}
                    className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Add Your First Product
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "upgrade" && (
          <div className="text-center">
            <PackgeCard userId={userId as string} />
          </div>
        )}
      </div>
    </div>
  );
}
