import { Textarea, Toast } from '@skbkontur/react-ui';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { MarkdownFormat } from '../MarkdownFormat';
import { setMarkdownFiles } from '../MarkdownHelpers/markdownHelpers';
import { Nullable, RefItem } from '../types';
import { RequestStatus } from '../utils/requestStatus';
import { saveFile } from '../utils/saveFile';

const PARENTHESES_REGEXP = /[()[\]]/gm;

export const useFileLogic = (
  fileUploadApi?: (file: File) => Promise<RefItem>,
  fileDownloadApi?: (id: string) => Promise<File>,
  fileApiUrl?: string,
  textarea?: Nullable<Textarea>,
  cursorPosition?: number | null,
  disabled?: boolean
) => {
  const { getRootProps, isDragActive, open } = useDropzone({
    multiple: false,
    noClick: true,
    disabled: disabled || !fileUploadApi || !fileDownloadApi,
    onDrop: (files) => void uploadFile(files[0]),
  });

  const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.Default);
  const [error, setError] = useState<boolean>(false);

  async function uploadFile(file: File) {
    if (fileUploadApi) {
      if (file.size / Math.pow(1024, 2) >= 10) {
        setError(true);

        return;
      }

      setRequestStatus(RequestStatus.isFetching);

      try {
        setError(false);
        const response = await fileUploadApi(new File([file], file.name.replace(PARENTHESES_REGEXP, '')));
        const isImage = file.type.includes('image');

        if (response && textarea) {
          setMarkdownFiles(
            response,
            textarea,
            isImage ? MarkdownFormat.image : MarkdownFormat.file,
            cursorPosition,
            fileApiUrl
          );
        }

        setRequestStatus(RequestStatus.isLoaded);
      } catch (e) {
        Toast.push('Ошибка загрузки файла');
        setRequestStatus(RequestStatus.isFailed);
      }
    }
  }

  async function downloadFile(id: string) {
    if (fileDownloadApi) {
      try {
        const response = await fileDownloadApi(id);
        saveFile(response);
      } catch (e) {
        Toast.push('Ошибка скачивания файла');
      }
    }
  }

  return {
    requestStatus,
    error,
    getRootProps,
    isDragActive,
    open,
    uploadFile,
    downloadFile,
    onResetError: () => setError(false),
  };
};
