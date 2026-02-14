import React from 'react';

const Input = ({ type = 'text', placeholder, value, onChange, isTextArea = false }) => {
    const style = {
        width: '100%',
        padding: '12px 16px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-secondary)',
        backgroundColor: 'var(--color-white)',
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        color: 'var(--color-text-main)',
        outline: 'none',
        transition: 'border-color 0.2s ease',
        marginBottom: '16px',
        resize: 'none',
    };

    const handleFocus = (e) => (e.target.style.borderColor = 'var(--color-primary)');
    const handleBlur = (e) => (e.target.style.borderColor = 'var(--color-secondary)');

    if (isTextArea) {
        return (
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{ ...style, minHeight: '100px' }}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        );
    }

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={style}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
    );
};

export default Input;
