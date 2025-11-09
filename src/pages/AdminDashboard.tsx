import React, { useState } from 'react';
import { Users, Search, Filter, Download, Calendar, Clock } from 'lucide-react';

interface EmployeeLog {
    id: number;
    employeeId: string;
    employeeName: string;
    date: string;
    timeIn: string;
    timeOut: string;
    status: string;
    location: string;
    duration: string;
    photo: string;
}

const AdminDashboard: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [filterDate, setFilterDate] = useState<string>('');

    // Sample employee logs data
    const [employeeLogs] = useState<EmployeeLog[]>([
        {
            id: 1,
            employeeId: 'EMP-001',
            employeeName: 'John Doe',
            date: '2025-11-09',
            timeIn: '08:00 AM',
            timeOut: '05:00 PM',
            status: 'In Office',
            location: 'Main Office, Building A',
            duration: '9 hours',
            photo: '/api/placeholder/100/100'
        },
        {
            id: 2,
            employeeId: 'EMP-002',
            employeeName: 'Jane Smith',
            date: '2025-11-09',
            timeIn: '08:15 AM',
            timeOut: '05:30 PM',
            status: 'On Patrol',
            location: 'Zone 3, District North',
            duration: '9.25 hours',
            photo: '/api/placeholder/100/100'
        },
        {
            id: 3,
            employeeId: 'EMP-003',
            employeeName: 'Mike Johnson',
            date: '2025-11-09',
            timeIn: '08:05 AM',
            timeOut: '05:10 PM',
            status: 'Field Work',
            location: 'Client Site, Downtown',
            duration: '9.08 hours',
            photo: '/api/placeholder/100/100'
        },
        {
            id: 4,
            employeeId: 'EMP-001',
            employeeName: 'John Doe',
            date: '2025-11-08',
            timeIn: '07:55 AM',
            timeOut: '05:00 PM',
            status: 'On Patrol',
            location: 'Zone 1, District East',
            duration: '9.08 hours',
            photo: '/api/placeholder/100/100'
        },
        {
            id: 5,
            employeeId: 'EMP-004',
            employeeName: 'Sarah Williams',
            date: '2025-11-09',
            timeIn: '08:10 AM',
            timeOut: '05:15 PM',
            status: 'In Office',
            location: 'Main Office, Building B',
            duration: '9.08 hours',
            photo: '/api/placeholder/100/100'
        }
    ]);

    const filteredLogs = employeeLogs.filter(log => {
        const matchesSearch = log.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
        const matchesDate = !filterDate || log.date === filterDate;
        return matchesSearch && matchesStatus && matchesDate;
    });

    const getStatusColor = (status: string): string => {
        const colors: Record<string, string> = {
            'In Office': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            'On Patrol': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
            'Field Work': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
            'Meeting': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    };

    const exportToCSV = () => {
        const headers = ['Employee ID', 'Name', 'Date', 'Time In', 'Time Out', 'Status', 'Location', 'Duration'];
        const csvData = filteredLogs.map(log => [
            log.employeeId,
            log.employeeName,
            log.date,
            log.timeIn,
            log.timeOut,
            log.status,
            log.location,
            log.duration
        ]);

        const csvContent = [
            headers.join(','),
            ...csvData.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `employee-logs-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400">Monitor all employee time records and activities</p>
            </div>

            {/* Filters Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Search Employee
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name or ID..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Status
                        </label>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="all">All Status</option>
                                <option value="In Office">In Office</option>
                                <option value="On Patrol">On Patrol</option>
                                <option value="Field Work">Field Work</option>
                                <option value="Meeting">Meeting</option>
                            </select>
                        </div>
                    </div>

                    {/* Date Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Date
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Export Button */}
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={exportToCSV}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                        <Download size={20} />
                        Export to CSV
                    </button>
                </div>
            </div>

            {/* Results Summary */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                    <Users size={20} />
                    <span className="font-medium">
                        Showing {filteredLogs.length} record{filteredLogs.length !== 1 ? 's' : ''}
                        {searchTerm && ` for "${searchTerm}"`}
                        {filterStatus !== 'all' && ` • ${filterStatus}`}
                        {filterDate && ` • ${filterDate}`}
                    </span>
                </div>
            </div>

            {/* Employee Logs Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Employee Time Logs</h2>
                        <Clock className="text-blue-500" size={24} />
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Employee
                                </th>
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
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                                                {log.employeeName.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{log.employeeName}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{log.employeeId}</div>
                                            </div>
                                        </div>
                                    </td>
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

                {/* Mobile/Tablet Cards */}
                <div className="lg:hidden divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredLogs.map((log) => (
                        <div key={log.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                                    {log.employeeName.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900 dark:text-white">{log.employeeName}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{log.employeeId}</div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                                    {log.status}
                                </span>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Date:</span>
                                    <span className="text-gray-900 dark:text-white font-medium">{log.date}</span>
                                </div>
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
                                <div className="pt-1 border-t border-gray-200 dark:border-gray-700">
                                    <span className="text-gray-500 dark:text-gray-400">Location: </span>
                                    <span className="text-gray-900 dark:text-white">{log.location}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredLogs.length === 0 && (
                    <div className="p-12 text-center">
                        <Users className="mx-auto text-gray-400 mb-4" size={48} />
                        <p className="text-gray-500 dark:text-gray-400">No records found matching your filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
