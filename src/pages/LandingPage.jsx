import React from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';

const LandingPage = ({ onNext }) => {
    return (
        <Layout>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    color: 'var(--color-primary)',
                    marginBottom: '0.5rem',
                    transform: 'rotate(-2deg)'
                }}>
                    hello.
                </h1>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                    welcome to get real.
                </h1>
                <p style={{
                    fontSize: '1.2rem',
                    color: 'var(--color-text-light)',
                    maxWidth: '400px',
                    margin: '0 auto'
                }}>
                    no pressure. no judgement. just honesty.
                </p>
            </div>

            <div>
                <Button onClick={onNext} variant="primary">
                    let’s begin &rarr;
                </Button>
            </div>
        </Layout>
    );
};

export default LandingPage;
