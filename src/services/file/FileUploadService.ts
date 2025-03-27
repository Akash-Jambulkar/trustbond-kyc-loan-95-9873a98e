
import { validateTextOnly } from '../database/mongoConnection';
import { toast } from 'sonner';
import { APP_CONFIG } from '../../config/env';

interface UploadResult {
  success: boolean;
  filename?: string;
  fileUrl?: string;
  error?: string;
}

/**
 * Service for handling file uploads with validation
 */
export class FileUploadService {
  /**
   * Validates if a file meets the required criteria
   */
  static validateFile(file: File): { valid: boolean; error?: string } {
    // Validate file type
    const allowedTypes = APP_CONFIG.FILE_UPLOAD_RESTRICTIONS.allowedFileTypes;
    if (!allowedTypes.includes(file.type)) {
      return { 
        valid: false, 
        error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}` 
      };
    }

    // Validate file size
    const maxSizeInBytes = APP_CONFIG.FILE_UPLOAD_RESTRICTIONS.maxFileSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return { 
        valid: false, 
        error: `File too large. Maximum size: ${APP_CONFIG.FILE_UPLOAD_RESTRICTIONS.maxFileSizeInMB}MB` 
      };
    }

    return { valid: true };
  }

  /**
   * Validates text content from a file
   */
  static async validateTextContent(file: File): Promise<{ valid: boolean; error?: string }> {
    try {
      // Only validate text content for text files
      if (file.type !== 'text/plain') {
        return { valid: true };
      }

      const text = await file.text();
      
      if (!validateTextOnly(text)) {
        return { 
          valid: false, 
          error: 'File contains invalid characters. Only text characters are allowed.' 
        };
      }
      
      return { valid: true };
    } catch (error) {
      console.error('Error validating text content:', error);
      return { valid: false, error: 'Failed to validate text content' };
    }
  }

  /**
   * Handles file upload with validation
   */
  static async uploadFile(file: File, walletAddress: string): Promise<UploadResult> {
    try {
      // Step 1: Validate file
      const fileValidation = this.validateFile(file);
      if (!fileValidation.valid) {
        toast.error(fileValidation.error);
        return { success: false, error: fileValidation.error };
      }

      // Step 2: Validate text content if needed
      if (APP_CONFIG.FILE_UPLOAD_RESTRICTIONS.textOnlyForDocuments) {
        const textValidation = await this.validateTextContent(file);
        if (!textValidation.valid) {
          toast.error(textValidation.error);
          return { success: false, error: textValidation.error };
        }
      }

      // Step 3: Prepare file metadata
      const timestamp = Date.now();
      const safeFileName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
      const uniqueFilename = `${walletAddress}_${timestamp}_${safeFileName}`;
      
      // In a real application, you would upload to a storage service
      // For now, we'll create an object URL for demonstration
      const fileUrl = URL.createObjectURL(file);
      
      toast.success('File uploaded successfully');
      
      return {
        success: true,
        filename: uniqueFilename,
        fileUrl: fileUrl
      };
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
      return { success: false, error: error.message || 'Upload failed' };
    }
  }
}
