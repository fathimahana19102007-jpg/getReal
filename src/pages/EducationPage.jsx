import React from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';

const EducationPage = ({ onNext, data, updateData }) => {
    const options = ['School', 'Diploma', 'Undergraduate', 'Postgraduate', 'Other'];

    const handleSelect = (option) => {
        updateData({ education: option });
    };

    return (
        <Layout>
            <h2 style={{ marginBottom: '2rem' }}>what’s your highest educational qualification?</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                {options.map((option) => (
                    <Card
                        key={option}
                        title={option}
                        active={data.education === option}
                        onClick={() => handleSelect(option)}
                    />
                ))}
            </div>

            <div style={{ marginTop: '2rem' }}>
                <Button
                    onClick={onNext}
                    variant="primary"
                    disabled={!data.education}
                    style={{ opacity: data.education ? 1 : 0.5, pointerEvents: data.education ? 'auto' : 'none' }}
                >
                    continue &rarr;
                </Button>
            </div>
        </Layout>
    );
};

export default EducationPage;
