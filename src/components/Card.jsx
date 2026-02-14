import React from 'react';

const Card = ({ title, children, onClick, active }) => {
    const style = {
        padding: '24px',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: active ? 'var(--color-white)' : 'rgba(255, 255, 255, 0.5)',
        border: active ? '2px solid var(--color-primary)' : '2px solid transparent',
        boxShadow: active ? 'var(--shadow-hover)' : 'var(--shadow-soft)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textAlign: 'left',
        marginBottom: '16px',
    };

    return (
        <div
            onClick={onClick}
            style={style}
            onMouseEnter={(e) => {
                if (!active) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.backgroundColor = 'var(--color-white)';
                }
            }}
            onMouseLeave={(e) => {
                if (!active) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                }
            }}
        >
            <h3 style={{ marginBottom: '8px', color: 'var(--color-text-main)' }}>{title}</h3>
            <div style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                {children}
            </div>
        </div>
    );
};

export default Card;
