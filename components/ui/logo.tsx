'use client';

import React from 'react';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-4">
      {/* Equal sign made of pills - made larger */}
      <div className="flex flex-col gap-3">
        <div className="w-16 h-3 rounded-full bg-slate-800" />
        <div className="w-16 h-3 rounded-full bg-slate-800" />
      </div>
      {/* Text - made larger */}
      <span className="text-4xl font-semibold text-slate-800">
        EqualCure
      </span>
    </Link>
  );
}; 