import { InputProps } from '@/types';
import { classNames } from '../classNames';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/solid';

function InputAssignment({
  title,
  valid = 'default',
  placeholder,
  value,
  readOnly = false,
  onChange,
  required = false,
  type = 'text'
}: InputProps) {
  const handleInputChange = (e: any) => {
    const value = e.target.value;
    onChange(value);
  };

  const borderClass =
    valid === 'error'
      ? 'border-error'
      : valid === 'success'
      ? 'border-success'
      : 'border-outline';

  return (
    <div className="relative my-1 w-1/6 min-w-12">
      <input
        className={classNames(
          'w-full rounded border bg-surface px-1 focus:border-outline-focus focus:outline focus:outline-4 focus:outline-primary-container',
          borderClass
        )}
        value={value}
        placeholder={placeholder}
        id={title}
        readOnly={readOnly}
        disabled={readOnly}
        onChange={handleInputChange}
        required={required}
        type={type}
      />
      {valid === 'error' && (
        <XMarkIcon className="absolute right-2 top-2 h-6 w-6 cursor-pointer text-error" />
      )}
      {valid === 'success' && (
        <CheckIcon className="absolute right-2 top-2 h-6 w-6 text-success" />
      )}
    </div>
  );
}

export default InputAssignment;
