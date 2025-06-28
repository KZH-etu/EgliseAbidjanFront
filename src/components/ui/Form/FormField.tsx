import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select';
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  register,
  error,
  placeholder,
  required = false,
  options = [],
  rows = 4,
  className = ''
}) => {
  const baseInputClass = `form-input ${error ? 'border-error' : ''} ${className}`;

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            {...register(name, { required })}
            className={baseInputClass}
            placeholder={placeholder}
            rows={rows}
          />
        );
      case 'select':
        return (
          <select {...register(name, { required })} className={`form-select ${error ? 'border-error' : ''}`}>
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={type}
            {...register(name, { required })}
            className={baseInputClass}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      {renderInput()}
      {error && (
        <p className="mt-1 text-sm text-error">{error.message}</p>
      )}
    </div>
  );
};