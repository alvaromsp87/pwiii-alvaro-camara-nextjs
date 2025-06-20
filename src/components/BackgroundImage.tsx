// src/components/BackgroundImage.tsx

import React from 'react';

export const BackgroundImage = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen -z-10 bg-cover bg-center"
      style={{ backgroundImage: "url('/background-texture.jpg')" }}
    />
  );
};