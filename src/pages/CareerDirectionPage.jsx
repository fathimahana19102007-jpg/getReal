import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';

const CareerDirectionPage = ({ onNext, data, updateData }) => {
    const [mode, setMode] = useState(null); // 'known' or 'unsure'
    const [careerName, setCareerName] = useState('');
    const [interests, setInterests] = useState('');

    const handleModeSelect = (selectedMode) => {
        setMode(selectedMode);
        updateData({ careerMode: selectedMode });
    };

    const handleNext = () => {
        if (mode === 'known') {
            updateData({ careerName });
        } else {
            updateData({ interests });
        }
        onNext();
    };

    const isNextDisabled = () => {
        if (mode === 'known') return !careerName.trim();
        if (mode === 'unsure') return !interests.trim();
        return true;
    };

    if (!mode) {
        return (
            <Layout>
                <h2>what are you thinking about right now?</h2>
                <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>
                    you can be clear. you can be confused. both are okay.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Card title="I have a career in mind" onClick={() => handleModeSelect('known')}>
                        I know exactly what I want to act on.
                    </Card>
                    <Card title="I’m honestly unsure" onClick={() => handleModeSelect('unsure')}>
                        I need help figuring out my options.
                    </Card>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Button
                variant="outline"
                onClick={() => setMode(null)}
                style={{ position: 'absolute', top: '24px', left: '24px', border: 'none', padding: '0' }}
            >
                &larr; back
            </Button>

            {mode === 'known' ? (
                <>
                    <h2>what’s the dream?</h2>
                    <p style={{ marginBottom: '2rem' }}>name the career you’re chasing.</p>
                    <Input
                        placeholder="e.g. UX Designer, Marine Biologist..."
                        value={careerName}
                        onChange={(e) => setCareerName(e.target.value)}
                    />
                    <Button onClick={handleNext} disabled={isNextDisabled()} style={{ marginTop: '1rem' }}>
                        get real &rarr;
                    </Button>
                </>
            ) : (
                <>
                    <h2>let’s connect the dots.</h2>
                    <p style={{ marginBottom: '2rem' }}>tell us what you enjoy. what do you lose time doing?</p>
                    <Input
                        isTextArea
                        placeholder="e.g. I love organizing things, I enjoy drawing, I like detailed work..."
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                    />
                    <Button onClick={handleNext} disabled={isNextDisabled()} style={{ marginTop: '1rem' }}>
                        help me figure it out &rarr;
                    </Button>
                </>
            )}
        </Layout>
    );
};

export default CareerDirectionPage;
