import React from 'react';
import GlobalStyles from './styles/global';

import { Container, Content } from './styles';
import Upload from './components/Upload';

function App() {
  return (
    <Container>
      <Content>
        <Upload />
      </Content>
      <GlobalStyles />
    </Container>
  );
}

export default App;
