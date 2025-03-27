
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileUploadService } from '@/services/file/FileUploadService';
import { toast } from 'sonner';
import { UploadCloud, AlertCircle, CheckCircle, File } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TextFileInputProps {
  onFileUpload: (file: File, url: string, filename: string) => void;
  walletAddress: string;
  label?: string;
  accept?: string;
  maxSizeMB?: number;
}

const TextFileInput: React.FC<TextFileInputProps> = ({
  onFileUpload,
  walletAddress,
  label = 'Upload Document',
  accept = '.txt,.pdf,.png,.jpg,.jpeg',
  maxSizeMB = 5
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setIsValid(false);
    
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    
    try {
      // Validate file on selection
      const validation = FileUploadService.validateFile(selectedFile);
      if (!validation.valid) {
        setError(validation.error || 'Invalid file');
        return;
      }
      
      // Additional text validation for text files
      if (selectedFile.type === 'text/plain') {
        setIsUploading(true);
        const textValidation = await FileUploadService.validateTextContent(selectedFile);
        if (!textValidation.valid) {
          setError(textValidation.error || 'Invalid text content');
          setIsUploading(false);
          return;
        }
      }
      
      setIsValid(true);
      setIsUploading(false);
    } catch (err: any) {
      setError(err.message || 'Error validating file');
      setIsUploading(false);
    }
  };

  const handleUpload = async () => {
    if (!file || !walletAddress) return;
    
    setIsUploading(true);
    setError(null);
    
    try {
      const result = await FileUploadService.uploadFile(file, walletAddress);
      
      if (result.success && result.fileUrl && result.filename) {
        onFileUpload(file, result.fileUrl, result.filename);
        setIsValid(true);
        toast.success('File validated and ready for submission');
      } else {
        setError(result.error || 'Upload failed');
        setIsValid(false);
      }
    } catch (err: any) {
      setError(err.message || 'Upload failed');
      setIsValid(false);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">{label}</div>
      
      <div className="flex items-center gap-2">
        <Input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        
        <Button
          type="button"
          variant="outline"
          onClick={triggerFileInput}
          className="flex-grow"
          disabled={isUploading}
        >
          <UploadCloud className="mr-2 h-4 w-4" />
          Select File
        </Button>
        
        {file && (
          <Button
            type="button"
            onClick={handleUpload}
            disabled={isUploading || !!error}
            className="whitespace-nowrap"
          >
            {isUploading ? 'Validating...' : 'Validate File'}
          </Button>
        )}
      </div>
      
      {file && (
        <div className="p-3 border rounded-md bg-muted/50 flex items-center gap-2">
          <File className="h-5 w-5 text-muted-foreground" />
          <div className="text-sm truncate flex-1">{file.name}</div>
          <div className="text-xs text-muted-foreground whitespace-nowrap">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </div>
          {isValid && <CheckCircle className="h-4 w-4 text-green-500" />}
        </div>
      )}
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="text-xs text-muted-foreground">
        Accepted file types: {accept.split(',').join(', ')} (Max: {maxSizeMB}MB)
      </div>
    </div>
  );
};

export default TextFileInput;
