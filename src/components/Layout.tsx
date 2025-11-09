import React, { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // Public layout (no sidebar)
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {children}
            </div>
        );
    }

    // Authenticated layout (with sidebar)
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <main className="lg:pl-64 pt-16 lg:pt-0 transition-all duration-300">
                <div className="p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
