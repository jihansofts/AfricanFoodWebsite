// import React from 'react'
// import { IoImageOutline } from 'react-icons/io5';
// import {Product} from '@/components/ProductCreate/ProductCreate'

// export default function AddProduct({ newProduct, setNewProduct }: { newProduct: Product; setNewProduct: React.Dispatch<React.SetStateAction<Product>> }) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <div className="space-y-4">
//         <h2 className="text-[24px] font-sans font-blod text-[#222222]">
//           Provide Details
//         </h2>
//         <div className="space-y-2">
//           <label className="block text-lg font-inter">Select Category</label>
//           <select
//             title="Select Category"
//             value={newProduct.category}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, category: e.target.value })
//             }
//             className="w-full border py-3 px-2 rounded border-gray-200 outline-0">
//             <option value="Nigerian">Nigerian</option>
//             <option value="Ghanaian">Ghanaian</option>
//             <option value="Others">Others</option>
//           </select>
//         </div>
//         <div className="space-y-2">
//           <label className="block text-lg font-inter">Enter Name</label>
//           <input
//             type="text"
//             value={newProduct.name}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, name: e.target.value })
//             }
//             className="w-full border py-3 px-2 rounded border-gray-200 outline-0"
//             placeholder="Food"
//           />
//         </div>
//         <div className="space-y-2">
//           <label className="block text-lg font-inter">Enter Price</label>
//           <input
//             type="number"
//             value={newProduct.price}
//             onChange={(e) =>
//               setNewProduct({
//                 ...newProduct,
//                 price: Number(e.target.value),
//               })
//             }
//             className="w-full border py-3 px-2 rounded border-gray-200 outline-0"
//             placeholder="5"
//           />
//         </div>
//         <button
//           onClick={handleAddProduct}
//           className="bg-primary w-full text-white px-6 py-2 rounded-full font-sans font-semibold text-lg">
//           Add Product
//         </button>
//       </div>
//       <div className="border-[3px] border-spacing-6 bg-[#FFF5F0] border-dashed border-primary flex flex-col justify-center items-center p-8 rounded-4xl">
//         <p className="text-text text-2xl font-bold font-inter">
//           Upload Product Picture
//         </p>
//         <button className="text-primary w-[90%] mt-2 py-6 border-2 border-dashed px-4 flex flex-col items-center justify-center space-y-4 rounded-2xl">
//           <IoImageOutline className="size-8" />
//           <span>
//             Drag & drop or click to{" "}
//             <span className="underline font-inter text-lg font-semibold">
//               Upload Store’s Picture
//             </span>{" "}
//           </span>
//         </button>
//       </div>
//     </div>
//   );
// }
