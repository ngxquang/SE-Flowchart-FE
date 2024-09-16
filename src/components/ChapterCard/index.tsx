import Link from 'next/link';
import ButtonOutline from '../Button/ButtonOutline';
import { ChapterCardType } from '@/types';
import ButtonSolid from '../Button/ButtonSolid';

function ChapterCard({ id, title, content, href }: ChapterCardType) {
  return (
    <Link
      className="group flex flex-col justify-between rounded-xl border-4 border-surface-variant bg-surface p-4 outline outline-1 
             outline-outline hover:border-primary hover:bg-primary hover:text-on-primary sm:w-64 lg:w-96"
      href={href}
    >
      <div className="flex flex-grow flex-col">
        <h3 className="ml-2 text-lg font-light uppercase">{title}</h3>
        <h1 className="ml-2 py-4 text-4xl font-medium uppercase">{content}</h1>
      </div>
      <div className="flex justify-end pt-8">
        <span className="group-hover:hidden">
          <ButtonOutline content="Truy cập" />
        </span>
        <span className="hidden group-hover:flex">
          <ButtonSolid content="Truy cập" isPrimary={true} />
        </span>
      </div>
    </Link>
  );
}

export default ChapterCard;
