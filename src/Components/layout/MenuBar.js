import React from 'react';
import { FolderIcon } from '../icons'; // Example import, adjust based on your project
import Link from 'next/link'; // Import Link from react-router-dom

const MenuBar = ({contentFiles}) => {
  return (
    <div className="lg:w-1/3 w-full flex flex-col items-center bg-white p-4 rounded-xl shadow-lg">
      <h1 className="w-full text-center text-xl border-b border-[#F9C001] pb-2 lg:py-2">
        Available paths
      </h1>

      <ul className="lg:w-full flex flex-row gap-3 md:gap-6 flex-wrap lg:flex-col lg:gap-0 bg-white rounded-xl mt-3">
        {contentFiles.map((file) => (
          <li
            key={file}
            className="py-3 lg:border-b lg:border-[#C0C2C3] hover:text-[#F9C001] cursor-pointer"
          >
            <Link href={file} className="flex flex-row gap-3 items-center">
              <FolderIcon className="w-6 h-6" />
              <p key={file}>{file}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
``
export default MenuBar;
