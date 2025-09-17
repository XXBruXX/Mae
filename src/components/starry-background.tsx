'use client';

import { useEffect, useState, memo } from 'react';

const Star = memo(({ sizeClass, top, left, animationDelay }: { sizeClass: string; top: string; left: string; animationDelay: string }) => (
  <div
    className={`star absolute bg-white rounded-full animate-twinkle ${sizeClass}`}
    style={{ top, left, animationDelay }}
  />
));
Star.displayName = 'Star';

const StarryBackground = () => {
  const [stars, setStars] = useState<{ sizeClass: string; top: string; left: string; animationDelay: string }[]>([]);

  useEffect(() => {
    const starCount = 150;
    const generatedStars = [];

    for (let i = 0; i < starCount; i++) {
      const size = Math.random();
      let sizeClass = 'w-px h-px'; // small
      if (size > 0.9) {
        sizeClass = 'w-0.5 h-0.5 shadow-[0_0_10px_#fff]'; // large
      } else if (size > 0.6) {
        sizeClass = 'w-0.5 h-0.5'; // medium
      }
      
      generatedStars.push({
        sizeClass,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
      });
    }
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#1A1A2E_0%,#0f0f1b_70%)] overflow-hidden z-0">
      {stars.map((star, i) => (
        <Star key={i} {...star} />
      ))}
    </div>
  );
};

export default memo(StarryBackground);
