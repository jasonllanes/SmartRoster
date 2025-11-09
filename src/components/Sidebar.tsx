import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
    LayoutDashboard,
    Camera,
    User,
    LogOut,
    Menu,
    X,
    Sun,
    Moon,
    ChevronLeft,
    ChevronRight,
    LucideIcon,
    Shield,
    FileText,
    FolderOpen,
    ChevronDown
} from 'lucide-react';

// Get base URL for assets
const getAssetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

interface MenuItem {
    path: string;
    icon: LucideIcon;
    label: string;
}

const Sidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

    // Check if user is admin (you can modify this logic based on your user object)
    const isAdmin = user?.email === 'admin@smartroster.com' || user?.role === 'admin';

    const regularMenuItems: MenuItem[] = [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/time-record', icon: Camera, label: 'Time In/Out' },
        { path: '/create-document', icon: FileText, label: 'Create Document' },
        { path: '/documents', icon: FolderOpen, label: 'Documents' },
    ];

    const adminMenuItems: MenuItem[] = [
        { path: '/admin-dashboard', icon: Shield, label: 'Admin Dashboard' },
    ];

    const menuItems = isAdmin ? [...adminMenuItems, ...regularMenuItems] : regularMenuItems;

    const handleLogout = (): void => {
        logout();
        navigate('/login');
    };

    const toggleSidebar = (): void => {
        setIsOpen(!isOpen);
    };

    const toggleMobileMenu = (): void => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            {/* Top Bar with Profile Menu */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50 flex items-center justify-between px-4">
                <div className="flex flex-col items-center gap-1">
                    <img
                        src={getAssetUrl('assets/smart_roster_logo.png')}
                        alt="Smart Roster Logo"
                        className="h-12 w-12 object-contain"
                    />
                    <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        Smart Roster
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {/* Profile Dropdown - Mobile */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <User size={16} />
                                )}
                            </div>
                            <ChevronDown size={16} className={`transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Profile Dropdown Menu */}
                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                                </div>
                                <Link
                                    to="/profile"
                                    onClick={() => setShowProfileMenu(false)}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <User size={16} />
                                    My Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <LogOut size={16} />
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 top-16"
                    onClick={toggleMobileMenu}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40
          transition-all duration-300 ease-in-out
          ${isOpen ? 'w-64' : 'w-20'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                {/* Logo Section */}
                <div className="h-42 flex items-center justify-center px-4 border-b border-gray-200 dark:border-gray-700">
                    {isOpen && (
                        <div className="flex flex-col items-center gap-2">
                            <img
                                src={getAssetUrl('assets/smart_roster_logo.png')}
                                alt="Smart Roster Logo"
                                className="h-32 w-32 object-contain"
                            />
                            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                Smart Roster
                            </span>
                        </div>
                    )}
                    {!isOpen && (
                        <img
                            src={getAssetUrl('assets/smart_roster_logo.png')}
                            alt="Smart Roster Logo"
                            className="h-10 w-10 object-contain mx-auto"
                        />
                    )}
                    <button
                        onClick={toggleSidebar}
                        className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors absolute right-2"
                    >
                        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </button>
                </div>

                {/* User Profile Section - Desktop with Dropdown */}
                <div className="hidden lg:block p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className={`w-full flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors ${!isOpen && 'justify-center'}`}
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                                {user?.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <User size={20} />
                                )}
                            </div>
                            {isOpen && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                        {user?.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {user?.email}
                                    </p>
                                </div>
                            )}
                            {isOpen && <ChevronDown size={16} className={`transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />}
                        </button>

                        {/* Desktop Profile Dropdown Menu */}
                        {showProfileMenu && isOpen && (
                            <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                                <Link
                                    to="/profile"
                                    onClick={() => setShowProfileMenu(false)}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <User size={16} />
                                    My Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <LogOut size={16} />
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }
                  ${!isOpen && 'justify-center'}
                `}
                            >
                                <Icon size={20} className="flex-shrink-0" />
                                {isOpen && <span className="font-medium">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    <button
                        onClick={toggleTheme}
                        className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
              text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700
              ${!isOpen && 'justify-center'}
            `}
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        {isOpen && <span className="font-medium">
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </span>}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
