import fs from 'fs';
import path from 'path';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import MenuBar from '@/Components/layout/MenuBar';
import Header from '@/Components/layout/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const findContentFiles = (fullPath, files) => {
  const contentFiles = [];
  files.forEach((file) => {
    if (file === '.DS_Store') {
      return; // Skip .DS_Store files
    }
    let subFilePath = path.join(fullPath, file);
    while (fs.existsSync(subFilePath) && fs.statSync(subFilePath).isDirectory()) {
      const subFiles = fs.readdirSync(subFilePath);
      if (subFiles.includes('index.md')) {
        const sliced = subFilePath.replace(fullPath, '');
        contentFiles.push(sliced);
        break;
      }
      subFilePath = path.join(subFilePath, subFiles[0]);
    }
  });
  return contentFiles;
};

export default function RootLayout({ children }) {
  const fullPath = path.join(process.cwd(), 'content');
  const files = fs.readdirSync(fullPath);
  const contentFiles = findContentFiles(fullPath, files);
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="w-full flex flex-col items-center bg-[#EBEBEC] min-h-screen text-[#343A3E]">
          <Header />
          <div className="w-11/12 bg-[#EBEBEC] flex flex-col lg:flex-row lg:justify-center gap-5 lg:gap-7">
            <MenuBar contentFiles={contentFiles} />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
