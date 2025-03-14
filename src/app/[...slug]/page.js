import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import FileNotFound from '@/Components/common/FileNotFound';

const getContent = (filePath) => {
  const fullPath = path.join(process.cwd(), 'content', filePath);
  if (!fs.existsSync(fullPath)) {
    return '404';
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content } = matter(fileContents);
  return marked(content);
};
const getTemplate = () => {
  const templatePath = path.join(process.cwd(), 'public', 'template.html');
  return fs.readFileSync(templatePath, 'utf8');
};

const Page = async ({ params }) => {
  const { slug } = await params;
  const slugJoined = await slug.join('/');
  const contentHtml = getContent(`${slugJoined}/index.md`);
  const templateHtml = getTemplate();
  const finalHtml = templateHtml.replace('{{content}}', contentHtml);

  return contentHtml !== '404' ? <div dangerouslySetInnerHTML={{ __html: finalHtml }} /> : <FileNotFound />;
};

export default Page;
