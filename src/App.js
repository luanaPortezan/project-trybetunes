import React from 'react';
import Routes from './Routes';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // os estados iniciais
    };
  }

  // handleChange = () => {
  // // as condições de mudança
  // };

  render() {
    // desestruturar
    return (
      <>
        <h1>TrybeTunes</h1>
        <Routes />
      </>
    );
  }
}

export default App;
