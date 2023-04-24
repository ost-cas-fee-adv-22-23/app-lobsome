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

  function save() {
    alert('haha, you fool!');
  }

  return (
    <div className="fixed inset-0 overflow-y-auto z-10">
      <ModalContainer title={t('premium-modal.modal-title')} onSave={save} onCancel={() => onClose()}>
        <div className="space-y-6">
          <Label color={LabelColors.VIOLET} size={LabelSizes.xl}>
            {t('premium-modal.modal-subtitle')}
          </Label>
          <Paragraph size={ParagraphSizes.m}>{t('premium-modal.modal-text')}</Paragraph>
          <Paragraph size={ParagraphSizes.m}>{t('premium-modal.modal-benefits')}</Paragraph>
          <img className={'w-64'} src="/images/anonymous.png" alt="" />
        </div>
      </ModalContainer>
    </div>
  );
};
