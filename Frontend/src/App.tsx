import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Routes from './main/Routes'
// import { ContextWrapper } from './hooks/ContextReceiveWebSocket';
import 'antd/dist/antd.css';
import { AuthContext } from './hooks/Auth';


const App: React.FC = () => {
  return (
    // <AuthContext.Provider value={false}>
    <BrowserRouter>
      <div className='App'>
        {/* <ContextWrapper> */}
          <Routes />
        {/* </ContextWrapper> */}
      </div>
    </BrowserRouter>
    // </AuthContext.Provider>
  )
}

export default App
