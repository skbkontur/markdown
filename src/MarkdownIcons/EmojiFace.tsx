import React from 'react';

export const EmojiFace = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
    <g clipPath="url(#a)">
      <g stroke="#222" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#b)">
        <path d="M2 8a6 6 0 1 1 12 0M14 8A6 6 0 1 1 2 8M5.667 6v.667M10.333 6v.667" />
        <path d="M10.333 9.792s-.876.875-2.334.875-2.333-.875-2.333-.875" />
      </g>
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
      <clipPath id="b">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
