import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Container, FileInfo, Preview } from './styles';

import { MdCheckCircle, MdError } from 'react-icons/md';

const FileList = ({ files, onDelete }) => {
  return (
    <Container>
      {files.map((uploadedFile) => (
        <li key={uploadedFile.id}>
          <FileInfo>
            <Preview src={uploadedFile.preview} />

            <div>
              <strong>{uploadedFile.name}</strong>
              <span>
                {uploadedFile.readableSize}{' '}
                {!!uploadedFile.url && (
                  <button onClick={() => onDelete(uploadedFile.id)}>
                    delete
                  </button>
                )}
              </span>
            </div>
          </FileInfo>

          <div style={{ marginLeft: 10 }}>
            {!uploadedFile.uploaded && !uploadedFile.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: '#7159c1' },
                }}
                strokeWidth={10}
                value={uploadedFile.progress}
              />
            )}

            {uploadedFile.uploaded && (
              <MdCheckCircle size={24} color="#1abc9c" />
            )}
            {uploadedFile.error && <MdError size={24} color="#e74c3c" />}
          </div>
        </li>
      ))}
    </Container>
  );
};

export default FileList;
