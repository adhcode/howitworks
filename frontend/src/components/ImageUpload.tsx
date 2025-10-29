'use client';

import { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  onFilesChange?: (files: File[]) => void;
  maxImages?: number;
  className?: string;
}

export default function ImageUpload({ 
  images, 
  onImagesChange, 
  onFilesChange,
  maxImages = 10,
  className = '' 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Validate files
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach(file => {
      if (!validTypes.includes(file.type)) {
        errors.push(`${file.name} is not a valid image type`);
      } else if (file.size > maxSize) {
        errors.push(`${file.name} is too large (max 5MB)`);
      } else {
        validFiles.push(file);
      }
    });

    // Show errors if any
    if (errors.length > 0) {
      const errorMessage = errors.length === 1 
        ? errors[0] 
        : `${errors.length} files have issues:\n${errors.join('\n')}`;
      alert(errorMessage);
    }

    if (validFiles.length === 0) return;

    setUploading(true);
    
    try {
      // Create object URLs for immediate preview
      const newImageUrls: string[] = [];
      validFiles.forEach(file => {
        newImageUrls.push(URL.createObjectURL(file));
      });

      const updatedImages = [...images, ...newImageUrls].slice(0, maxImages);
      const updatedFiles = [...files, ...validFiles].slice(0, maxImages);
      
      setFiles(updatedFiles);
      onImagesChange(updatedImages);
      onFilesChange?.(updatedFiles);

      // Show success message
      if (validFiles.length > 0) {
        const message = validFiles.length === 1 
          ? '1 image ready for upload' 
          : `${validFiles.length} images ready for upload`;
        
        // Create a temporary success indicator
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 transition-opacity';
        successDiv.textContent = message;
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
          successDiv.style.opacity = '0';
          setTimeout(() => {
            document.body.removeChild(successDiv);
          }, 300);
        }, 2000);
      }
    } catch (error) {
      console.error('Error processing images:', error);
      alert('Error processing images. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedFiles = files.filter((_, i) => i !== index);
    
    // Revoke object URL to prevent memory leaks
    if (images[index].startsWith('blob:')) {
      URL.revokeObjectURL(images[index]);
    }
    
    setFiles(updatedFiles);
    onImagesChange(updatedImages);
    onFilesChange?.(updatedFiles);
  };

  const canAddMore = images.length < maxImages;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Property Images ({images.length}/{maxImages})
        </label>
        {canAddMore && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className="h-4 w-4" />
            {uploading ? 'Uploading...' : 'Add Images'}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {images.length === 0 ? (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Click to upload property images
          </p>
          <p className="text-xs text-gray-500">
            PNG, JPG, GIF up to 10MB each
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Property image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  Main
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>The first image will be used as the main property image.</span>
        {uploading && (
          <span className="flex items-center gap-1 text-blue-600">
            <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </span>
        )}
      </div>
    </div>
  );
}