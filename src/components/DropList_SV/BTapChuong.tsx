'use client';
import { classNames } from '@/components/classNames';
import { useRouter } from 'next/navigation';

export default function ExerciseComp({
  ExerciseTitle,
  url
}: {
  ExerciseTitle: string;
  url: string;
}) {
  const route = useRouter();
  const navigateExercise = () => {
    route.push(`/${url}`);
  };

  return (
    <div
    className={classNames("w-full mt-4 rounded-xl h-[80px] max-w-full")}
    >
      <div
        className={classNames("flex rounded-xl h-[80px] cursor-pointer items-center justify-between bg-on-primary hover:bg-primary-container px-4 py-2 text-on-primary-container border-2 border-outline-focus")}
        onClick={navigateExercise}
      >
        <div className={classNames("flex items-center h-[80px] max-w-[90%]")}>
          <div className={classNames("border-outline-focus h-[80px] border-l-8")}></div>
          <div className={classNames("flex-1 ml-4 mr-4 md:text-2xl overflow-hidden text-ellipsis whitespace-nowrap")}>
            <span className={classNames("sm:text-xl")}>{ExerciseTitle}</span>
          </div>
        </div>
        <div
          className={classNames(
            "flex items-center justify-center p-2 rounded-full border-2 border-outline-focus"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={classNames('size-4')}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}