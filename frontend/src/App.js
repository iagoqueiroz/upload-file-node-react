import React, { useState, useEffect } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import api from './services/api';

import GlobalStyles from './styles/global';

import { Container, Content } from './styles';
import Upload from './components/Upload';
import FileList from './components/FileList';

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await api.get('/files');

      console.log(response.data);

      setUploadedFiles(
        response.data.map((file) => ({
          id: file.id,
          name: file.originalName,
          preview: file.url,
          readableSize: filesize(file.size),
          uploaded: true,
          url: file.url,
        }))
      );
    };

    fetchFiles();
  }, []);

  function handleUpload(files) {
    const newUploadedFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    setUploadedFiles(uploadedFiles.concat(newUploadedFiles));

    newUploadedFiles.forEach(processUpload);
  }

  async function handleDelete(id) {
    await api.delete(`/files/${id}`);

    setUploadedFiles((uploadedFiles) =>
      uploadedFiles.filter((file) => file.id !== id)
    );
  }

  function updateFile(id, data) {
    setUploadedFiles((uploadedFiles) =>
      uploadedFiles.map((uploadedFile) => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    );
  }

  function processUpload(file) {
    const data = new FormData();

    data.append('file', file.file, file.name);

    api
      .post('/files', data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          updateFile(file.id, {
            progress,
          });
        },
      })
      .then((response) => {
        updateFile(file.id, {
          uploaded: true,
          url: response.data.url,
        });
      })
      .catch((error) => {
        updateFile(file.id, {
          error: true,
        });
      });
  }

  return (
    <Container>
      <Content>
        <Upload onUpload={handleUpload} />
        {!!uploadedFiles.length && (
          <FileList files={uploadedFiles} onDelete={handleDelete} />
        )}
      </Content>
      <GlobalStyles />
    </Container>
  );
}

export default App;
