import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '../lib/utils';

// Japanese-themed SVG decorations
const CherryBlossomPetal = ({ className, style }) => (
  <svg
    viewBox="0 0 24 24"
    className={cn("w-6 h-6 text-pink-300/60", className)}
    style={style}
    fill="currentColor"
  >
    <path d="M12 2C12 2 14 6 14 8C14 10 12 12 12 12C12 12 10 10 10 8C10 6 12 2 12 2Z" />
    <path d="M12 12C12 12 16 14 18 14C20 14 22 12 22 12C22 12 20 10 18 10C16 10 12 12 12 12Z" />
    <path d="M12 12C12 12 14 16 14 18C14 20 12 22 12 22C12 22 10 20 10 18C10 16 12 12 12 12Z" />
    <path d="M12 12C12 12 8 14 6 14C4 14 2 12 2 12C2 12 4 10 6 10C8 10 12 12 12 12Z" />
    <path d="M12 12C12 12 8 8 8 6C8 4 10 2 10 2C10 2 12 4 14 6C14 8 12 12 12 12Z" transform="rotate(45 12 12)" />
  </svg>
);

const ShojiPattern = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    className={cn("absolute opacity-10", className)}
    fill="none"
    stroke="currentColor"
    strokeWidth="0.5"
  >
    {/* Horizontal lines */}
    {[0, 20, 40, 60, 80, 100].map((y) => (
      <line key={`h-${y}`} x1="0" y1={y} x2="100" y2={y} />
    ))}
    {/* Vertical lines */}
    {[0, 25, 50, 75, 100].map((x) => (
      <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="100" />
    ))}
  </svg>
);

const MountFujiSilhouette = ({ className }) => (
  <svg
    viewBox="0 0 200 60"
    className={cn("w-full h-auto text-slate-600/20", className)}
    fill="currentColor"
  >
    <path d="M0 60 L80 60 L100 15 L120 60 L200 60 L200 60 L0 60 Z" />
    <path d="M90 25 L100 10 L110 25 Z" fill="white" opacity="0.3" />
  </svg>
);

// Floating cherry blossom animation positions
const blossomPositions = [
  { top: '10%', left: '5%', delay: '0s', duration: '15s' },
  { top: '15%', right: '8%', delay: '2s', duration: '18s' },
  { top: '25%', left: '12%', delay: '4s', duration: '20s' },
  { top: '30%', right: '15%', delay: '1s', duration: '16s' },
  { top: '45%', left: '3%', delay: '3s', duration: '17s' },
  { top: '50%', right: '5%', delay: '5s', duration: '19s' },
  { top: '65%', left: '8%', delay: '2s', duration: '14s' },
  { top: '70%', right: '10%', delay: '0s', duration: '21s' },
  { top: '80%', left: '15%', delay: '4s', duration: '16s' },
  { top: '85%', right: '12%', delay: '1s', duration: '18s' },
];

const STORAGE_KEY = 'tiu_disclaimer_accepted';

const DisclaimerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    // Check if disclaimer was already accepted in this session
    const hasAccepted = sessionStorage.getItem(STORAGE_KEY);

    if (!hasAccepted) {
      setIsOpen(true);
      // Trigger fade-in animation
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }
  }, []);

  useEffect(() => {
    // Focus trap - focus the button when modal opens
    if (isOpen && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard events
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;

    // Trap focus within modal
    if (e.key === 'Tab') {
      // Only one focusable element (button), so prevent tab from leaving
      e.preventDefault();
      buttonRef.current?.focus();
    }

    // Prevent escape from closing (user must click button)
    if (e.key === 'Escape') {
      e.preventDefault();
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleAccept = () => {
    setIsVisible(false);
    // Wait for fade-out animation before closing
    setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setIsOpen(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
      aria-describedby="disclaimer-description"
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-4",
        "transition-opacity duration-300 ease-in-out",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Backdrop with blur and gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-md"
        aria-hidden="true"
      >
        {/* Shoji pattern overlay */}
        <ShojiPattern className="w-full h-full text-white" />

        {/* Floating cherry blossoms */}
        {blossomPositions.map((pos, index) => (
          <div
            key={index}
            className="absolute animate-float"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              animationDelay: pos.delay,
              animationDuration: pos.duration,
            }}
          >
            <CherryBlossomPetal
              className="text-pink-300/40"
              style={{ transform: `rotate(${index * 36}deg)` }}
            />
          </div>
        ))}

        {/* Mount Fuji silhouette at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <MountFujiSilhouette />
        </div>
      </div>

      {/* Modal Card */}
      <div
        className={cn(
          "relative z-10 w-full max-w-lg",
          "bg-white/10 backdrop-blur-xl",
          "border border-white/20 rounded-2xl",
          "shadow-2xl shadow-black/20",
          "transition-all duration-300 ease-out",
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        )}
      >
        {/* Decorative top border gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 rounded-t-2xl" />

        {/* Card Content */}
        <div className="p-6 sm:p-8">
          {/* Header with decorative element */}
          <div className="text-center mb-6">
            {/* Small decorative cherry blossom cluster */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <CherryBlossomPetal className="w-8 h-8 text-pink-300/80" />
                <CherryBlossomPetal
                  className="w-6 h-6 text-pink-200/60 absolute -top-1 -right-3"
                  style={{ transform: 'rotate(45deg)' }}
                />
                <CherryBlossomPetal
                  className="w-5 h-5 text-pink-400/50 absolute -bottom-1 -left-2"
                  style={{ transform: 'rotate(-30deg)' }}
                />
              </div>
            </div>

            <h1
              id="disclaimer-title"
              className="text-2xl sm:text-3xl font-semibold text-white mb-2"
            >
              Academic Portfolio Disclaimer
            </h1>
            <p className="text-sm sm:text-base text-white/70">
              Tokyo International University Application Project
            </p>
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-6" />

          {/* Disclaimer Text */}
          <div
            id="disclaimer-description"
            className="space-y-3 text-sm sm:text-base text-white/80 mb-8"
          >
            <p>
              This website is a <span className="text-white font-medium">personal academic portfolio</span> created
              for educational and university admissions demonstration purposes.
            </p>
            <p>
              This is <span className="text-white font-medium">not an official Tokyo International University website</span>.
              No institutional endorsement or affiliation is implied or should be inferred.
            </p>
            <p>
              This application does not collect, store, or process any third-party personal data.
              All displayed information is illustrative and intended solely for portfolio evaluation.
            </p>
          </div>

          {/* Legal-style fine print */}
          <p className="text-xs text-white/50 text-center mb-6">
            By proceeding, you acknowledge that you have read and understood this disclaimer.
          </p>

          {/* Accept Button */}
          <button
            ref={buttonRef}
            onClick={handleAccept}
            className={cn(
              "w-full py-3 px-6 rounded-xl",
              "bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500",
              "hover:from-pink-400 hover:via-rose-400 hover:to-pink-400",
              "text-white font-medium text-base sm:text-lg",
              "shadow-lg shadow-pink-500/25",
              "transition-all duration-200 ease-out",
              "hover:shadow-xl hover:shadow-pink-500/30",
              "hover:-translate-y-0.5",
              "focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-transparent",
              "active:scale-[0.98]"
            )}
          >
            I Understand & Enter Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;
