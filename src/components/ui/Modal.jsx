import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="btn-ghost rounded-lg p-1.5"
            aria-label="Close modal"
          >
            <X size={20} style={{ color: 'var(--text-secondary)' }} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
