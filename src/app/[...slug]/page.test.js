import { render } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Page from './page';
import FileNotFound from '@/Components/common/FileNotFound';

jest.mock('fs');
jest.mock('path');
jest.mock('gray-matter', () => jest.fn());
jest.mock('marked', () => ({ marked: jest.fn() }));

const mockParams = { params: { slug: ['test-slug'] } };

const mockMarkdownContent = '## Mock Markdown Content';
const mockHtmlContent = '<h2>Mock Markdown Content</h2>';
const mockTemplate = '<html><body>{{content}}</body></html>';

fs.existsSync.mockImplementation((filePath) => {
  return filePath.includes('index.md');
});

fs.readFileSync.mockImplementation((filePath) => {
  if (filePath.includes('template.html')) {
    return mockTemplate;
  }
  if (filePath.includes('index.md')) {
    return mockMarkdownContent;
  }
  return '';
});

matter.mockReturnValue({ content: mockMarkdownContent });
marked.mockReturnValue(mockHtmlContent);

path.join.mockImplementation((...paths) => paths.join('/'));

describe('Page Component', () => {
  it('renders content when file exists', async () => {
    const { container } = render(await Page(mockParams));
    expect(container.innerHTML).toContain(mockHtmlContent);
  });

  it('renders FileNotFound component when file does not exist', async () => {
    fs.existsSync.mockReturnValue(false);
    jest.mock('./page', () => jest.fn(() => <FileNotFound />));
    const { container } = render(await Page(mockParams));
    expect(container.innerHTML).toContain('NOT FOUND');
  });

  it('should replace the {{content}} placeholder in the template', async () => {
    fs.existsSync.mockReturnValue(true);
    const { container } = render(await Page(mockParams));
    expect(container.innerHTML).not.toContain('{{content}}');
    expect(container.innerHTML).toContain(mockHtmlContent);
  });
});
