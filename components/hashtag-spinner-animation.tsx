import React, { useEffect, useState } from 'react';

interface HashtagSpinnerAnimationProps {
  keywords?: string[];
}

export const HashtagSpinnerAnimation = ({
  keywords = ['fashion', 'politics', 'tech', 'lifestyle', 'sports'],
}: HashtagSpinnerAnimationProps) => {
  const [keyword, setKeyword] = useState(keywords[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((index) => (index >= keywords.length - 1 ? 0 : index + 1));
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => setKeyword(() => keywords[index]), [index]);

  return (
    <div className="text-white animate-textintro w-48">
      #{keyword}
      <span className="text-pink-300 font-bold text-4xl">.</span>
    </div>
  );
};
