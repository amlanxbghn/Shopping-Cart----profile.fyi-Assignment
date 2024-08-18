import Image from 'next/image';

const CartItem = ({ item, product, updateQuantity, removeItem }) => {
  return (
    <div className="flex items-center border-b border-gray-200 py-4">
      <Image src={product.image} alt={product.name} width={80} height={80} className="object-cover mr-4" />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
        <div className="flex items-center mt-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="bg-gray-200 px-2 py-1 rounded"
          >
            -
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="bg-gray-200 px-2 py-1 rounded"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => removeItem(item.id)}
        className="text-red-500 hover:text-red-600 transition-colors"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;