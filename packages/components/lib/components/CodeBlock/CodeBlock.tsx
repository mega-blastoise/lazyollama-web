import React, { JSX, useState } from 'react';
import './CodeBlock.css';
import { CodeBlockProps } from './types';


export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'javascript',
  showLineNumbers = true,
  showCopyButton = true,
  title,
  theme = 'auto',
  className = '',
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const codeBlockClasses = [
    'sb-code-block',
    `sb-code-block-${theme}`,
    className
  ].filter(Boolean).join(' ');

  const lines = code.split('\n');

  return (
    <div className={codeBlockClasses}>
      {title && (
        <div className="sb-code-block-header">
          <div className="sb-code-block-title">
            {title}
          </div>
          <div className="sb-code-block-language">
            {language}
          </div>
        </div>
      )}
      
      <div className="sb-code-block-content">
        {showCopyButton && (
          <button
            className="sb-code-block-copy-button"
            onClick={handleCopyClick}
            aria-label="Copy code"
            title="Copy code"
          >
            {isCopied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        )}
        
        <pre className="sb-code-block-pre">
          {showLineNumbers && (
            <div className="sb-code-block-line-numbers">
              {lines.map((_, index) => (
                <div key={index} className="sb-code-block-line-number">
                  {index + 1}
                </div>
              ))}
            </div>
          )}
          <code className={`sb-code-block-code language-${language}`}>
            {lines.map((line, index) => (
              <div key={index} className="sb-code-block-line">
                {highlightSyntax(line, language)}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

// Basic syntax highlighting
// Note: In a real implementation, you might want to use a library like Prism.js or highlight.js
const highlightSyntax = (line: string, language: string): JSX.Element => {
  // This is a very simplified syntax highlighting implementation
  // For a real app, use a proper syntax highlighting library
  
  // For demonstration purposes, we'll just highlight a few common tokens
  const tokenizeJavaScript = (text: string) => {
    // Keywords
    text = text.replace(
      /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|default|switch|case|break|continue)\b/g,
      '<span class="sb-token-keyword">$1</span>'
    );
    
    // Numbers
    text = text.replace(
      /\b(\d+(\.\d+)?)\b/g,
      '<span class="sb-token-number">$1</span>'
    );
    
    // Strings
    text = text.replace(
      /(["'`])(.*?)\1/g,
      '<span class="sb-token-string">$1$2$1</span>'
    );
    
    // Comments
    text = text.replace(
      /(\/\/.*$)|(\/\*[\s\S]*?\*\/)/gm,
      '<span class="sb-token-comment">$1$2</span>'
    );
    
    return text;
  };
  
  // Different tokenizers for different languages
  const tokenize = (text: string, lang: string) => {
    switch (lang) {
      case 'javascript':
      case 'js':
      case 'jsx':
      case 'typescript':
      case 'ts':
      case 'tsx':
        return tokenizeJavaScript(text);
      default:
        return text;
    }
  };
  
  // Tokenize the line
  const html = tokenize(line, language);
  
  // Return JSX element with dangerously set HTML
  return <span dangerouslySetInnerHTML={{ __html: html || '&nbsp;' }} />;
};

export default CodeBlock;