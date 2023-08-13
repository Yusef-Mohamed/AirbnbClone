"use client ";
interface MenuitemProps {
  onClick: () => void;
  label: string;
}
const Menuitem: React.FC<MenuitemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 hover:bg-neutral-100 py-3 bg-white transition font-semibold"
    >
      {label}
    </div>
  );
};

export default Menuitem;
