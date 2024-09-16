import { FC } from 'react';
import { returnPagiationRange } from '@/components/ListGV/returnPagiationRange';
import { classNames } from '@/components/classNames';
import { PaginationProps } from '@/types';

const Pagination: FC<PaginationProps> = ({
  totalPages,
  page,
  limit,
  siblings,
  onPageChange
}) => {
  // Sử dụng hàm returnPagiationRange để tạo mảng trang
  const paginationRange = returnPagiationRange(
    totalPages,
    page,
    limit,
    siblings
  );

  return (
    <div className={classNames('mt-4 flex justify-center')}>
      <nav aria-label="Page navigation">
        <ul className={classNames('inline-flex items-center -space-x-px')}>
          {/* Nút di chuyển tới trang đầu tiên */}
          <li>
            <a
              href="#"
              onClick={() => onPageChange('&laquo;')}
              className={classNames(
                'bg-surface hover:text-gray-700 flex h-[40px] w-[80px] items-center justify-center rounded-l-2xl border border-primary text-on-primary-container hover:bg-primary-container'
              )}
            >
              &laquo;
            </a>
          </li>
          {/* Nút di chuyển lùi một trang */}
          <li>
            <a
              href="#"
              onClick={() => onPageChange('&lsaquo;')}
              className={classNames(
                'bg-surface hover:text-gray-700 flex h-[40px] w-[80px] items-center justify-center border border-primary text-on-primary-container hover:bg-primary-container'
              )}
            >
              &lsaquo;
            </a>
          </li>
          {/* Các nút cho các trang cụ thể */}
          {paginationRange.map((value, index) => (
            <li key={index}>
              <a
                href="#"
                onClick={() => onPageChange(value)}
                className={classNames(
                  'flex h-[40px] w-[80px] items-center justify-center border text-sm',
                  value === page
                    ? 'bg-secondary-container border-primary text-on-secondary-container'
                    : 'bg-surface border border-primary text-on-primary-container hover:bg-primary-container'
                )}
              >
                {value}
              </a>
            </li>
          ))}
          {/* Nút di chuyển tiến một trang */}
          <li>
            <a
              href="#"
              onClick={() => onPageChange('&rsaquo;')}
              className={classNames(
                'bg-white hover:bg-gray-100 hover:text-gray-700 flex h-[40px] w-[80px] items-center justify-center border border-primary text-on-primary-container hover:bg-primary-container'
              )}
            >
              &rsaquo;
            </a>
          </li>
          {/* Nút di chuyển tới trang cuối cùng */}
          <li>
            <a
              href="#"
              onClick={() => onPageChange('&raquo;')}
              className={classNames(
                'bg-white hover:bg-gray-100 hover:text-gray-700 flex h-[40px] w-[80px] items-center justify-center rounded-r-2xl border border-primary text-on-primary-container hover:bg-primary-container'
              )}
            >
              &raquo;
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;