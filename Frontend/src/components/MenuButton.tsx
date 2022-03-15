import React, { memo } from 'react';
import { Col, Button, Menu, Dropdown } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/Auth';

const frontEndURL = process.env.REACT_APP_CLIENT_URL //URL backend

const MenuButton = () => {
  const { setAuthTokens, userName } = useAuth();

  function logOut() {
    setAuthTokens();
    window.location.href = `${frontEndURL}/login`;
  }

  return (
    <div>
      <Col span={23} style={{ textAlign: 'right' }}>
        <Dropdown trigger={['click']} overlay={
          <Menu>

            <Menu.Item key="logOut">
          <Button type='ghost' onClick={() => logOut()}><LogoutOutlined /> Log Out </Button>    
            </Menu.Item>
          </Menu>
        }>
          <Button>{!!userName && <div><UserOutlined /> {userName}</div>}</Button>

        </Dropdown>
      </Col>
    </div >
  )
}
export default memo(MenuButton)


