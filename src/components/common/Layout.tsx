import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="p-4 bg-blue-500">
        <h1 className="text-xl font-bold">My App</h1>
      </header>
      <main className="flex-1 p-4">{children}</main>
      <footer className="p-4 bg-blue-500 text-center">© 2025 My App. All rights reserved.</footer>
    </div>
  );
};

export default Layout;
