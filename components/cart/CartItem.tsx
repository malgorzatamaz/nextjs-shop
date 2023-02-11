import Image from "next/image";
import { useRouter } from "next/router";
import { useStore } from "store";
import { Item } from "types/Item";
import { BASE_URL } from "utils";
import router from "next/router";

interface Props {
  item: Item;
}

const CartItem = ({ item }: Props) => {
  const router = useRouter();
  const { removeFromCart } = useStore();

  const handleClick = () => {
    router.push(`${BASE_URL}/item/${item.id}`);
  };

  const deleteItem = (e: React.MouseEvent<HTMLElement>) => {
    removeFromCart(item.id);
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleClick}
      className="mt-6 flex border rounded-md hover:bg-gray-50 cursor-pointer"
    >
      <div className="h-20 overflow-hidden rounded-md flex mr-5">
        <Image
          src={item.image}
          width={100}
          height={100}
          alt="Front of men&#039;s Basic Tee in black."
          className="h-50 w-50 object-center object-contain lg:h-50 lg:w-50"
        />
      </div>
      <div className="mt-4 flex  flex-1 justify-between">
        <div>
          <h3 className="text-sm text-gray-700">{item.title}</h3>
          <p className="text-sm font-medium text-gray-900">
            {item.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
      </div>
      <button
        onClick={deleteItem}
        type="button"
        className="right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
      >
        <span className="sr-only">Close</span>
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;
