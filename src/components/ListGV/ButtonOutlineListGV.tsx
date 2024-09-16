import { ButtonPropsCusGV } from '@/types';
import { classNames } from '@/components/classNames';
import ButtonBase from '@/components/Button/ButtonBase';
import {
  EllipsisHorizontalCircleIcon
} from '@heroicons/react/24/solid';

const ButtonOutlineListSV = ({
  content,
  isPrimary = false,
  isDisabled = false,
  iconLeft,
  iconRight,
  onClick,
  index,
  isChoosed
}: ButtonPropsCusGV) => {
  const handleClick = () => {
    if (onClick) {
      onClick;
    }
  };
  return isChoosed === false ? (
    <ButtonBase
      content={content}
      isPrimary={isPrimary}
      isDisabled={isDisabled}
      iconLeft={
        <EllipsisHorizontalCircleIcon
          fillOpacity={0}
          className={classNames(
            'size-6 rounded-2xl bg-primary !px-2 !py-2 hover:bg-outline',
            index % 2 === 0 ? 'bg-surface' : 'bg-primary-container'
          )}
        />
      }
      iconRight={iconRight}
      onClick={handleClick}
      className={classNames(
        // 'border border-primary ',
        'border-4 border-primary !px-1 !py-1 text-on-primary',
        // choosed === true ? 'bg-primary' : 'bg-on-primary',
        isDisabled ? 'cursor-not-allowed opacity-50' : '' // Disable styles if needed,
      )}
    />
  ) : (
    <ButtonBase
      content={content}
      isPrimary={isPrimary}
      isDisabled={isDisabled}
      iconLeft={
        <EllipsisHorizontalCircleIcon
          className={classNames('size-6 rounded-2xl bg-primary !px-2 !py-2')}
        />
      }
      iconRight={iconRight}
      onClick={handleClick}
      className={classNames(
        // 'border border-primary ',
        'border-4 border-primary !px-1 !py-1 text-on-primary',
        // choosed === true ? 'bg-primary' : 'bg-on-primary',
        isDisabled ? 'cursor-not-allowed opacity-50' : '' // Disable styles if needed,
      )}
    />
  );
};
export default ButtonOutlineListSV;
