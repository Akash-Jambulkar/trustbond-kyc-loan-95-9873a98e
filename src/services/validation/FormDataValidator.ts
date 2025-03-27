
import { validateTextOnly, validateNumeric } from '../database/mongoConnection';
import { toast } from 'sonner';

/**
 * Service for validating form data
 */
export class FormDataValidator {
  /**
   * Validates text input to ensure it contains only valid characters
   */
  static validateTextField(value: string, fieldName: string): { valid: boolean; error?: string } {
    if (!value.trim()) {
      return { valid: false, error: `${fieldName} is required` };
    }
    
    if (!validateTextOnly(value)) {
      return { 
        valid: false, 
        error: `${fieldName} contains invalid characters. Only text characters are allowed.` 
      };
    }
    
    return { valid: true };
  }
  
  /**
   * Validates email format
   */
  static validateEmail(email: string): { valid: boolean; error?: string } {
    if (!email.trim()) {
      return { valid: true }; // Email can be optional
    }
    
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, error: 'Please enter a valid email address' };
    }
    
    return { valid: true };
  }
  
  /**
   * Validates phone number format
   */
  static validatePhone(phone: string): { valid: boolean; error?: string } {
    if (!phone.trim()) {
      return { valid: true }; // Phone can be optional
    }
    
    const phoneRegex = /^[0-9+\-\s()]{7,20}$/;
    if (!phoneRegex.test(phone)) {
      return { valid: false, error: 'Please enter a valid phone number' };
    }
    
    return { valid: true };
  }
  
  /**
   * Validates numeric input
   */
  static validateNumericField(value: string, fieldName: string): { valid: boolean; error?: string } {
    if (!value.trim()) {
      return { valid: false, error: `${fieldName} is required` };
    }
    
    if (!validateNumeric(value)) {
      return { 
        valid: false, 
        error: `${fieldName} must be a valid number` 
      };
    }
    
    return { valid: true };
  }
  
  /**
   * Validates a complete user profile form
   */
  static validateUserProfile(data: any): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};
    
    // Validate required fields
    const fullNameValidation = this.validateTextField(data.fullName || '', 'Full Name');
    if (!fullNameValidation.valid) {
      errors.fullName = fullNameValidation.error || 'Invalid full name';
    }
    
    // Validate optional fields if provided
    if (data.email) {
      const emailValidation = this.validateEmail(data.email);
      if (!emailValidation.valid) {
        errors.email = emailValidation.error || 'Invalid email';
      }
    }
    
    if (data.phone) {
      const phoneValidation = this.validatePhone(data.phone);
      if (!phoneValidation.valid) {
        errors.phone = phoneValidation.error || 'Invalid phone number';
      }
    }
    
    if (data.nationality) {
      const nationalityValidation = this.validateTextField(data.nationality, 'Nationality');
      if (!nationalityValidation.valid) {
        errors.nationality = nationalityValidation.error || 'Invalid nationality';
      }
    }
    
    if (data.residentialAddress) {
      const addressValidation = this.validateTextField(data.residentialAddress, 'Residential Address');
      if (!addressValidation.valid) {
        errors.residentialAddress = addressValidation.error || 'Invalid address';
      }
    }
    
    return { 
      valid: Object.keys(errors).length === 0,
      errors
    };
  }
}
