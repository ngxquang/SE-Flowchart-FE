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
import { InputListGVProps } from '@/types';
import Modal_taoBT from '@/components/Modal';

const ITEMS_PER_PAGE = 10;

export default function ListGV({
  id = [],
  lessonName = [],
  description = [],
  lessonGroupName = [],
  lengthData = 0,
  chapter = 0
}: InputListGVProps) {
  //   // Các giá trị sau khi state được cập nhật
  // console.log('lessonName in ListGV: ', lessonName);
  // console.log('description in ListGV: ', description);
  // console.log('lessonGroupName in ListGV: ', lessonGroupName);
  // console.log('lengthData in ListGV: ', lengthData);

  const router = useRouter();
  const [currentPageLessons, setCurrentPageLessons] = useState<number>(1);
  const [totalPagesLessons, setTotalPagesLessons] = useState<number>(
    Math.ceil(lengthData / ITEMS_PER_PAGE)
  );

  // Sử dụng useState để lưu trạng thái của các Lessons
  const [isChoosedLessonGroup, setIsChoosedLessonGroup] = useState<boolean[]>(
    new Array(ITEMS_PER_PAGE).fill(false)
  );

  // Chọn nhiều bài cùng lúc
  const handleButtonChooseLessonGroup = (index: number) => {
    const updatedChoices = [...isChoosedLessonGroup]; // Tạo một bản sao của mảng trạng thái hiện tại
    updatedChoices[index] = !updatedChoices[index]; // Đảo ngược trạng thái tại vị trí `index`
    setIsChoosedLessonGroup(updatedChoices); // Cập nhật lại state
  };

  const handleLessonPageChange = usePaginationHandler(
    setCurrentPageLessons,
    currentPageLessons,
    totalPagesLessons
  );

  //Exercises cho 1 trang
  const [lessons, setLessons] = useState<string[]>([]);

  const fetchLessons = (
    lessonName: string[],
    currentPageLessons: number,
    limit: number
  ): string[] => {
    if (lessonName.length === 0) return []; // Nếu không có dữ liệu thì trả về mảng trống

    const startIndex = (currentPageLessons - 1) * limit;
    const endIndex = currentPageLessons * limit;

    // Đảm bảo không vượt qua giới hạn của mảng
    return lessonName.slice(startIndex, Math.min(endIndex, lessonName.length));
  };

  useEffect(() => {
    // Kiểm tra xem `lessonName` có giá trị trước khi phân trang
    if (lessonName.length > 0) {
      const GetLessons = fetchLessons(
        lessonName,
        currentPageLessons,
        ITEMS_PER_PAGE
      );

      setLessons(GetLessons);
      setTotalPagesLessons(Math.ceil(lessonName.length / ITEMS_PER_PAGE));

      // Reset selection when switching pages
      setIsChoosedLessonGroup(new Array(ITEMS_PER_PAGE).fill(false));
    }
  }, [currentPageLessons, lessonName, lengthData]);

  // console.log('lessons: ', lessons);

  const handleClickToLesson = (lesson: number) => {
    router.push(`/lesson/${lesson}/editor`);
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
    console.log(isModalOpen);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={classNames(
        'mt-10 w-full sm:max-w-[100%] sm:flex-row md:max-w-[80%] lg:max-w-[70%]'
      )}
    >
      <div className={classNames('flex justify-end gap-8')}>
        {/**handle xoá */}
        {isChoosedLessonGroup.some((choosed) => choosed === true) ? (
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
        <div onClick={() => handleOpenModal}>
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
        <div
          className={classNames(
            'flex w-full rounded-tl-xl rounded-tr-xl bg-primary'
          )}
        >
          <div
            className={classNames(
              'basis-[20%] items-center border-r-2 border-on-primary py-2 text-center'
            )}
          >
            Bài
          </div>
          <div
            className={classNames(
              'basis-[60%] items-center border-r-2 border-on-primary py-2 pl-4'
            )}
          >
            Nhóm bài
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
        {lessons.length !== 0 ? (
          lessons.map((lesson, index) => {
            return (
              <div
                key={index}
                className={classNames(
                  'flex w-full items-center text-2xl text-primary',
                  isChoosedLessonGroup[index] === true
                    ? 'bg-secondary-container'
                    : index % 2 === 0
                    ? 'bg-surface'
                    : 'bg-primary-container'
                )}
              >
                <div
                  className={classNames(
                    'basis-[20%] items-center border-r-2 border-primary py-2 text-center'
                  )}
                >
                  {lesson}
                </div>
                <div
                  className={classNames(
                    'basis-[60%] items-center overflow-hidden truncate text-ellipsis whitespace-nowrap border-r-2 border-primary px-2 py-2 pl-4'
                  )}
                >
                  {
                    lessonGroupName[
                      index + (currentPageLessons - 1) * ITEMS_PER_PAGE
                    ]
                  }
                </div>
                <div
                  className={classNames(
                    'flex basis-[20%] justify-center gap-8 rounded-xl'
                  )}
                >
                  {/* Button Navi */}
                  <div
                    onClick={() =>
                      handleClickToLesson(
                        id[index + (currentPageLessons - 1) * ITEMS_PER_PAGE]
                      )
                    }
                  >
                    <ButtonBase
                      className={classNames('bg-primary !px-2 !py-2')}
                      iconLeft={
                        <PencilIcon
                          className={classNames('size-6 stroke-on-primary')}
                        />
                      }
                    />
                  </div>
                  <div
                    onClick={() => {
                      handleButtonChooseLessonGroup(index);
                    }}
                  >
                    <ButtonOutlineListGV
                      className={classNames('!px-2 !py-2')}
                      index={index}
                      isChoosed={isChoosedLessonGroup[index]}
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
            totalPages={totalPagesLessons}
            page={currentPageLessons}
            limit={10}
            siblings={1}
            onPageChange={handleLessonPageChange}
          />
        </div>
      </div>
      {isModalOpen && <Modal_taoBT />}
    </div>
  );
}
