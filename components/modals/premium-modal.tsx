import React from 'react';
import {
  Label,
  LabelColors,
  LabelSizes,
  ModalContainer,
  Paragraph,
  ParagraphSizes,
} from '@smartive-education/design-system-component-library-lobsome';
import useTranslation from 'next-translate/useTranslation';

export interface SettingsModalProps {
  onClose: () => void;
}

export const PremiumModal = ({ onClose }: SettingsModalProps) => {
  const { t } = useTranslation('common');

  return (
    <div className="w-64 fixed inset-0 overflow-y-auto z-10">
      <ModalContainer title={t('premium-modal.modal-title')} onCancel={() => onClose()}>
        <div className={'space-y-6'}>
          <Label color={LabelColors.VIOLET} size={LabelSizes.xl}>
            {t('premium-modal.modal-subtitle')}
          </Label>
          <Paragraph size={ParagraphSizes.m}>{t('premium-modal.modal-text')}</Paragraph>
          <Paragraph size={ParagraphSizes.m}>{t('premium-modal.modal-benefits')}</Paragraph>
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
