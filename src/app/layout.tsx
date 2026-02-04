'use client';

import { ApolloProvider } from '@apollo/client/react';
import apolloClient from '@/lib/apolloClient';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Slooze - Inventory Management System</title>
        <meta name="description" content="Professional inventory management system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-neutral-50 dark:bg-neutral-900">
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <ThemeProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
              </div>
            </ThemeProvider>
          </AuthProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
