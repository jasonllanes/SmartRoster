import React, { useState, useRef } from 'react';
import { FileText, Image, Download, Save, X, Upload } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface DocumentFormData {
    employeeName: string;
    employeeId: string;
    date: string;
    reason: string;
    description: string;
    supportingImage: string | null;
}

const CreateDocument: React.FC = () => {
    const [formData, setFormData] = useState<DocumentFormData>({
        employeeName: '',
        employeeId: '',
        date: new Date().toISOString().split('T')[0],
        reason: 'technical-issue',
        description: '',
        supportingImage: null
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const documentRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImagePreview(result);
                setFormData(prev => ({
                    ...prev,
                    supportingImage: result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setFormData(prev => ({
            ...prev,
            supportingImage: null
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
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

    const generatePDF = async () => {
        if (!documentRef.current) return;

        setIsGenerating(true);
        try {
            const canvas = await html2canvas(documentRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 10;

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save(`Unable-to-Update-Status-${formData.employeeId}-${formData.date}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const saveDocument = () => {
        // Save to localStorage or backend
        const savedDocuments = localStorage.getItem('documents');
        const documents = savedDocuments ? JSON.parse(savedDocuments) : [];

        const newDocument = {
            ...formData,
            id: Date.now(),
            createdAt: new Date().toISOString()
        };

        documents.push(newDocument);
        localStorage.setItem('documents', JSON.stringify(documents));

        alert('Document saved successfully!');

        // Reset form
        setFormData({
            employeeName: '',
            employeeId: '',
            date: new Date().toISOString().split('T')[0],
            reason: 'technical-issue',
            description: '',
            supportingImage: null
        });
        setImagePreview(null);
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Document</h1>
                <p className="text-gray-600 dark:text-gray-400">Generate official letter for unable to update status</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <FileText className="text-blue-500" size={24} />
                        Document Information
                    </h2>

                    <form className="space-y-4">
                        {/* Employee Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Employee Name *
                            </label>
                            <input
                                type="text"
                                name="employeeName"
                                value={formData.employeeName}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter employee name"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Employee ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Employee ID *
                            </label>
                            <input
                                type="text"
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={handleInputChange}
                                required
                                placeholder="e.g., EMP-001"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Date *
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Reason */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Reason *
                            </label>
                            <select
                                name="reason"
                                value={formData.reason}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="technical-issue">Technical Issue</option>
                                <option value="network-problem">Network/Connectivity Problem</option>
                                <option value="emergency">Emergency Situation</option>
                                <option value="equipment-failure">Equipment Failure</option>
                                <option value="medical">Medical Emergency</option>
                                <option value="other">Other Reason</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                rows={4}
                                placeholder="Provide detailed explanation..."
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                            />
                        </div>

                        {/* Supporting Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Supporting Image (Optional)
                            </label>
                            {!imagePreview ? (
                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer"
                                    onClick={() => fileInputRef.current?.click()}>
                                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Click to upload image or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                        PNG, JPG up to 10MB
                                    </p>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </div>
                            ) : (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={saveDocument}
                                disabled={!formData.employeeName || !formData.employeeId || !formData.description}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save size={20} />
                                Save Document
                            </button>
                            <button
                                type="button"
                                onClick={generatePDF}
                                disabled={!formData.employeeName || !formData.employeeId || !formData.description || isGenerating}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Download size={20} />
                                {isGenerating ? 'Generating...' : 'Download PDF'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Preview Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Document Preview</h2>

                    <div ref={documentRef} className="bg-white p-8 rounded-lg border-2 border-gray-200 shadow-sm" style={{ minHeight: '600px' }}>
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
                                Date: <span className="font-semibold">{formData.date || '____/____/________'}</span>
                            </p>
                        </div>

                        {/* Document Body */}
                        <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                            <p>To Whom It May Concern,</p>

                            <p>
                                This is to inform you that <span className="font-semibold">{formData.employeeName || '[Employee Name]'}</span> (Employee ID: <span className="font-semibold">{formData.employeeId || '[Employee ID]'}</span>) was unable to update their work status on <span className="font-semibold">{formData.date || '[Date]'}</span> due to the following reason:
                            </p>

                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <p className="font-semibold mb-2">Reason: {getReasonText(formData.reason)}</p>
                                <p className="text-gray-600">
                                    {formData.description || '[Detailed description will appear here]'}
                                </p>
                            </div>

                            {formData.supportingImage && (
                                <div className="my-6">
                                    <p className="font-semibold mb-3">Supporting Evidence:</p>
                                    <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                                        <img
                                            src={formData.supportingImage}
                                            alt="Supporting evidence"
                                            className="w-full max-h-64 object-contain bg-gray-50"
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
                                    <p className="font-semibold text-sm text-gray-900">{formData.employeeName || '[Employee Name]'}</p>
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
                                This document was generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateDocument;
