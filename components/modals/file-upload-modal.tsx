import {
  Button,
  ButtonColors,
  Heading,
  HeadingColors,
  HeadingTags,
  ModalContainer,
  Paragraph,
  ParagraphSizes,
  SvgUpload,
} from '@smartive-education/design-system-component-library-lobsome';
import React, { ChangeEvent, useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';

export interface FileUploadModalProps {
  onClose: () => void;
  onFileChange: (file: File) => void;
}

export const FileUploadModal = ({ onClose, onFileChange }: FileUploadModalProps) => {
  const { t } = useTranslation('common');
  const inputElement = useRef<HTMLInputElement>(null);
  const handleOpenFileDialog = () => {
    if (inputElement && inputElement.current) {
      inputElement.current.click();
    }
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      const fileType = file[0]['type'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

      if (file[0].size / 1024 / 1024 >= 5) {
        alert('File is to big! Maximum file size is 5mb');
        return;
      }

      if (validImageTypes.includes(fileType)) {
        onFileChange(file[0]);
        onClose();
      } else {
        alert('only images accepted');
      }
    }
  };
  return (
    <div className="fixed inset-0 overflow-y-auto z-10">
      <ModalContainer title={t('modal.file-upload.title')} onCancel={() => onClose()}>
        <div className="border-2 border-dotted border-slate-200 rounded-2xl relative mb-4 bg-slate-100">
          <input ref={inputElement} onChange={handleFile} className="h-full w-full absolute opacity-0" type="file" />
          <div className="m-8">
            <div className="flex flex-col justify-center items-center truncate">
              <span className="mb-xs">
                <SvgUpload />
              </span>
              <Heading tag={HeadingTags.HEADING4} color={HeadingColors.SLATE}>
                {t('modal.file-upload.drag-title')}
              </Heading>
              <Paragraph size={ParagraphSizes.m}>{t('modal.file-upload.drag-message')}</Paragraph>
            </div>
          </div>
        </div>
        <Button
          color={ButtonColors.SLATE}
          label={t('modal.file-upload.upload-file-button')}
          onClick={handleOpenFileDialog}
          fullWidth
        >
          <SvgUpload />
        </Button>
      </ModalContainer>
    </div>
  );
};
