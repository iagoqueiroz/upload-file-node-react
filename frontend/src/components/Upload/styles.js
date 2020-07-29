import styled, { css } from 'styled-components';

const dragActive = css`
  border-color: #1abc9c;
`;

const dragReject = css`
  border-color: #e74c3c;
`;

export const DropContainer = styled.div.attrs({
  className: 'dropzone',
})`
  border: 2px dashed #c2c2c2;
  border-radius: 4px;
  cursor: pointer;

  transition: height 0.2s ease, border-color 0.2s ease;

  ${(props) => props.isDragActive && dragActive}
  ${(props) => props.isDragReject && dragReject}
`;

const messageColors = {
  default: '#95a5a6',
  success: '#1abc9c',
  error: '#e74c3c',
};

export const UploadMessage = styled.p`
  display: flex;
  color: ${(props) => messageColors[props.type || 'default']};
  justify-content: center;
  align-items: center;
  padding: 35px 0;
`;
