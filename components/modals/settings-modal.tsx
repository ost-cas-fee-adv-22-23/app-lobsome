import React from 'react';
import { ModalContainer } from '@smartive-education/design-system-component-library-lobsome';

export interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal = ({ onClose }: SettingsModalProps) => {
  return (
    <div className="w-[623px] fixed inset-0 overflow-y-auto z-10">
      <ModalContainer title="Test" onCancel={() => onClose()}>
        Hallo das ist ein Test
      </ModalContainer>
    </div>
  );
};
