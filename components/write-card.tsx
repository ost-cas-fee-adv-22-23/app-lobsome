import React, { FormEvent, useState } from 'react';
import {
  Button,
  ButtonColors,
  SvgSend,
  SvgUpload,
  Textarea,
} from '@smartive-education/design-system-component-library-lobsome';
import { FileUploadModal } from './modals/file-upload-modal';
import useTranslation from 'next-translate/useTranslation';
import { CreatePost } from '../types/post';
import Image from 'next/image';

type WriteCardProps = {
  onSend: (message: CreatePost) => void;
};

export const WriteCard = ({ onSend }: WriteCardProps) => {
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [form, setFormValues] = useState<CreatePost>({ text: '', file: null });
  const { t } = useTranslation('common');

  const handleFileChange = (file: File) => {
    setFormValues({ ...form, file });
  };

  const handleMessageChange = (e: FormEvent<HTMLTextAreaElement>) => {
    setFormValues({ ...form, text: e.currentTarget.value });
  };

  const handleSend = () => {
    if (form.text.length === 0) {
      return;
    }

    onSend(form);
    setFormValues({ text: '', file: null });
  };

  return (
    <>
      <div className="mt-8 mb-4">
        <Textarea placeholder={t('write-card.placeholder')} onChange={handleMessageChange} value={form.text} />
      </div>

      <div className="font-bold my-5">{form.file?.name}</div>

      <div className="flex space-x-5">
        <Button onClick={() => setShowFileUploadModal(true)} color={ButtonColors.SLATE} fullWidth>
          {t('write-card.upload-image')} <SvgUpload />
        </Button>
        <Button color={ButtonColors.VIOLET} onClick={handleSend} fullWidth>
          {t('write-card.submit')} <SvgSend />
        </Button>
      </div>
      {showFileUploadModal && (
        <FileUploadModal onClose={() => setShowFileUploadModal(false)} onFileChange={handleFileChange} />
      )}
    </>
  );
};
