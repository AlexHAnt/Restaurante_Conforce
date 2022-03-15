import React, { memo } from "react";
import { Layout } from 'antd';
import 'antd/dist/antd.css';

const Footer: React.FC = () => {
  return (
    <Layout.Footer style={{ textAlign: 'center', height: '70px' }}> Gorillaz ©2022 </Layout.Footer>
  )
}

export default memo(Footer)