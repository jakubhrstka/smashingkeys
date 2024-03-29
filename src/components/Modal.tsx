"use client";

import React, { useCallback, useEffect, useRef } from "react";

export const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (backdropRef.current === e.target) onClose();
  };

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 bg-black/80 z-50"
      onClick={handleBackdropClick}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 bg-background rounded-lg w-full max-w-sm">
        {children}
      </div>
    </div>
  );
};
