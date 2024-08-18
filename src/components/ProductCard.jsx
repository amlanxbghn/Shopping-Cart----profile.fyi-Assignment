import Image from 'next/image';

const ProductCard = ({ id, name, price, description, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Image src={image} alt={name} width={300} height={300} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-lg font-bold mb-4">${price.toFixed(2)}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;