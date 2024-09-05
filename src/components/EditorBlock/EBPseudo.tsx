import Image from 'next/image';
import React from 'react';

const EBPseudo = ({ onCollapse }: { onCollapse: () => void }) => {
  return (
    <div className="h-full w-full overflow-hidden rounded-xl border border-outline">
      <div className="flex items-center  justify-center bg-primary-container px-3 py-2">
        <div
          className="flex size-6 justify-center rounded-full border border-primary "
          onClick={onCollapse}
        >
          <Image
            alt="dropdown-icon"
            src={'/icons/up.svg'}
            width={10}
            height={5}
            className="select-none"
          />
        </div>
      </div>
      <aside className="z-10 float-left h-full w-4 bg-outline-var"></aside>
      <div className="ml-4 h-full w-full bg-secondary"></div>
    </div>
  );
};

export default EBPseudo;
