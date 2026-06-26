'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Filter, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface QuickFilterMenuProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  label?: string;
  className?: string;
}

export const QuickFilterMenu: React.FC<QuickFilterMenuProps> = ({
  value,
  onChange,
  options,
  label = "Filters",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayValue = value === 'ALL' || value === '' || value.startsWith('All') ? label : value;
  const isFiltered = value !== 'ALL' && value !== '' && !value.startsWith('All');

  return (
    <div className={`relative inline-block text-left ${className}`} ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
          isFiltered
            ? 'bg-brand-blue/15 text-brand-blue border-brand-blue/40 shadow-sm'
            : 'bg-[#18181B] text-[#A1A1AA] border-[#27272A] hover:text-white hover:bg-[#27272A]'
        }`}
      >
        <Filter className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate max-w-[120px]">{displayValue}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-xl bg-[#1E1E22] border border-[#3F3F46] shadow-2xl z-50 overflow-hidden py-1.5"
          >
            <div className="px-3 py-1 text-[10px] font-black tracking-widest uppercase text-[#71717A] border-b border-[#2A2A30] mb-1">
              Select Filter
            </div>
            <div className="max-h-60 overflow-y-auto">
              {options.map((opt) => {
                const isSelected = value === opt || (value === '' && opt.startsWith('All'));
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onChange(opt);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-brand-blue/20 text-brand-blue font-bold'
                        : 'text-neutral-300 hover:bg-[#2A2A30] hover:text-white'
                    }`}
                  >
                    <span className="truncate">{opt}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-brand-blue shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
