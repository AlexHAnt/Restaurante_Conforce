import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, EditOutlined, SearchOutlined, DollarOutlined, PhoneOutlined, TagOutlined, ApiOutlined, UserAddOutlined, ReconciliationOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/Auth';

const { SubMenu, Item } = Menu;

const Nav: React.FC = () => {
    const [collapsed, setCollapsed] = React.useState(true)
    const { userAccessLevel } = useAuth()

    function toggle() {
        setCollapsed(!collapsed)
    }

    return (
        <Layout.Sider trigger={null} collapsible collapsed={collapsed}>

            <Menu mode="inline" theme="dark" style={{ height: '100%', background: '#000000' }}>
                <div style={{ marginTop: '60px' }} />
                <Item key="collapsed" style={{ textAlign: 'center' }} >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => toggle(),
                    })}
                </Item>

                <Item key="home" className="menu">
                    <Link to="/home">
                        <HomeOutlined /> {collapsed ? '' : 'Home'}
                    </Link>
                </Item>

                <SubMenu key="Lanche" title={<span><EditOutlined /> {collapsed ? '' : 'Lanche'} </span>}  >
                    <Item key="NewLanche" className="menu">
                        <Link to="/NewLanche">
                            Cadastrar
            </Link>
                    </Item>
                    <Item key="editLanche">
                        <Link to="/editLanche">
                            Editar
            </Link>
                    </Item>
                </SubMenu>

                <SubMenu key="Ingredientes" title={<span><ReconciliationOutlined /> {collapsed ? '' : 'Ingredientes'} </span>}  >
                    <Item key="newIngredientesr" className="menu">
                        <Link to="/newIngrediente">
                        Cadastrar
            </Link>
                    </Item>
                    <Item key="editIngredientes">
                        <Link to="/editIngrediente">
                            Editar
            </Link>
                    </Item>
                </SubMenu>

                <SubMenu key="Consults" title={<span> <SearchOutlined />{collapsed ? '' : 'Consultas'}</span>}  >

                    <Item key="consultLanche">
                        <Link to="/consultLanche">
                            Lanches
            </Link>
                    </Item>
                    <Item key="consultIngredientes">
                        <Link to="/consultIngredientes">
                            Ingredientes
            </Link>
                    </Item>
        
                </SubMenu>
                <Item disabled={userAccessLevel == 1 ? false : true} key="registerNewUser">
                    <Link to="/cadastro">
                        <UserAddOutlined /> {collapsed ? '' : 'Register/Edit'}
                    </Link>
                </Item>
            </Menu>
        </Layout.Sider>
    )
}

export default memo(Nav)