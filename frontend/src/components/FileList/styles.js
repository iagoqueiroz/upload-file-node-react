import styled from 'styled-components';

export const Container = styled.ul`
  margin-top: 20px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;

    & + li {
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      margin-top: 15px;
      padding-top: 15px;
    }
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;

    span {
      font-size: 12px;
      color: #999;
      margin-top: 5px;

      button {
        border: 0;
        background: transparent;
        cursor: pointer;
        margin-left: 5px;
        color: #e74c3c;
      }
    }
  }
`;

export const Preview = styled.div`
  width: 48px;
  height: 48px;
  margin-right: 10px;
  border-radius: 5px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  flex-shrink: 0;
`;
