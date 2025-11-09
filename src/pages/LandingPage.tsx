import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, MapPin, Camera, BarChart3, Moon, Sun, LucideIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Get base URL for assets
const getAssetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

interface Feature {
    icon: LucideIcon;
    title: string;
    desc: string;
}

const LandingPage: React.FC = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    const features: Feature[] = [
        { icon: Clock, title: 'Time Tracking', desc: 'Accurate time-in and time-out records with timestamps' },
        { icon: Camera, title: 'Photo Verification', desc: 'Camera capture with location and time overlay for authenticity' },
        { icon: MapPin, title: 'GPS Location', desc: 'Real-time location tracking for field work verification' },
        { icon: Users, title: 'Status Management', desc: 'Track duty status: On Patrol, In Office, On Leave, and more' },
        { icon: BarChart3, title: 'Dashboard Analytics', desc: 'Comprehensive overview of attendance and work patterns' },
        { icon: Clock, title: 'Daily Logs', desc: 'Complete history of all time records and activities' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <img
                                src={getAssetUrl('assets/smart_roster_logo.png')}
                                alt="Smart Roster Logo"
                                className="h-10 w-10 object-contain"
                            />
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                Smart Roster
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                {isDarkMode ? <Sun size={20} className="text-gray-700 dark:text-gray-300" /> : <Moon size={20} className="text-gray-700" />}
                            </button>
                            <Link
                                to="/login"
                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                        Welcome to{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            Smart Roster
                        </span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                        Modern daily time record system with GPS tracking and camera verification
                    </p>
                    <Link
                        to="/login"
                        className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
                    >
                        Get Started
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
                        Powerful Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                                    <feature.icon className="text-white" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 shadow-2xl">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Ready to get started?
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Join Smart Roster today and streamline your time tracking
                    </p>
                    <Link
                        to="/login"
                        className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
                    >
                        Login Now
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto text-center text-gray-600 dark:text-gray-400">
                    <p>&copy; 2025 Smart Roster. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
