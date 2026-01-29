
import React, { useState, useRef } from 'react';
import { Download, Linkedin, Twitter, Instagram, ArrowRight, Share2 } from 'lucide-react';
import { calculateTax } from './utils/taxLogic';
import { BUDGET_ALLOCATION, SECTOR_CONFIG } from './utils/budgetData';
import html2canvas from 'html2canvas';

function App() {
    const [income, setIncome] = useState(1500000);
    const [step, setStep] = useState(1);
    const printRef = useRef(null);

    const estimatedTax = calculateTax(income, 'new');
    const taxPercentage = income > 0 ? ((estimatedTax / income) * 100).toFixed(1) : 0;
    const dailyTax = (estimatedTax / 365).toFixed(0);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handleComputeTax = () => { if (income > 0) setStep(2); };

    const handleRevealAllocation = () => {
        setStep(3);
        setTimeout(() => { window.scrollBy({ top: 600, behavior: 'smooth' }); }, 100);
    };

    const handleDownload = async () => {
        if (!printRef.current) return;

        try {
            // STRATEGY: Clone the element and render it fixed at top-left to avoid scroll issues
            const element = printRef.current;
            const clone = element.cloneNode(true);

            // Set styles to ensure visibility in the screenshot
            clone.style.position = 'fixed';
            clone.style.top = '0';
            clone.style.left = '0';
            clone.style.width = '100%'; // Maintain width
            clone.style.zIndex = '-9999'; // Hide from view
            clone.style.background = '#f4f6f8'; // Ensure background exists
            clone.style.color = '#1e293b'; // Ensure text color is correct

            document.body.appendChild(clone);

            // Wait for images/fonts in clone to settle
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await html2canvas(clone, {
                backgroundColor: '#f4f6f8',
                scale: 2,
                useCORS: true,
                scrollX: 0,
                scrollY: 0, // We are capturing a fixed element at 0,0
                windowWidth: document.documentElement.scrollWidth,
                windowHeight: document.documentElement.scrollHeight
            });

            // Cleanup
            document.body.removeChild(clone);

            const link = document.createElement('a');
            link.download = 'budget-2025-verdict.png';
            link.href = canvas.toDataURL();
            link.click();

        } catch (error) {
            console.error("Screenshot failed:", error);
            alert("Could not generate image: " + error.message);
        }
    };

    const handleShare = (platform) => {
        // For "Share this insight", we'll default to the download behavior 
        // as it's the most reliable way to share a specific visual insight.
        handleDownload();

        // We could also copy text
        if (platform !== 'all') {
            // keep social link logic if specific button used in future
        }
    };

    // Sorting
    const allocationEntries = Object.entries(BUDGET_ALLOCATION);
    const othersEntry = allocationEntries.find(([key]) => key === 'others');
    const regularEntries = allocationEntries.filter(([key]) => key !== 'others')
        .sort(([, valueA], [, valueB]) => valueB - valueA);
    const finalSortedAllocations = [...regularEntries];
    if (othersEntry) finalSortedAllocations.push(othersEntry);

    return (
        <div className="app-container">
            <div className="hero-header fade-in">
                <div className="badge-wrapper"><span className="badge">Budget 2025 Wrapped</span></div>
                {step >= 2 ? (
                    <h1 className="hero-title">You pay <span style={{ color: '#3b82f6' }}>{formatCurrency(estimatedTax)}</span> in tax.</h1>
                ) : (
                    <h1 className="hero-title">Where does your tax go?</h1>
                )}
            </div>

            <div className="card fade-in">
                <div className="input-row">
                    <label className="input-label">Annual Income</label>
                    <div className="currency-wrapper">
                        <span className="currency-symbol">₹</span>
                        <input
                            type="number" className="custom-input" value={income}
                            onChange={(e) => { setIncome(Number(e.target.value)); setStep(1); }}
                        />
                    </div>
                    <input
                        type="range" min="0" max="5000000" step="50000" className="slider" value={income}
                        onChange={(e) => { setIncome(Number(e.target.value)); setStep(1); }}
                    />
                </div>
                {step === 1 && (
                    <button className="btn btn-full" onClick={handleComputeTax}>Compute My Tax <ArrowRight size={18} /></button>
                )}
            </div>

            {step >= 2 && (
                <div className="card fade-in" style={{ animationDelay: '0.1s' }}>
                    <div className="section-title">Tax Estimate</div>
                    <div style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>{formatCurrency(estimatedTax)}</div>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>
                        ≈ <span style={{ color: '#3b82f6', fontWeight: '700' }}>{taxPercentage}%</span> of income
                        (₹{dailyTax}/day)
                    </div>
                    {step === 2 && (
                        <button className="btn btn-full btn-outline" style={{ marginTop: '24px' }} onClick={handleRevealAllocation}>
                            Where Did My Tax Contribution Go? ↓
                        </button>
                    )}
                </div>
            )}

            {step >= 3 && (
                <div ref={printRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="card fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="section-title">Where Your Money Goes</div>
                        <div>
                            {finalSortedAllocations.map(([key, value]) => {
                                const amount = estimatedTax * value;
                                const percent = (value * 100).toFixed(0);
                                const sector = SECTOR_CONFIG[key];

                                return (
                                    <div key={key} className="breakdown-row">
                                        <div className="breakdown-header">
                                            <div className="sector-info">
                                                <span>{sector.icon}</span>
                                                <span>{sector.label}</span>
                                            </div>
                                            <div className="sector-amount">
                                                {formatCurrency(amount)} <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '400' }}>({percent}%)</span>
                                            </div>
                                        </div>
                                        <div className="progress-bg">
                                            <div
                                                className={`progress-fill bar-${key}`}
                                                style={{ width: `${value * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* FINAL VERDICT SECTION */}
                    <div className="verdict-section fade-in" style={{ animationDelay: '0.3s' }}>
                        <div className="verdict-label">Final Takeaway</div>
                        <div className="verdict-heading">🧾 Your Tax Verdict</div>

                        {/* Point 1 */}
                        <div className="hero-insight">
                            ₹1 in every ₹4 you paid went to servicing past government debt.
                        </div>

                        <div style={{ height: '20px' }}></div>

                        {/* Point 2 */}
                        <div className="hero-insight">
                            You paid 5× more towards servicing debt interest than education and healthcare combined.
                        </div>
                    </div>
                </div>
            )}
            <div style={{ height: '40px' }}></div>
        </div>
    );
}

export default App;
