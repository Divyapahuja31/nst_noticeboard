"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="w-full relative overflow-hidden leading-none mt-8">
      {/* Decorative Footer Landscape Cutout Banner */}
      <div className="w-full relative leading-none flex justify-center">
        <img
          src="/footer.png"
          alt="Campus Landscape Footer"
          className="w-full max-w-[1480px] h-auto object-cover object-bottom pointer-events-none select-none"
        />
      </div>
    </footer>
  );
}

export default Footer;
