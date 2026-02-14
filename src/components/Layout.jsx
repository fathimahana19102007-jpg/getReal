import React from 'react';

const Layout = ({ children }) => {
    const containerStyle = {
        width: '100%', // Full width
        margin: '0 auto',
        padding: '2rem',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
    };

    return (
        <div style={containerStyle} className="fade-in">
            {children}
        </div>
    );
};

export default Layout;
