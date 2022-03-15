import React, { useEffect, useState, memo } from "react";
import { ToastProvider } from 'react-toast-notifications';
import Template from '../components/Template';
import FlipCard from '../components/FlipCard';
import logo from './../assets/img/logo.png'
import { useAuth } from "../hooks/Auth";


const Home: any = (props: any) => {
  const { userName } = useAuth();

  return (
    <ToastProvider>
      <FlipCard content={{ message: `Seja bem vindo ${userName}!`, type: 'info' }}></FlipCard>
      <Template
        route={[{ path: 'Home', breadcrumbName: 'Home' }]}
        content={
          <div style={{ textAlign: 'center' }}>
            <img src={logo} style={{ width: '500px' }} alt='logo'></img>
          </div>
        }
      />
    </ToastProvider >
  )
}

export default memo(Home)