'use client';

import React from 'react';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      {/* Equal sign made of pills */}
      <div className="flex flex-col gap-2">
        <div className="w-8 h-2 rounded-full bg-slate-800" />
        <div className="w-8 h-2 rounded-full bg-slate-800" />
      </div>
      {/* Text */}
      <span className="text-2xl font-semibold text-slate-800">
        EqualCure
      </span>
    </Link>
  );
}; 