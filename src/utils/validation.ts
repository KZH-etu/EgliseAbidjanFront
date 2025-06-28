// Validation utilities
export const validators = {
  required: (value: any) => !!value || 'This field is required',
  email: (value: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(value) || 'Invalid email address';
  },
  minLength: (min: number) => (value: string) => 
    value.length >= min || `Must be at least ${min} characters`,
  maxLength: (max: number) => (value: string) => 
    value.length <= max || `Must be no more than ${max} characters`,
  url: (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return 'Invalid URL format';
    }
  }
};

export const createValidationSchema = (rules: Record<string, any[]>) => {
  return Object.entries(rules).reduce((schema, [field, fieldRules]) => {
    schema[field] = {
      validate: (value: any) => {
        for (const rule of fieldRules) {
          const result = rule(value);
          if (result !== true) return result;
        }
        return true;
      }
    };
    return schema;
  }, {} as Record<string, any>);
};