import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const getContent = (filePath) => {
  const fullPath = path.join(process.cwd(), 'content', filePath);
  if (!fs.existsSync(fullPath)) {
    return '404 Not Found';
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content } = matter(fileContents);
  return marked(content);
};
const getTemplate = () => {
  const templatePath = path.join(process.cwd(), 'public', 'template.html');
  return fs.readFileSync(templatePath, 'utf8');
};

const Page = ({ params }) => {
  const slug = params.slug.join('/');
  const contentHtml = getContent(`${slug}/index.md`);
  const templateHtml = getTemplate();
  const finalHtml = templateHtml.replace('{{content}}', contentHtml);

  return <div dangerouslySetInnerHTML={{ __html: finalHtml }} />;
};

export default Page;
