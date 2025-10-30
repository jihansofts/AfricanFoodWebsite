import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { IProduct } from "@/model/ProductModel";

interface ProductCardProps {
  product: IProduct;
  onEdit?: (product: IProduct) => void;
  onDelete?: (product: IProduct) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  return (
    <div className="bg-[#F7F7F7] rounded-2xl px-6 py-8 flex flex-col items-center justify-center shadow-sm hover:shadow-lg transition-all">
      {/* Image Section */}
      <div className="w-[350px] h-[230px] relative">
        <Image
          width={350}
          height={230}
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover rounded-2xl mb-3"
        />
        <span className="absolute top-4 right-4 bg-white text-gray-950 font-inter px-3 py-2 rounded-full text-sm shadow">
          100+ Dishes
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-3">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="text-[#FFA319] size-[20px]" />
        ))}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-[22px] md:text-[28px] text-[#222222] font-sans mt-2 text-center">
        {product.name}
      </h3>

      {/* Price and Actions */}
      <div className="w-full flex items-center justify-center gap-4 mt-4 flex-wrap">
        <span className="text-primary lg:text-[28px] md:text-[22px] text-[16px] font-bold font-sans">
          {product.price.toFixed(0)} CAD
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit?.(product)}
            className="py-3 px-6 border-2 border-primary font-semibold text-primary rounded-full lg:text-[16px] md:text-[14px] text-[12px] font-inter cursor-pointer hover:bg-primary hover:text-white transition">
            Edit
          </button>
          <button
            onClick={() => onDelete?.(product)}
            className="py-3 px-6 border-2 border-primary font-semibold text-primary rounded-full lg:text-[16px] md:text-[14px] text-[12px] font-inter cursor-pointer hover:bg-primary hover:text-white transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
