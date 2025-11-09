import React, { useState, useRef, useEffect, FormEvent, ChangeEvent } from 'react';
import { Camera, MapPin, Clock, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface Location {
    latitude: number;
    longitude: number;
    accuracy: number;
}

interface Message {
    type: 'success' | 'error';
    text: string;
}

type RecordType = 'in' | 'out';

const TimeRecord: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [location, setLocation] = useState<Location | null>(null);
    const [status, setStatus] = useState<string>('');
    const [customStatus, setCustomStatus] = useState<string>('');
    const [recordType, setRecordType] = useState<RecordType>('in');
    const [message, setMessage] = useState<Message | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    console.log('Component render - isCameraOn:', isCameraOn, 'capturedImage:', !!capturedImage);

    const statusOptions: string[] = [
        'On Patrol',
        'In Office',
        'Field Work',
        'Meeting',
        'Others'
    ];

    useEffect(() => {
        // Get location on component mount
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    });
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setMessage({ type: 'error', text: 'Could not get location. Please enable location services.' });
                }
            );
        }

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    const startCamera = async (): Promise<void> => {
        try {
            console.log('Starting camera...');
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                },
                audio: false
            });

            console.log('Got media stream:', mediaStream);

            // Set state first to trigger re-render
            setStream(mediaStream);
            setIsCameraOn(true);

            // Then set video source after a small delay to ensure DOM is updated
            setTimeout(() => {
                if (videoRef.current) {
                    console.log('Setting video source');
                    videoRef.current.srcObject = mediaStream;

                    // Ensure video plays
                    videoRef.current.onloadedmetadata = () => {
                        console.log('Video metadata loaded, playing...');
                        videoRef.current?.play().catch(err => {
                            console.error('Error playing video:', err);
                        });
                    };
                }
            }, 100);
        } catch (error) {
            console.error('Error accessing camera:', error);
            setMessage({ type: 'error', text: 'Could not access camera. Please grant camera permission.' });
        }
    };

    const stopCamera = (): void => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsCameraOn(false);
    };

    const capturePhoto = (): void => {
        if (!location) {
            setMessage({ type: 'error', text: 'Location not available. Please wait or enable location services.' });
            return;
        }

        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas) {
            const context = canvas.getContext('2d');
            if (!context) return;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Draw video frame
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Add overlay with location and timestamp
            const now = new Date();
            const dateStr = now.toLocaleDateString();
            const timeStr = now.toLocaleTimeString();

            // Semi-transparent overlay at bottom
            context.fillStyle = 'rgba(0, 0, 0, 0.6)';
            context.fillRect(0, canvas.height - 100, canvas.width, 100);

            // Text styling
            context.fillStyle = 'white';
            context.font = 'bold 16px Arial';

            // Date and time
            context.fillText(`📅 ${dateStr} | ⏰ ${timeStr}`, 20, canvas.height - 65);

            // Location
            context.fillText(
                `📍 ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`,
                20,
                canvas.height - 35
            );

            const imageData = canvas.toDataURL('image/png');
            setCapturedImage(imageData);
            stopCamera();
        }
    };

    const retakePhoto = (): void => {
        setCapturedImage(null);
        startCamera();
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (!capturedImage) {
            setMessage({ type: 'error', text: 'Please capture a photo first.' });
            return;
        }

        if (!status) {
            setMessage({ type: 'error', text: 'Please select a status.' });
            return;
        }

        if (status === 'Others' && !customStatus) {
            setMessage({ type: 'error', text: 'Please specify your status.' });
            return;
        }

        // In production, this would send data to the server
        const recordData = {
            type: recordType,
            timestamp: new Date().toISOString(),
            location: location,
            status: status === 'Others' ? customStatus : status,
            image: capturedImage
        };

        console.log('Time record submitted:', recordData);

        setMessage({
            type: 'success',
            text: `Successfully recorded time ${recordType === 'in' ? 'in' : 'out'}!`
        });

        // Reset form
        setTimeout(() => {
            setCapturedImage(null);
            setStatus('');
            setCustomStatus('');
            setMessage(null);
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Time Record</h1>
                <p className="text-gray-600 dark:text-gray-400">Capture your photo with location verification</p>
            </div>

            {/* Record Type Selector */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-lg mb-6 flex gap-2">
                <button
                    onClick={() => setRecordType('in')}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${recordType === 'in'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                >
                    Time In
                </button>
                <button
                    onClick={() => setRecordType('out')}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${recordType === 'out'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                >
                    Time Out
                </button>
            </div>

            {/* Message */}
            {message && (
                <div className={`flex items-center gap-3 p-4 rounded-xl mb-6 ${message.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                    }`}>
                    {message.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                    <span className="font-medium">{message.text}</span>
                </div>
            )}

            {/* Camera Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
                {!isCameraOn && !capturedImage && (
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <Camera className="text-white" size={40} />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">Ready to capture</p>
                        <button
                            onClick={startCamera}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                        >
                            <Camera size={20} />
                            Start Camera
                        </button>
                    </div>
                )}

                {isCameraOn && !capturedImage && (
                    <div className="relative">
                        <div className="relative aspect-video bg-black">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-cover"
                            />
                            {/* Live Preview Overlay */}
                            {location && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                    <div className="text-white text-sm space-y-1">
                                        <p className="font-semibold">📅 {new Date().toLocaleDateString()} | ⏰ {new Date().toLocaleTimeString()}</p>
                                        <p>📍 {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-6 flex gap-4 justify-center">
                            <button
                                onClick={capturePhoto}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                            >
                                <Camera size={24} />
                                Capture Photo
                            </button>
                            <button
                                onClick={stopCamera}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:shadow-md transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {capturedImage && (
                    <div className="relative">
                        <img src={capturedImage} alt="Captured" className="w-full h-auto" />
                        <div className="p-6 flex justify-center">
                            <button
                                onClick={retakePhoto}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-600 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                            >
                                <RotateCcw size={20} />
                                Retake Photo
                            </button>
                        </div>
                    </div>
                )}

                <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Location Info */}
            {location && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 flex items-start gap-4">
                    <MapPin className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Current Location</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                        </p>
                        <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                            Accuracy: ±{location.accuracy.toFixed(0)}m
                        </p>
                    </div>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">Select Status</option>
                        {statusOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                {status === 'Others' && (
                    <div>
                        <label htmlFor="customStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Specify Status
                        </label>
                        <input
                            type="text"
                            id="customStatus"
                            value={customStatus}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomStatus(e.target.value)}
                            placeholder="Enter your specific status"
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!capturedImage}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    <Clock size={20} />
                    Submit Time {recordType === 'in' ? 'In' : 'Out'}
                </button>
            </form>
        </div>
    );
};

export default TimeRecord;
