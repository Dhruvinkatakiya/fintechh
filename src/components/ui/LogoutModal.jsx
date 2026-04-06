import React from 'react';
import { X, LogOut } from 'lucide-react';

export default function LogoutModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content card-skeuomorphic">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            Confirm Sign Out
          </h3>
          <button onClick={onClose} className="btn-ghost p-2" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <p className="mt-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Are you sure you want to sign out? You'll be returned to the login screen.
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>

          <button
            onClick={() => {
              if (onConfirm) onConfirm();
            }}
            className="btn button-primary-3d"
          >
            <LogOut size={16} style={{ marginRight: 8 }} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
