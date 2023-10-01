import React, { useState, ChangeEvent, useEffect } from 'react';
import { Upload } from '../icons/Upload';
import { cutOffLongStrings } from '@/utils/func';

interface UploadInputProps {
  label: string;
  handleChange: (e: any) => void;
  value?: string;
}

export function UploadInput({ label, handleChange, value }: UploadInputProps): JSX.Element {
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const reader = new FileReader();
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     reader.readAsDataURL(file)
  //     setSelectedFileName(file.name);
  //     reader.onload = (readerEvent) => {
  //       handleChange(readerEvent?.target?.result)
  //   };
  //   }
  // };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = e.target.files?.[0];
    if (file) {
      reader.readAsDataURL(file);
      setSelectedFileName(file.name);
      reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
        handleChange(readerEvent.target?.result);
      };
    }
  };


  const triggerFileInput = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  useEffect(() => {
    if(value) {
      setSelectedFileName(value)
    }
  }, []);

  return (
    <>
      <small>{label}</small>
      <div
        onClick={triggerFileInput}
        className="bg-blue-50 justify-center font-medium flex cursor-pointer relative text-gray-800 peer min-h-[auto] w-full rounded-full px-3 py-[0.5rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-my-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0">
        <p className='mr-4 text-sm'>{selectedFileName ? cutOffLongStrings(selectedFileName) : 'Upload'}</p>
        {!selectedFileName && <Upload />}
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
    </>
  );
}
