"use client";

import { useRoleGuard } from "@/hooks/useRoleGuard";

export default function DashboardPage() {
  useRoleGuard(["manager"]);

  const stats = [
    {
      title: "Total Products",
      value: "1,234",
      icon: "📦",
      color: "bg-blue-100 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Low Stock Items",
      value: "24",
      icon: "⚠️",
      color: "bg-warning/10",
      textColor: "text-warning",
    },
    {
      title: "Total Categories",
      value: "18",
      icon: "🏷️",
      color: "bg-success/10",
      textColor: "text-success",
    },
    {
      title: "Revenue Today",
      value: "₹45,230",
      icon: "💰",
      color: "bg-primary/10",
      textColor: "text-primary",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Welcome back! Here&apos;s your inventory overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card animate-slideInDown"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`text-3xl ${stat.color} rounded-lg p-3`}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-1">
                {stat.title}
              </p>
              <p className={`text-3xl font-bold ${stat.textColor}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 card animate-fadeIn">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
              Recent Orders
            </h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((order) => (
                <div
                  key={order}
                  className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">
                      Order #{1000 + order}
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      2 hours ago
                    </p>
                  </div>
                  <span className="badge badge-success">Completed</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card animate-fadeIn">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="btn btn-primary w-full text-left text-sm">
                ➕ Add Product
              </button>
              <button className="btn btn-secondary w-full text-left text-sm">
                📊 View Reports
              </button>
              <button className="btn btn-secondary w-full text-left text-sm">
                👥 Manage Users
              </button>
              <button className="btn btn-secondary w-full text-left text-sm">
                ⚙️ Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
