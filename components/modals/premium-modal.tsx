import React from 'react';
import {
  Label,
  LabelColors,
  LabelSizes,
  ModalContainer,
  Paragraph,
  ParagraphSizes,
} from '@smartive-education/design-system-component-library-lobsome';

export interface SettingsModalProps {
  onClose: () => void;
}

export const PremiumModal = ({ onClose }: SettingsModalProps) => {
  return (
    <div className="w-64 fixed inset-0 overflow-y-auto z-10">
      <ModalContainer title="Go Preimum" onCancel={() => onClose()}>
        <div className={'space-y-6'}>
          <Label color={LabelColors.VIOLET} size={LabelSizes.xl}>
            Discover the wonderful world of Mumble Premium!
          </Label>
          <Paragraph size={ParagraphSizes.m}>
            Upgrade to our premium subscription for exclusive access to advanced features and benefits that will enhance your
            user experience. Unlock the full potential of mumble with premium today!
          </Paragraph>
          <Paragraph size={ParagraphSizes.m}>What are the benefits of mumble premium?</Paragraph>
          <img
            className={'w-64'}
            src="http://www.quickmeme.com/img/1c/1c83e1c0388b35d43f2401543c9e214fb31892cec0d3966c7fe11955b5efe18f.jpg"
            alt=""
          />
        </div>
      </ModalContainer>
    </div>
  );
};
