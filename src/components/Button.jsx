import React from 'react';
import '../index.css';

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
    const baseStyle = {
        padding: '12px 24px',
        borderRadius: 'var(--radius-full)',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '500',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        boxShadow: 'var(--shadow-soft)',
        outline: 'none',
    };

    const variants = {
        primary: {
            backgroundColor: 'var(--color-text-main)',
            color: 'var(--color-bg)',
        },
        secondary: {
            backgroundColor: 'var(--color-white)',
            color: 'var(--color-text-main)',
            border: '1px solid var(--color-secondary)',
        },
        outline: {
            backgroundColor: 'transparent',
            color: 'var(--color-text-main)',
            border: '1px solid var(--color-text-main)',
        },
    };

    return (
        <button
            onClick={onClick}
            className={className}
            style={{ ...baseStyle, ...variants[variant] }}
            onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = 'var(--shadow-hover)';
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'var(--shadow-soft)';
            }}
        >
            {children}
        </button>
    );
};

export default Button;
