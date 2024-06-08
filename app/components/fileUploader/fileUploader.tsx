"use client";

import React, { useRef, useEffect } from "react";
import {
  FileUploaderMinimal,
  UploadCtxProvider,
} from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

const FileUploader = ({
  setImageFiles,
}: Readonly<{ setImageFiles: (imageURLs: string[]) => void }>) => {
  const uploaderRef = useRef<InstanceType<UploadCtxProvider> | null>(null);

  useEffect(() => {
    const handleUpload = (e: any) => {
      console.log(e);
      if (e.detail) {
        setImageFiles(
          e.detail.allEntries.map(
            ({ uuid, name }: { uuid: string; name: string }) =>
              `https://ucarecdn.com/${uuid}/${name}`
          )
        );
      }
    };
    console.log(uploaderRef);
    if (uploaderRef.current) {
      console.log(uploaderRef);
      uploaderRef.current.addEventListener("common-upload-success", (e) =>
        handleUpload(e)
      );
    }
   // eslint-disable-next-line
  }, [uploaderRef.current,setImageFiles]);
  return (
    <FileUploaderMinimal apiRef={uploaderRef} pubkey="6b6248dd2ed0e6f96116" />
  );
};
export default FileUploader;
