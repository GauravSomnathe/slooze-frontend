'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Sidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  if (!user) return null;

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      roles: ['manager'],
    },
    {
      name: 'Products',
      href: '/products',
      roles: ['manager', 'store_keeper'],
    },
    {
      name: 'Add Product',
      href: '/products/add',
      roles: ['manager', 'store_keeper'],
    },
  ];

  return (
    <aside className="h-screen w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-5 text-xl font-bold text-indigo-600 dark:text-indigo-400">
        Slooze CMS
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 space-y-1">
        {menuItems
          .filter(item => item.roles.includes(user.role))
          .map(item => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
                ${
                  pathname === item.href
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
            >
              <span>{item.name}</span>
            </Link>
          ))}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="m-4 flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-800 rounded-lg"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
