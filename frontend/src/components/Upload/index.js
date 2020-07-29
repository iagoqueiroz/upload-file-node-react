import React from 'react';
import Dropzone from 'react-dropzone';

import { DropContainer, UploadMessage } from './styles';

export default ({ onUpload }) => {
  function renderDragMessage(isDragActive, isDragReject) {
    if (!isDragActive) {
      return (
        <UploadMessage>
          <strong>Drag and drop</strong>&nbsp;or browse files
        </UploadMessage>
      );
    }

    if (isDragReject) {
      return <UploadMessage type="error">File(s) not supported</UploadMessage>;
    }

    return <UploadMessage type="success">Drop the files here</UploadMessage>;
  }

  return (
    <Dropzone accept="image/*" onDropAccepted={onUpload}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()} />
          {renderDragMessage(isDragActive, isDragReject)}
        </DropContainer>
      )}
    </Dropzone>
  );
};
