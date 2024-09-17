'use client';

import { classNames } from '@/components/classNames';
import React, { useState, useEffect } from 'react';
import Pagination from '@/components/ListGV/Pagination';
import { useRouter } from 'next/navigation';
import ButtonBase from '@/components/Button/ButtonBase';
import { PencilIcon } from '@heroicons/react/24/solid';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import ButtonOutlineListGV from '@/components/ListGV/ButtonOutlineListGV';
import { usePaginationHandler } from '@/components/ListGV/usePaginationHandler';
import ButtonSolid from '@/components/Button/ButtonSolid';
import ButtonOutline from '@/components/Button/ButtonOutline';



const exercisesData = [
  'Bài 001: Vẽ lưu đồ: Nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả.',
  'Bài 002: Vẽ lưu đồ: Nhập vào một số nguyên n. Kiểm tra xem n có phải là số nguyên tố hay không và xuất kết quả.',
  'Bài 003: Vẽ lưu đồ: Nhập vào một số nguyên n. Tính tổng các số từ 1 đến n và xuất kết quả.',
  'Bài 004: Vẽ lưu đồ: Nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả.',
  'Bài 005: Vẽ lưu đồ: Nhập vào một số nguyên n. Kiểm tra xem n có phải là số nguyên tố hay không và xuất kết quả.',
  'Bài 006: Vẽ lưu đồ: Nhập vào một số nguyên n. Tính tổng các số từ 1 đến n và xuất kết quả.',
  'Bài 007: Vẽ lưu đồ: Nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả.',
  'Bài 008: Vẽ lưu đồ: Nhập vào một số nguyên n. Kiểm tra xem n có phải là số nguyên tố hay không và xuất kết quả.',
  'Bài 009: Vẽ lưu đồ: Nhập vào một số nguyên n. Tính tổng các số từ 1 đến n và xuất kết quả.',
  'Bài 010: Vẽ lưu đồ: Nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả.',
  'Bài 011: Vẽ lưu đồ: Nhập vào một số nguyên n. Kiểm tra xem n có phải là số nguyên tố hay không và xuất kết quả.',
  'Bài 012: Vẽ lưu đồ: Nhập vào một số nguyên n. Tính tổng các số từ 1 đến n và xuất kết quả.',
  'Bài 013: Vẽ lưu đồ: Nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả.',
  'Bài 014: Vẽ lưu đồ: Nhập vào một số nguyên n. Kiểm tra xem n có phải là số nguyên tố hay không và xuất kết quả.',
  'Bài 015: Vẽ lưu đồ: Nhập vào một số nguyên n. Tính tổng các số từ 1 đến n và xuất kết quả.',
  'Bài 016: Vẽ lưu đồ: Nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả.',
  'Bài 017: Vẽ lưu đồ: Nhập vào một số nguyên n. Kiểm tra xem n có phải là số nguyên tố hay không và xuất kết quả.',
  'Bài 018: Vẽ lưu đồ: Nhập vào một số nguyên n. Tính tổng các số từ 1 đến n và xuất kết quả.',
  'Bài 019: Vẽ lưu đồ: Nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả.',
  'Bài 020: Vẽ lưu đồ: Nhập vào một số nguyên n. Kiểm tra xem n có phải là số nguyên tố hay không và xuất kết quả.',
  'Bài 021: Vẽ lưu đồ: Nhập vào một số nguyên n. Tính tổng các số từ 1 đến n và xuất kết quả.',
  'Bài 022: Vẽ lưu đồ: Nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả.',
  'Bài 023: Vẽ lưu đồ: Nhập vào một số nguyên n. Kiểm tra xem n có phải là số nguyên tố hay không và xuất kết quả.',
  'Bài 024: Vẽ lưu đồ: Nhập vào một số nguyên n. Tính tổng các số từ 1 đến n và xuất kết quả.',
  'Bài 001: Vẽ lưu đồ: Nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả.',
  'Bài 002: Vẽ lưu đồ: Nhập vào một số nguyên n. Kiểm tra xem n có phải là số nguyên tố hay không và xuất kết quả.',
  'Bài 003: Vẽ lưu đồ: Nhập vào một số nguyên n. Tính tổng các số từ 1 đến n và xuất kết quả.',
  'Bài 004: Vẽ lưu đồ: Nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả.',
  'Bài 005: Vẽ lưu đồ: Nhập vào một số nguyên n. Kiểm tra xem n có phải là số nguyên tố hay không và xuất kết quả.',
  'Bài 006: Vẽ lưu đồ: Nhập vào một số nguyên n. Tính tổng các số từ 1 đến n và xuất kết quả.',
  'Bài 007: Vẽ lưu đồ: Nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả.',
  'Bài 008: Vẽ lưu đồ: Nhập vào một số nguyên n. Kiểm tra xem n có phải là số nguyên tố hay không và xuất kết quả.',
  'Bài 009: Vẽ lưu đồ: Nhập vào một số nguyên n. Tính tổng các số từ 1 đến n và xuất kết quả.',
  'Bài 010: Vẽ lưu đồ: Nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả.',
  'Bài 011: Vẽ lưu đồ: Nhập vào một số nguyên n. Kiểm tra xem n có phải là số nguyên tố hay không và xuất kết quả.',
  'Bài 012: Vẽ lưu đồ: Nhập vào một số nguyên n. Tính tổng các số từ 1 đến n và xuất kết quả.',
  'Bài 013: Vẽ lưu đồ: Nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả.',
  'Bài 014: Vẽ lưu đồ: Nhập vào một số nguyên n. Kiểm tra xem n có phải là số nguyên tố hay không và xuất kết quả.',
  'Bài 015: Vẽ lưu đồ: Nhập vào một số nguyên n. Tính tổng các số từ 1 đến n và xuất kết quả.',
  'Bài 016: Vẽ lưu đồ: Nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả.',
  'Bài 017: Vẽ lưu đồ: Nhập vào một số nguyên n. Kiểm tra xem n có phải là số nguyên tố hay không và xuất kết quả.',
  'Bài 018: Vẽ lưu đồ: Nhập vào một số nguyên n. Tính tổng các số từ 1 đến n và xuất kết quả.',
  'Bài 019: Vẽ lưu đồ: Nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả.',
  'Bài 020: Vẽ lưu đồ: Nhập vào một số nguyên n. Kiểm tra xem n có phải là số nguyên tố hay không và xuất kết quả.',
  'Bài 021: Vẽ lưu đồ: Nhập vào một số nguyên n. Tính tổng các số từ 1 đến n và xuất kết quả.',
  'Bài 022: Vẽ lưu đồ: Nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả.',
  'Bài 023: Vẽ lưu đồ: Nhập vào một số nguyên n. Kiểm tra xem n có phải là số nguyên tố hay không và xuất kết quả.',
  'Bài 024: Vẽ lưu đồ: Nhập vào một số nguyên n. Tính tổng các số từ 1 đến n và xuất kết quả.',
  'Bài 001: Vẽ lưu đồ: Nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả.',
  'Bài 002: Vẽ lưu đồ: Nhập vào một số nguyên n. Kiểm tra xem n có phải là số nguyên tố hay không và xuất kết quả.',
  'Bài 003: Vẽ lưu đồ: Nhập vào một số nguyên n. Tính tổng các số từ 1 đến n và xuất kết quả.',
  'Bài 004: Vẽ lưu đồ: Nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả.',
  'Bài 005: Vẽ lưu đồ: Nhập vào một số nguyên n. Kiểm tra xem n có phải là số nguyên tố hay không và xuất kết quả.',
  'Bài 006: Vẽ lưu đồ: Nhập vào một số nguyên n. Tính tổng các số từ 1 đến n và xuất kết quả.',
  'Bài 007: Vẽ lưu đồ: Nhập tọa độ hai điểm (x1, y1) và (x2, y2). Tính khoảng cách giữa chúng và xuất kết quả.',
  'Bài 008: Vẽ lưu đồ: Nhập vào một số nguyên n. Kiểm tra xem n có phải là số nguyên tố hay không và xuất kết quả.',
];


const ITEMS_PER_PAGE = 10;

function formatNumExercise(num: number): string {
  return num.toString().padStart(3, '0');
}

// Sau này custom lại thành fetch API
const fetchExercises = (
  exercises: string[],
  currentPage: number,
  limit: number
) => {
  return exercises.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  ) as string[];
};

export default function ListGV() {
  const [exercises, setExercises] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(exercisesData.length / ITEMS_PER_PAGE)
  );

  // Sử dụng useState để lưu trạng thái của các nút
  const [isChoosedExercise, setIsChoosedExercise] = useState<boolean[]>(
    new Array(ITEMS_PER_PAGE).fill(false)
  );

  const handlePageChange = usePaginationHandler(
    setCurrentPage,
    currentPage,
    totalPages
  );

  // Chọn nhiều bài cùng lúc
  const handleButtonChoose = (index: number) => {
    const updatedChoices = [...isChoosedExercise]; // Tạo một bản sao của mảng trạng thái hiện tại
    updatedChoices[index] = !updatedChoices[index]; // Đảo ngược trạng thái tại vị trí `index`
    setIsChoosedExercise(updatedChoices); // Cập nhật lại state
  };

  useEffect(() => {
    // Lấy danh sách bài tập cho trang hiện tại
    const GetExercises = fetchExercises(
      exercisesData,
      currentPage,
      ITEMS_PER_PAGE
    );
    setExercises(GetExercises);

    // Cập nhật tổng số trang khi exercisesData thay đổi
    setTotalPages(Math.ceil(exercisesData.length / ITEMS_PER_PAGE));

    // Sang page mới thì phải cập nhật lại
    setIsChoosedExercise(new Array(ITEMS_PER_PAGE).fill(false));
  }, [currentPage, exercisesData]);
  // Thêm exercisesData vào dependencies để lắng nghe thay đổi
  // Cập nhật trạng thái nút khi exercises thay đổi

  return (
    <div
      className={classNames(
        'mt-10 w-full sm:max-w-[100%] sm:flex-row md:max-w-[80%] lg:max-w-[70%]'
      )}
    >
      <div className={classNames('flex justify-end gap-8')}>
        {/**handle xoá */}
        {isChoosedExercise.some((choosed) => choosed === true) ? (
          <div className={classNames('bg-on-secondary')} onClick={() => {}}>
            <ButtonOutline
              iconLeft={<TrashIcon className={classNames('size-6')} />}
              className={classNames(
                'h-full rounded-xl border-2 border-primary active:brightness-90'
              )}
            />
          </div>
        ) : (
          ''
        )}
        {/** handle Tạo */}
        <div onClick={() => {}}>
          <ButtonSolid
            iconLeft={
              <PlusIcon className={classNames('size-6 text-on-primary')} />
            }
            content={'Tạo'}
            isPrimary={true}
            className={classNames(
              'h-[56px] w-[152px] items-center justify-center rounded-xl active:brightness-90'
            )}
          />
        </div>
      </div>
      <div
        className={classNames(
          'mt-10 w-full rounded-tl-xl rounded-tr-xl text-2xl text-on-primary'
        )}
      >
        {/* Header Row */}
        <div className={classNames('flex w-full bg-primary rounded-tl-xl rounded-tr-xl')}>
          <div
            className={classNames(
              'basis-[8%] items-center border-r-2 border-on-primary py-2 text-center'
            )}
          >
            Bài
          </div>
          <div
            className={classNames(
              'basis-[72%] items-center border-r-2 border-on-primary py-2 pl-4'
            )}
          >
            Đề bài
          </div>
          <div
            className={classNames(
              'basis-[20%] items-center overflow-hidden truncate text-ellipsis whitespace-nowrap py-2 text-center'
            )}
          >
            Chức năng
          </div>
        </div>

        {/* Content Rows */}
        {exercises.length !== 0 ? (
          exercises.map((exercise, index) => {
            return (
              <div
                key={index}
                className={classNames(
                  'flex w-full items-center text-2xl text-primary',
                  isChoosedExercise[index] === true
                    ? 'bg-secondary-container'
                    : index % 2 === 0
                    ? 'bg-surface'
                    : 'bg-primary-container'
                )}
              >
                <div
                  className={classNames(
                    'basis-[8%] items-center border-r-2 border-primary py-2 text-center'
                  )}
                >
                  {formatNumExercise(
                    index + 1 + (currentPage - 1) * ITEMS_PER_PAGE
                  )}
                </div>
                <div
                  className={classNames(
                    'basis-[72%] items-center overflow-hidden truncate text-ellipsis whitespace-nowrap border-r-2 border-primary px-2 py-2 pl-4'
                  )}
                >
                  {exercise}
                </div>
                <div
                  className={classNames(
                    'flex basis-[20%] justify-center gap-8 rounded-xl'
                  )}
                  onClick={() => {}} //handle khi click vào button chỉnh sửa
                >
                  <ButtonBase
                    className={classNames('bg-primary !px-2 !py-2')}
                    iconLeft={
                      <PencilIcon
                        className={classNames('size-6 stroke-on-primary')}
                      />
                    }
                  />
                  <div
                    onClick={() => {
                      handleButtonChoose(index);
                    }}
                  >
                    <ButtonOutlineListGV
                      className={classNames('!px-2 !py-2')}
                      index={index}
                      isChoosed={isChoosedExercise[index]}
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div
            className={classNames(
              'flex w-full items-center justify-center text-center text-2xl text-primary'
            )}
          >
            No data found
          </div>
        )}

        {/* Pagination */}
        <div className={classNames('mb-10 mt-10 bg-surface')}>
          <Pagination
            totalPages={totalPages}
            page={currentPage}
            limit={10}
            siblings={1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
