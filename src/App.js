import React from 'react';
import Routes from './Routes';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // os estados iniciais
    };
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  handleChange = () => {
  // as condições de mudança
  };

  render() {
    // desestruturar
    return (
      <>
        <p>TrybeTunes</p>
        <Routes />
      </>
    );
  }
}

export default App;
