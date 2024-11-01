import { InputProps } from '@/types';
import { classNames } from '../classNames';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef } from 'react';

function InputAssignment({
  title,
  valid = 'default',
  placeholder,
  value,
  readOnly = false,
  onChange,
  required = false,
  type = 'text',
  onEnter,
  autoFocus = false
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Automatically focus the input if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    onChange(value);
  };

  // Handle the key down event to detect 'Enter' key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter(value); // Trigger the onEnter prop when Enter is pressed
    }
  };

  const borderClass =
    valid === 'error'
      ? 'border-error'
      : valid === 'success'
      ? 'border-success'
      : 'border-outline';

  return (
    <div className="relative my-1 w-1/3 min-w-12">
      <input
        ref={inputRef} // Set the ref to the input element
        className={classNames(
          'w-full rounded border bg-surface px-1 focus:border-outline-focus focus:outline focus:outline-4 focus:outline-primary-container',
          borderClass,
          valid === 'success' ? 'bg-[#E8F0FE]' : 'first-letter:'
        )}
        value={value}
        placeholder={placeholder}
        id={title}
        readOnly={readOnly}
        disabled={readOnly}
        onChange={handleInputChange}
        required={required}
        type={type}
        onKeyDown={handleKeyDown}
      />
      {valid === 'error' && (
        <XMarkIcon className="absolute right-1 top-0 h-6 w-6 cursor-pointer text-error" />
      )}
      {valid === 'success' && (
        <CheckIcon className="absolute right-1 top-0 h-6 w-6 text-success" />
      )}
    </div>
  );
}

export default InputAssignment;
