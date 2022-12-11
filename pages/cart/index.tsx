import Link from "next/link";
import { useStore } from "store";
import dynamic from "next/dynamic";

const CartItem = dynamic(() => import("../../components/cart/CartItem"), {
  ssr: false,
});

const Cart = () => {
  const { cart } = useStore();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Cart
        </h2>
        {(cart || []).map((item) => (
          <CartItem key={item.title} item={item} />
        ))}
        <div className="inline-flex rounded-md shadow">
          <Link
            href="/order"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
          >
            Order items
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
