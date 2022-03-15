import React, { useState, useEffect, createContext } from 'react';
import apiAxios from '../components/apiAxios';

interface DatasWebSocket {
  datas: any,
  setToken:any
}
const AppContext = createContext<DatasWebSocket>({
  datas: 'teste',
  setToken: () => { }
})


export function ContextWrapper(props: any) {
  const [datas, setDatas] = useState<any>(''); //Variável para armazenar os dados emitidos pelo WebSocket

  useEffect((): any => {
    let valid = setInterval(validToken, 8000);
    return () => clearInterval(valid);
  }, []);

  // useEffect((): any => {
  //    validToken() }, []);

  function validToken() {
    console.log(datas)

    const hash = !!datas.accessToken ? datas.accessToken : ''
    apiAxios.get(`/profile`, { headers: { 'Authorization': `bearer ${hash}` } })
      .then(({ data }) => {
        // setUserLogger(data.username)
        // setDatas(data.username)
      })
      .catch(() => {
        window.location.href = "http://localhost:3334/login";
      }
      )
  }

  function setToken(x:any)  {
    setDatas(x)
    console.log("x" + x)
   }


  return (
    <AppContext.Provider value={{ datas, setToken }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContext;