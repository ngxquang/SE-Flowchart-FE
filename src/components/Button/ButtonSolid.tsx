import { ButtonProps } from '@/types';
import { classNames } from '../classNames';
import ButtonBase from './ButtonBase';

const ButtonSolid = ({
  content,
  isPrimary = false,
  isDisabled = false,
  iconLeft,
  iconRight,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonBase
      content={content}
      isDisabled={isDisabled}
      iconLeft={iconLeft}
      iconRight={iconRight}
      onClick={onClick}
      className={classNames(
        'text-on-primary',
        isPrimary
          ? 'bg-secondary'
          : 'bg-primary'
      )}
    />
  );
};

export default ButtonSolid;
