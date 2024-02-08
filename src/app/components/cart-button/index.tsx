import { ShoppingBagIcon } from "../icons/shopping-bag-icon";

interface CartButtonProps {
  onClick: (event: React.MouseEvent) => void;
}

const CartButton = ({ onClick }: CartButtonProps) => {
  return (
    <button onClick={onClick} aria-label="Show items in shopping cart">
      <ShoppingBagIcon />
    </button>
  );
};

export default CartButton;
