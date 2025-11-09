import React, { useState, useEffect } from 'react';
import { FileText, Download, Trash2, Search, Calendar, Eye } from 'lucide-react';

interface Document {
    id: number;
    employeeName: string;
    employeeId: string;
    date: string;
    reason: string;
    description: string;
    supportingImage: string | null;
    createdAt: string;
}

const DocumentManagement: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterDate, setFilterDate] = useState<string>('');
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [showPreview, setShowPreview] = useState<boolean>(false);

    useEffect(() => {
        loadDocuments();
    }, []);

    const loadDocuments = () => {
        const savedDocuments = localStorage.getItem('documents');
        if (savedDocuments) {
            setDocuments(JSON.parse(savedDocuments));
        }
    };

    const deleteDocument = (id: number) => {
        if (window.confirm('Are you sure you want to delete this document?')) {
            const updatedDocuments = documents.filter(doc => doc.id !== id);
            setDocuments(updatedDocuments);
            localStorage.setItem('documents', JSON.stringify(updatedDocuments));
        }
    };

    const viewDocument = (document: Document) => {
        setSelectedDocument(document);
        setShowPreview(true);
    };

    const getReasonText = (reason: string): string => {
        const reasons: Record<string, string> = {
            'technical-issue': 'Technical Issue',
            'network-problem': 'Network/Connectivity Problem',
            'emergency': 'Emergency Situation',
            'equipment-failure': 'Equipment Failure',
            'medical': 'Medical Emergency',
            'other': 'Other Reason'
        };
        return reasons[reason] || reason;
    };

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate = !filterDate || doc.date === filterDate;
        return matchesSearch && matchesDate;
    });

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Document Management</h1>
                <p className="text-gray-600 dark:text-gray-400">View and manage all created documents</p>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Search Documents
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name or employee ID..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Date Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Filter by Date
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
            </div>

            {/* Results Summary */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                    <FileText size={20} />
                    <span className="font-medium">
                        {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} found
                        {searchTerm && ` for "${searchTerm}"`}
                        {filterDate && ` on ${filterDate}`}
                    </span>
                </div>
            </div>

            {/* Documents Grid */}
            {filteredDocuments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDocuments.map((doc) => (
                        <div key={doc.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                        <FileText className="text-white" size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-white">{doc.employeeName}</h3>
                                        <p className="text-sm text-blue-100">{doc.employeeId}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Date:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{doc.date}</span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Reason:</span>
                                    <span className="font-medium text-gray-900 dark:text-white text-right">{getReasonText(doc.reason)}</span>
                                </div>

                                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                        {doc.description}
                                    </p>
                                </div>

                                {doc.supportingImage && (
                                    <div className="pt-2">
                                        <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                                            <Eye size={14} />
                                            Has supporting image
                                        </span>
                                    </div>
                                )}

                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Created: {new Date(doc.createdAt).toLocaleDateString()} at {new Date(doc.createdAt).toLocaleTimeString()}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-4">
                                    <button
                                        onClick={() => viewDocument(doc)}
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        <Eye size={16} />
                                        View
                                    </button>
                                    <button
                                        onClick={() => deleteDocument(doc.id)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
                    <FileText className="mx-auto text-gray-400 mb-4" size={64} />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Documents Found</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        {searchTerm || filterDate ? 'Try adjusting your search filters' : 'No documents have been created yet'}
                    </p>
                </div>
            )}

            {/* Preview Modal */}
            {showPreview && selectedDocument && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowPreview(false)}>
                    <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-500 p-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">Document Preview</h2>
                            <button
                                onClick={() => setShowPreview(false)}
                                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                            >
                                <Eye size={24} />
                            </button>
                        </div>

                        <div className="p-8">
                            <div className="bg-white p-8 rounded-lg border-2 border-gray-200 shadow-sm">
                                {/* Company Header */}
                                <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">SMART ROSTER SYSTEM</h1>
                                    <p className="text-sm text-gray-600">Official Document</p>
                                </div>

                                {/* Document Title */}
                                <div className="text-center mb-8">
                                    <h2 className="text-xl font-bold text-gray-900 uppercase">
                                        Notice of Inability to Update Status
                                    </h2>
                                </div>

                                {/* Document Date */}
                                <div className="mb-6 text-right">
                                    <p className="text-sm text-gray-700">
                                        Date: <span className="font-semibold">{selectedDocument.date}</span>
                                    </p>
                                </div>

                                {/* Document Body */}
                                <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                                    <p>To Whom It May Concern,</p>

                                    <p>
                                        This is to inform you that <span className="font-semibold">{selectedDocument.employeeName}</span> (Employee ID: <span className="font-semibold">{selectedDocument.employeeId}</span>) was unable to update their work status on <span className="font-semibold">{selectedDocument.date}</span> due to the following reason:
                                    </p>

                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <p className="font-semibold mb-2">Reason: {getReasonText(selectedDocument.reason)}</p>
                                        <p className="text-gray-600">{selectedDocument.description}</p>
                                    </div>

                                    {selectedDocument.supportingImage && (
                                        <div className="my-6">
                                            <p className="font-semibold mb-3">Supporting Evidence:</p>
                                            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                                                <img
                                                    src={selectedDocument.supportingImage}
                                                    alt="Supporting evidence"
                                                    className="w-full max-h-96 object-contain bg-gray-50"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <p>
                                        We kindly request your understanding regarding this matter. The employee has made every effort to communicate this issue and will ensure that such incidents are minimized in the future.
                                    </p>

                                    <p className="pt-4">Respectfully submitted,</p>
                                </div>

                                {/* Signature Section */}
                                <div className="mt-12 grid grid-cols-2 gap-8">
                                    <div className="text-center">
                                        <div className="border-t-2 border-gray-400 pt-2 mt-16">
                                            <p className="font-semibold text-sm text-gray-900">{selectedDocument.employeeName}</p>
                                            <p className="text-xs text-gray-600">Employee Signature</p>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="border-t-2 border-gray-400 pt-2 mt-16">
                                            <p className="font-semibold text-sm text-gray-900">Supervisor</p>
                                            <p className="text-xs text-gray-600">Acknowledged By</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                                    <p className="text-xs text-gray-500">
                                        This document was generated on {new Date(selectedDocument.createdAt).toLocaleDateString()} at {new Date(selectedDocument.createdAt).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-700 p-6 flex justify-end gap-4 border-t border-gray-200 dark:border-gray-600">
                            <button
                                onClick={() => setShowPreview(false)}
                                className="px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentManagement;
