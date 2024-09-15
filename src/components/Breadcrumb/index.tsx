'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { classNames } from '../classNames';


const Breadcrumb = () => {
  const pathname = usePathname();
  const pathArray = pathname.split('/').filter((path) => path);
    const excludedSegments = ['sv', 'gv']; // Segments to be excluded from the breadcrumb
    const filteredPathArray = pathArray.filter(path => !excludedSegments.includes(path));

  const pathNames: { [key: string]: string } = {
    chapter: 'Chuyên đề Lưu đồ thuật toán', 
    'chapter-1': 'Chương 1',
    'chapter-2': 'Chương 2', 
  };

  return (
    <nav aria-label="breadcrumb" className='w-full bg-secondary-container p-2 pl-12'>
      <h3 className="text-lg text-outline">TS. Nguyễn Tấn Trần Minh Khang</h3>
      <ol className="flex text-xl">
      {filteredPathArray.map((path, index) => {
          const href = '/' + filteredPathArray.slice(0, index + 1).join('/');
          const displayName : string = pathNames[path] || path.charAt(0).toUpperCase() + path.slice(1);
          return (
            <li key={index} className="flex items-center">
              {index !== 0 && (
                <span className="text-outline mx-2">/</span>
              )}
              <Link href={href}>
                <span className={classNames(
                  index === filteredPathArray.length - 1 ? 'text-2xl font-semibold' : 'hover:underline')}>
                  {displayName}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
