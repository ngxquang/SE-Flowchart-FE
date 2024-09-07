import { ButtonProps } from '@/types';
import { classNames } from '../classNames';
import ButtonBase from './ButtonBase';

const ButtonOutline = ({
  content,
  isPrimary = false,
  isDisabled = false,
  iconLeft,
  iconRight,
  onClick
}: ButtonProps) => {
  return (
    <ButtonBase
      content={content}
      isDisabled={isDisabled}
      iconLeft={iconLeft}
      iconRight={iconRight}
      onClick={onClick}
      className={classNames(
        'border border-outline ',
        isPrimary
          ? 'hover:border-secondary hover:bg-secondary hover:text-on-secondary'
          : 'hover:border-primary hover:bg-primary hover:text-on-primary'
      )}
    />
  );
};

export default ButtonOutline;
