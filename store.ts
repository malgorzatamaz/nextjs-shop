import { useAtom, atom } from "jotai";
import { withImmer } from "jotai-immer";
import { Item } from "types/Item";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const cart = atomWithStorage<Item[]>("cart", []);

const cartAtom = withImmer(cart);

export const useStore = () => {
  const [cart, updateCart] = useAtom(cartAtom);

  const addToCart = (item: Item) => {
    updateCart((c) => [...c, item]);
  };
  const removeFromCart = (id: number) =>
    updateCart((c) => [...cart.filter((item) => item.id != id)]);

  const clearCart = () => updateCart([]);

  return { cart, addToCart, removeFromCart, clearCart };
};
