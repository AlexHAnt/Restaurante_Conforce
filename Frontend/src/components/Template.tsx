import React, { useEffect, useCallback, memo } from "react";
import { Layout, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

interface Template {
    route?: any
    content: any
}

const Template: React.FC<Template | any> = props => {
    useEffect(() => {
        document.addEventListener("keydown", f11Function, false)
    }, []);

    const f11Function = useCallback((event) => {
        event.keyCode === 122 && document.location.reload(true)
    }, []);

    function itemRender(route: any, params: any, routes: any, paths: any) {
        const last = routes.indexOf(route) === routes.length - 1
        return last ? (route.breadcrumbName) : (<Link to={paths.join('/')}>{route.breadcrumbName}</Link>)
    }

    return (
        <Layout>
            <Nav />
            <Layout >
                <Header />
                <Breadcrumb style={{ margin: '9px 10px' }} itemRender={itemRender} routes={props.route} />

                <Layout.Content style={{ padding: '0px 30px' }}>
                    <Layout style={{ background: '#fff', boxShadow: ' 0px 0px 20px 3px #0004' }}  >
                        <Layout.Content style={{ padding: '26px 24px ', minHeight: window.visualViewport.height  }}   >
                            <Layout.Content style={{ padding: '26px 24px ', minHeight: window.visualViewport.height}}   >
                                {props.content}
                            </Layout.Content>

                        </Layout.Content>
                    </Layout>
                </Layout.Content>

                <Footer />

            </Layout>

        </Layout>
    )
}

export default memo(Template)