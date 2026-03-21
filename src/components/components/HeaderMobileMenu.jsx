import { Button, Menu } from "antd";
import ShieldCheckIcon from "@heroicons/react/24/solid/ShieldCheckIcon";

export default function HeaderMobileMenu({
  menuItems,
  onNavigate,
  onContact,
  isOpen,
  isAdmin,
}) {
  const allItems = [
    ...menuItems,
    ...(isAdmin
      ? [
          {
            key: "/admin",
            label: (
              <span className="flex items-center gap-1.5 text-yellow-300">
                <ShieldCheckIcon className="w-4 h-4" />
                Admin
              </span>
            ),
          },
        ]
      : []),
  ];

  return (
    <div
      className={`md:hidden w-full overflow-hidden transition-all duration-300 ${
        isOpen
          ? "max-h-[500px] opacity-100 backdrop-blur-2xl bg-white/10 py-2"
          : "max-h-0 opacity-0"
      }`}
    >
      <Menu
        mode="vertical"
        items={allItems}
        className="border-none !bg-transparent text-white"
        onClick={(e) => onNavigate(e.key)}
      />
      <div className="px-2 pb-2 flex flex-col space-y-2">
        <Button block type="text" className="text-white truncate">
          +996 703 123 324
        </Button>
        <Button
          block
          type="primary"
          className="bg-gradient-to-r from-blue-600 to-cyan-500 border-none"
          onClick={onContact}
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
}