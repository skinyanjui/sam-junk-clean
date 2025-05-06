
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

/**
 * Scrolls to the first form error and focuses the element
 */
export function scrollToFirstError<T extends FieldValues>(
  form: UseFormReturn<T>,
  options?: {
    behavior?: ScrollBehavior;
    block?: ScrollLogicalPosition;
  }
): void {
  const errors = form.formState.errors;
  
  if (Object.keys(errors).length === 0) return;
  
  // Find the first error field name
  const fieldNames = Object.keys(errors) as Path<T>[];
  if (fieldNames.length === 0) return;
  
  // Get the DOM element with the error
  const fieldName = fieldNames[0];
  const element = document.querySelector(
    `[name="${fieldName}"], [id="${fieldName}"], #${fieldName}, [id="${String(fieldName).replace('.', '-')}"]`
  );
  
  if (!element) return;
  
  // Scroll to the element
  element.scrollIntoView({ 
    behavior: options?.behavior || "smooth", 
    block: options?.block || "center" 
  });
  
  // Try to focus if it's an input
  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLSelectElement
  ) {
    setTimeout(() => element.focus(), 500);
  }
}

/**
 * Formats a phone number to (XXX) XXX-XXXX
 */
export function formatPhoneNumber(value: string): string {
  if (!value) return value;
  
  // Remove all non-numeric characters
  const phoneNumber = value.replace(/[^\d]/g, "");
  
  // Apply US phone format
  if (phoneNumber.length < 4) return phoneNumber;
  if (phoneNumber.length < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

/**
 * Formats a ZIP code to #####
 */
export function formatZipCode(value: string): string {
  if (!value) return value;
  
  // Remove all non-numeric characters and limit to 5 digits
  return value.replace(/[^\d]/g, "").slice(0, 5);
}
