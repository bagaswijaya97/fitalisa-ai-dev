import React, { useEffect, useState } from 'react';

const StreamingHTML: React.FC<{ htmlString: string; speed?: number }> = ({
  htmlString,
  speed = -5, // milliseconds per character
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [streamedHtml, setStreamedHtml] = useState('');

  useEffect(() => {
    if (currentIndex < htmlString.length) {
      const timeout = setTimeout(() => {
        const nextIndex = currentIndex + 1;
        setStreamedHtml(htmlString.slice(0, nextIndex));
        setCurrentIndex(nextIndex);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, htmlString, speed]);

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: streamedHtml }}
    />
  );
};

export default StreamingHTML;
