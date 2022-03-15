import React from 'react';
import logo from './../assets/img/logo.png'

interface Logo {
    padding?: string
    width?: string
    height?: string
}

const Logo: React.FC<Logo> = (props) => {
    return <img src={logo} alt='logo' style={{ padding: props.padding, width: props.width, height: props.height }}></img>
}

export default Logo