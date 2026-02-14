import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { analyzeProfile } from '../utils/analysisEngine';

const AnalysisPage = ({ data, onReset }) => {
    const [result, setResult] = useState(null);
    const [sassLevel, setSassLevel] = useState(3);
    const [isAnalyzing, setIsAnalyzing] = useState(true);

    // Re-run analysis when sassLevel changes or initially
    useEffect(() => {
        setIsAnalyzing(true);
        const timer = setTimeout(() => {
            setResult(analyzeProfile(data, sassLevel));
            setIsAnalyzing(false);
        }, 800); // Shorter delay for slider updates
        return () => clearTimeout(timer);
    }, [data, sassLevel]);

    const handlePrint = () => {
        window.print();
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert("Link copied! (Currently just localhost, but works in spirit)");
        });
    };

    const handleSave = () => {
        if (!result) return;
        const text = `GET REAL ANALYSIS\n\n${result.title}\n\n${result.content.join('\n').replace(/<\/?[^>]+(>|$)/g, "")}`;
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "get-real-analysis.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (isAnalyzing && !result) {
        return (
            <Layout>
                <h2 style={{ animation: 'pulse 1.5s infinite' }}>analyzing...</h2>
                <style>{`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
        `}</style>
            </Layout>
        );
    }

    return (
        <Layout>
            <h2 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>your reality check</h2>

            {/* Sass Slider */}
            <div style={{ marginBottom: '2rem', width: '100%', maxWidth: '400px', margin: '0 auto 2rem auto' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                    Tone: {sassLevel === 1 ? 'Gentle 🥺' : sassLevel === 5 ? 'Brutal 💀' : 'Neutral 😐'}
                </label>
                <input
                    type="range"
                    min="1"
                    max="5"
                    value={sassLevel}
                    onChange={(e) => setSassLevel(parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                />
            </div>

            <div style={{
                marginBottom: '2rem',
                textAlign: 'left',
                opacity: isAnalyzing ? 0.5 : 1,
                transition: 'opacity 0.3s ease',
                minHeight: '300px' // Prevent layout jump
            }}>
                {result && (
                    <div className="chat-container">
                        {/* Header / "Sender" Name */}
                        <div style={{
                            alignSelf: 'center',
                            marginBottom: '1rem',
                            color: 'var(--color-text-light)',
                            fontSize: '0.85rem',
                            letterSpacing: '1px',
                            textTransform: 'uppercase'
                        }}>
                            Reality Check • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>

                        {/* Title as first message */}
                        <div
                            className={`chat-bubble ${sassLevel >= 4 ? 'bubble-brutal' : sassLevel <= 2 ? 'bubble-gentle' : ''}`}
                            style={{ animationDelay: '0ms', fontWeight: 'bold' }}
                        >
                            {result.title}
                        </div>

                        {/* Content Bubbles with Staggered Delay */}
                        {result.content.map((line, index) => {
                            if (!line) return null; // Skip empty lines
                            return (
                                <div
                                    key={index}
                                    className={`chat-bubble ${sassLevel >= 4 ? 'bubble-brutal' : sassLevel <= 2 ? 'bubble-gentle' : ''}`}
                                    style={{ animationDelay: `${(index + 1) * 600}ms` }} // Stagger 600ms
                                >
                                    <span dangerouslySetInnerHTML={{
                                        __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                    }} />
                                </div>
                            );
                        })}

                        {/* Footer / "Verdict" */}
                        <div
                            className="chat-bubble"
                            style={{
                                animationDelay: `${(result.content.length + 1) * 600}ms`,
                                alignSelf: 'center',
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                                fontStyle: 'italic',
                                color: 'var(--color-text-light)',
                                fontSize: '0.9rem',
                                marginTop: '10px'
                            }}
                        >
                            this isn’t a verdict. it’s a mirror.
                        </div>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button variant="secondary" onClick={handleSave}>💾 Save</Button>
                <Button variant="secondary" onClick={handlePrint}>🖨 Print</Button>
                <Button variant="secondary" onClick={handleShare}>🔗 Share</Button>
            </div>

            <div style={{ marginTop: '24px' }}>
                <Button variant="outline" onClick={onReset}>🔄 Start Over</Button>
            </div>

        </Layout>
    );
};

export default AnalysisPage;
