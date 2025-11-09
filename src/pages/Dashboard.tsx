import React, { useState } from 'react';
import { Users, UserCheck, Calendar, Clock, TrendingUp, LucideIcon } from 'lucide-react';

interface Stats {
    onDuty: number;
    onLeave: number;
    onPatrol: number;
    inOffice: number;
}

interface StatCard {
    icon: LucideIcon;
    title: string;
    value: number;
    color: string;
}

interface TimeLog {
    id: number;
    date: string;
    timeIn: string;
    timeOut: string;
    status: string;
    location: string;
    duration: string;
}

const Dashboard: React.FC = () => {
    const [stats] = useState<Stats>({
        onDuty: 24,
        onLeave: 3,
        onPatrol: 8,
        inOffice: 13
    });

    const [recentLogs] = useState<TimeLog[]>([
        {
            id: 1,
            date: '2025-11-09',
            timeIn: '08:00 AM',
            timeOut: '05:00 PM',
            status: 'In Office',
            location: 'Main Office, Building A',
            duration: '9 hours'
        },
        {
            id: 2,
            date: '2025-11-08',
            timeIn: '08:15 AM',
            timeOut: '05:30 PM',
            status: 'On Patrol',
            location: 'Zone 3, District North',
            duration: '9.25 hours'
        },
        {
            id: 3,
            date: '2025-11-07',
            timeIn: '08:05 AM',
            timeOut: '05:10 PM',
            status: 'In Office',
            location: 'Main Office, Building A',
            duration: '9.08 hours'
        },
        {
            id: 4,
            date: '2025-11-06',
            timeIn: '07:55 AM',
            timeOut: '05:00 PM',
            status: 'On Patrol',
            location: 'Zone 1, District East',
            duration: '9.08 hours'
        },
        {
            id: 5,
            date: '2025-11-05',
            timeIn: '08:10 AM',
            timeOut: '05:15 PM',
            status: 'In Office',
            location: 'Main Office, Building A',
            duration: '9.08 hours'
        }
    ]);

    const statCards: StatCard[] = [
        { icon: UserCheck, title: 'On Duty', value: stats.onDuty, color: 'from-green-500 to-emerald-500' },
        { icon: Calendar, title: 'On Leave', value: stats.onLeave, color: 'from-yellow-500 to-orange-500' },
        { icon: TrendingUp, title: 'On Patrol', value: stats.onPatrol, color: 'from-cyan-500 to-blue-500' },
        { icon: Users, title: 'In Office', value: stats.inOffice, color: 'from-blue-500 to-purple-500' },
    ];

    const getStatusColor = (status: string): string => {
        const colors: Record<string, string> = {
            'In Office': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            'On Patrol': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
            'On Leave': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's your overview</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                <stat.icon className="text-white" size={28} />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</h3>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Logs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Time Logs</h2>
                        <Clock className="text-blue-500" size={24} />
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Time In
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Time Out
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Duration
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {recentLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                        {log.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                        {log.timeIn}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                        {log.timeOut}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                                            {log.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                        {log.location}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                        {log.duration}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
                    {recentLogs.map((log) => (
                        <div key={log.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-medium text-gray-900 dark:text-white">{log.date}</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                                    {log.status}
                                </span>
                            </div>
                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Time In:</span>
                                    <span className="text-gray-900 dark:text-white">{log.timeIn}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Time Out:</span>
                                    <span className="text-gray-900 dark:text-white">{log.timeOut}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                                    <span className="text-gray-900 dark:text-white">{log.duration}</span>
                                </div>
                                <div className="pt-1">
                                    <span className="text-gray-500 dark:text-gray-400">Location: </span>
                                    <span className="text-gray-900 dark:text-white">{log.location}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
