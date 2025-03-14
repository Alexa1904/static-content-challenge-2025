import fs from 'fs';
import path from 'path';
import { render } from '@testing-library/react';
import Page from './page';
import { marked } from 'marked';
import matter from 'gray-matter';

jest.mock('fs');
jest.mock('path');
jest.mock('marked', () => ({
  marked: jest.fn(),
}));
jest.mock('gray-matter', () => jest.fn());

describe('Page Component', () => {
  const mockParams = { slug: ['test'] };
  const fullPath = mockParams?.slug?.join('/');
  const mockFilePath = `/content/${fullPath}/index.md`;
  const mockTemplatePath = '/public/template.html';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render valid content for an existing file', () => {

    path.join.mockImplementation((...args) => {
      if (args.includes('content')) {
        return mockFilePath;
      }
      if (args.includes('public')) {
        return mockTemplatePath;
      }
      return args.join('/');
    });

    fs.existsSync.mockImplementation((filePath) => filePath === mockFilePath || filePath === mockTemplatePath);
    fs.readFileSync.mockImplementation((filePath) => {
      if (filePath === mockFilePath) {
        return '---\ntitle: Test\n---\n# Test Content';
      }
      if (filePath === mockTemplatePath) {
        return '<html><body>{{content}}</body></html>';
      }
      return filePath;
    });

    matter.mockReturnValue({ content: '# Test Content' });
    marked.mockReturnValue('<h1 id="test-content">Test Content</h1>');

    const { container } = render(<Page params={mockParams} />);
    expect(container.innerHTML).toContain('<h1 id="test-content">Test Content</h1>');
    expect(fs.existsSync).toHaveBeenCalledWith(mockFilePath);
    expect(fs.readFileSync).toHaveBeenCalledWith(mockFilePath, 'utf8');
    expect(fs.readFileSync).toHaveBeenCalledWith(mockTemplatePath, 'utf8');
    expect(matter).toHaveBeenCalledWith('---\ntitle: Test\n---\n# Test Content');
    expect(marked).toHaveBeenCalledWith('# Test Content');
  });

  it('should render "404 Not Found" for a non-existent file', () => {
    const mockFilePath = '/content/nonexistent/index.md';

    path.join.mockImplementation((...args) => {
      if (args.includes('content')) {
        return mockFilePath;
      }
      if (args.includes('public')) {
        return mockTemplatePath;
      }
      return args.join('/');
    });
    fs.existsSync.mockReturnValue(false);

    const params = { slug: ['nonexistent'] };
    const { container } = render(<Page params={params} />);
    expect(container.innerHTML).toContain('404 Not Found');
    expect(fs.existsSync).toHaveBeenCalledWith(mockFilePath);
  });

  it('should replace the {{content}} placeholder in the template', () => {
    path.join.mockImplementation((...args) => {
      if (args.includes('content')) {
        return mockFilePath;
      }
      if (args.includes('public')) {
        return mockTemplatePath;
      }
      return args.join('/');
    });
    fs.existsSync.mockImplementation((filePath) => filePath === mockFilePath || filePath === mockTemplatePath);
    fs.readFileSync.mockImplementation((filePath) => {
      if (filePath === mockFilePath) {
        return '---\ntitle: Test\n---\n# Test Content';
      }
      if (filePath === mockTemplatePath) {
        return '<html><body>{{content}}</body></html>';
      }
      throw new Error(`Unexpected file path: ${filePath}`);
    });

    matter.mockReturnValue({ content: '# Test Content' });
    marked.mockReturnValue('<h1 id="test-content">Test Content</h1>');

    const { container } = render(<Page params={mockParams} />);
    expect(container.innerHTML).not.toContain('{{content}}');
    expect(container.innerHTML).toContain('<h1 id="test-content">Test Content</h1>');
  });

  // it('should handle invalid Markdown content gracefully', () => {
  //   const mockFilePath = '/content/test/index.md';
  //   const mockTemplatePath = '/public/template.html';

  //   path.join.mockImplementation((...args) => args.join('/'));
  //   fs.existsSync.mockImplementation((filePath) => filePath === mockFilePath || filePath === mockTemplatePath);
  //   fs.readFileSync.mockImplementation((filePath) => {
  //     if (filePath === mockFilePath) {
  //       return 'Invalid Markdown Content';
  //     }
  //     if (filePath === mockTemplatePath) {
  //       return '<html><body>{{content}}</body></html>';
  //     }
  //     throw new Error(`Unexpected file path: ${filePath}`);
  //   });

  //   matter.mockReturnValue({ content: 'Invalid Markdown Content' });
  //   marked.mockReturnValue('<p>Invalid Markdown Content</p>');

  //   const { container } = render(<Page params={mockParams} />);
  //   expect(container.innerHTML).toContain('<p>Invalid Markdown Content</p>');
  // });
});
