import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ViewTour from "../ViewTour";
import Orders from "../Orders";
import CreateTour from "./CreateTour";

const Admin = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Туры", icon: "🌍" },
    { name: "Заказы", icon: "💳" },
    { name: "Создать тур", icon: "➕" },
  ];

  const handleTabSelect = (index) => {
    setActiveTab(index);
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7FE] font-sans mt-[49px]">

      {/* ── OVERLAY (mobile) ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── SIDEBAR DESKTOP ── */}
      <aside className="hidden lg:flex w-72 bg-white p-6 shadow-sm flex-col flex-shrink-0">
        <SidebarContent
          menuItems={menuItems}
          activeTab={activeTab}
          onSelect={handleTabSelect}
          onClose={null}
        />
      </aside>

      {/* ── SIDEBAR MOBILE DRAWER ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            key="mobile-sidebar"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed top-0 left-0 h-full w-72 bg-white p-6 shadow-2xl z-30 flex flex-col lg:hidden"
          >
            <SidebarContent
              menuItems={menuItems}
              activeTab={activeTab}
              onSelect={handleTabSelect}
              onClose={() => setSidebarOpen(false)}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 p-4 sm:p-8 min-w-0">
        <header className="mb-8 flex justify-between items-center gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Burger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 gap-1.5 flex-shrink-0"
              aria-label="Открыть меню"
            >
              <span className="block w-5 h-0.5 bg-gray-600 rounded" />
              <span className="block w-5 h-0.5 bg-gray-600 rounded" />
              <span className="block w-5 h-0.5 bg-gray-600 rounded" />
            </button>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 truncate">
              {menuItems[activeTab].name}
            </h2>
          </div>

          <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-xs sm:text-sm font-bold text-gray-500 border border-gray-100 flex-shrink-0">
            Admin Mode
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 shadow-xl shadow-blue-900/5 min-h-[70vh] border border-gray-50"
          >
            {activeTab === 0 && <ViewTour />}
            {activeTab === 1 && <Orders />}
            {activeTab === 2 && <CreateTour />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

const SidebarContent = ({ menuItems, activeTab, onSelect, onClose }) => (
  <>
    <div className="mb-10 px-4 flex items-center justify-between pt-6 sm:pt-4">
      <h1 className="text-2xl font-black text-blue-600 uppercase tracking-wider ">
        Dashboard
      </h1>
      {onClose && (
        <button
          onClick={onClose}
          className="w-8   h-8 flex items-center justify-center rounded-xl bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition"
          aria-label="Закрыть меню"
        >
          ✕
        </button>
      )}
    </div>

    <nav className="space-y-2">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`relative w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${
            activeTab === index
              ? "text-blue-600"
              : "text-gray-400 hover:bg-gray-50"
          }`}
        >
          {activeTab === index && (
            <motion.div
              layoutId="activeNav"
              className="absolute inset-0 bg-blue-50 rounded-2xl -z-10"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="text-xl">{item.icon}</span>
          {item.name}
        </button>
      ))}
    </nav>
  </>
);

export default Admin;