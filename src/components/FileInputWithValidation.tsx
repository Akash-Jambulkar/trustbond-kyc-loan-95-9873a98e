
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, FileText, Upload, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { APP_CONFIG } from '@/config/env';

interface FileInputWithValidationProps {
  id: string;
  label: string;
  accept?: string;
  required?: boolean;
  onChange: (file: File | null) => void;
  textOnly?: boolean;
  maxSizeInMB?: number;
}

const FileInputWithValidation: React.FC<FileInputWithValidationProps> = ({
  id,
  label,
  accept = ".txt,.pdf,.jpg,.jpeg,.png",
  required = false,
  onChange,
  textOnly = APP_CONFIG.FILE_UPLOAD_RESTRICTIONS.textOnlyForDocuments,
  maxSizeInMB = APP_CONFIG.FILE_UPLOAD_RESTRICTIONS.maxFileSizeInMB
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const validateFile = async (file: File): Promise<boolean> => {
    // Check file size
    const maxSize = maxSizeInMB * 1024 * 1024; // Convert MB to bytes
    if (file.size > maxSize) {
      setError(`File size exceeds the maximum limit of ${maxSizeInMB}MB`);
      return false;
    }

    // Check file type
    const allowedTypes = APP_CONFIG.FILE_UPLOAD_RESTRICTIONS.allowedFileTypes;
    if (!allowedTypes.includes(file.type)) {
      setError(`File type ${file.type} is not supported`);
      return false;
    }

    // For text files, check if they contain only text
    if (textOnly && file.type === 'text/plain') {
      try {
        const text = await file.text();
        // Regex to validate text-only content (letters, numbers, spaces, punctuation)
        const textOnlyRegex = /^[a-zA-Z0-9\s.,\-_:;'"!?()]+$/;
        if (!textOnlyRegex.test(text)) {
          setError("File contains invalid characters. Only text is allowed.");
          return false;
        }
      } catch (err) {
        setError("Failed to read file content");
        return false;
      }
    }

    // All validations passed
    setError(null);
    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    // Reset state
    setSelectedFile(null);
    setError(null);
    setPreview(null);
    onChange(null);
    
    if (!file) return;
    
    // Validate the file
    const isValid = await validateFile(file);
    
    if (isValid) {
      setSelectedFile(file);
      onChange(file);
      
      // Generate preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setError(null);
    setPreview(null);
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}{required && <span className="text-red-500">*</span>}</Label>
      
      {selectedFile ? (
        <div className="border rounded-md p-2 flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            <span className="text-sm truncate max-w-[200px]">{selectedFile.name}</span>
            <span className="text-xs text-muted-foreground ml-2">
              ({Math.round(selectedFile.size / 1024)} KB)
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFile} 
            type="button"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center">
            <Input
              id={id}
              type="file"
              accept={accept}
              required={required}
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById(id)?.click()}
              className="w-full flex items-center justify-center"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload {label}
            </Button>
          </div>
        </>
      )}
      
      {preview && (
        <div className="mt-2 border rounded overflow-hidden">
          <img src={preview} alt="Preview" className="max-h-40 object-contain mx-auto" />
        </div>
      )}
      
      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <p className="text-xs text-muted-foreground">
        {textOnly 
          ? "Only plain text is allowed. Max file size: " + maxSizeInMB + "MB"
          : "Supported formats: PDF, JPG, PNG, TXT. Max file size: " + maxSizeInMB + "MB"
        }
      </p>
    </div>
  );
};

export default FileInputWithValidation;
