import Image from "next/image";

import { items } from "mocks/items";
import { Item } from "types/Item";
import ProductItem from "pages/components/ProductItem";

export async function getStaticProps() {
  return {
    props: { items },
  };
}

const Cart = ({ items }: { items: Item[] }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Cart
        </h2>
        {items.map((item) => (
          <ProductItem key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
