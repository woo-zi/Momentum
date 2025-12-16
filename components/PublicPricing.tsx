import React, { useState, useEffect } from 'react';
import { Button, ShinyButton } from './UI';
import { Check, X, ChevronDown, ChevronUp, Crown, ArrowLeft, Timer, AlertTriangle, HelpCircle } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#262626]">
      <button 
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-white">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const ExitIntentFlow: React.FC<{ isOpen: boolean; onClose: () => void; onSignup: () => void }> = ({ isOpen, onClose, onSignup }) => {
  const [step, setStep] = useState<'survey' | 'downsell'>('survey');

  // Reset step when modal opens
  useEffect(() => {
    if (isOpen) setStep('survey');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleReasonSelect = () => {
    setStep('downsell');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
       <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fade-in" onClick={onClose} />
       
       <div className="relative w-full max-w-md bg-[#0a0a0a] border border-primary rounded-2xl p-8 shadow-[0_0_50px_rgba(139,92,246,0.3)] animate-fade-in text-center overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

          {step === 'survey' ? (
            /* STEP 1: SURVEY */
            <div className="relative z-10 flex flex-col items-center animate-fade-in">
                <div className="bg-[#171717] text-gray-400 p-4 rounded-full border border-[#262626] mb-6 shadow-lg">
                    <HelpCircle className="w-8 h-8" />
                </div>
                
                <h2 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase italic">Giving up already?</h2>
                <p className="text-gray-400 font-medium mb-8">Tell us what is hindering you from achieving your potential.</p>

                <div className="grid grid-cols-1 gap-3 w-full">
                    <button 
                        onClick={handleReasonSelect}
                        className="w-full p-4 rounded-xl border border-[#262626] bg-[#171717]/50 hover:bg-primary hover:border-primary hover:text-white text-left transition-all duration-200 group"
                    >
                        <span className="font-bold text-gray-300 group-hover:text-white">Too expensive</span>
                    </button>
                    <button 
                        onClick={handleReasonSelect}
                        className="w-full p-4 rounded-xl border border-[#262626] bg-[#171717]/50 hover:bg-primary hover:border-primary hover:text-white text-left transition-all duration-200 group"
                    >
                        <span className="font-bold text-gray-300 group-hover:text-white">Just browsing</span>
                    </button>
                    <button 
                        onClick={handleReasonSelect}
                        className="w-full p-4 rounded-xl border border-[#262626] bg-[#171717]/50 hover:bg-primary hover:border-primary hover:text-white text-left transition-all duration-200 group"
                    >
                        <span className="font-bold text-gray-300 group-hover:text-white">Not enough features</span>
                    </button>
                    <button 
                        onClick={handleReasonSelect}
                        className="w-full p-4 rounded-xl border border-[#262626] bg-[#171717]/50 hover:bg-white hover:border-white hover:text-black text-left transition-all duration-200 group"
                    >
                        <span className="font-bold text-gray-300 group-hover:text-black">I prefer being casual</span>
                    </button>
                </div>
            </div>
          ) : (
            /* STEP 2: DOWNSELL */
            <div className="relative z-10 flex flex-col items-center animate-fade-in">
                <div className="bg-primary text-white p-4 rounded-full border-4 border-[#0a0a0a] mb-6 shadow-lg shadow-primary/20">
                    <AlertTriangle className="w-8 h-8" />
                </div>
                
                <h2 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase italic leading-none">Wait. Let's remove the excuse.</h2>
                
                <div className="bg-[#171717] rounded-xl p-6 my-8 border border-[#262626] w-full">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">One-time Offer</p>
                    <p className="text-xl font-bold text-gray-300 mb-2 leading-tight">
                        Since price is the issue, here is <span className="text-white text-2xl font-black block mt-1">50% OFF your first month.</span>
                    </p>
                    <p className="text-sm text-primary font-bold uppercase tracking-widest mt-4">Prove us wrong.</p>
                    
                    <div className="mt-4 flex items-center justify-center gap-2 text-red-500 font-mono text-xs bg-red-500/10 py-1 rounded">
                        <Timer className="w-3 h-3" /> <span>Offer expires in 05:00</span>
                    </div>
                </div>

                <div className="space-y-4 w-full">
                    <ShinyButton onClick={onSignup} className="w-full">
                        CLAIM 50% OFF
                    </ShinyButton>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                    >
                        No thanks, I'll stay casual.
                    </button>
                </div>
            </div>
          )}
       </div>
    </div>
  );
};

const ComparisonTable: React.FC = () => {
  const features = [
    { name: 'Manual Logging', free: true, pro: true },
    { name: 'Basic Stats', free: true, pro: true },
    { name: 'AI Neural Coach', free: false, pro: true },
    { name: 'Retail Rewards', free: false, pro: true },
    { name: 'Community Boost', free: false, pro: true },
  ];

  return (
    <div className="max-w-3xl mx-auto mb-20">
       <h3 className="text-center text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-8">Detailed Breakdown</h3>
       <div className="w-full bg-[#0a0a0a] border border-[#262626] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-3 bg-[#171717] p-4 border-b border-[#262626]">
             <div className="col-span-1"></div>
             <div className="text-center font-bold text-white text-sm uppercase tracking-widest">Starter</div>
             <div className="text-center font-bold text-primary text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                <Crown className="w-4 h-4" /> Pro
             </div>
          </div>
          {features.map((row, i) => (
             <div key={i} className="grid grid-cols-3 p-4 border-b border-[#262626] hover:bg-white/5 transition-colors items-center last:border-0">
                <div className="font-medium text-gray-300 text-sm pl-2">{row.name}</div>
                <div className="flex justify-center">
                   {row.free ? (
                      <Check className="text-white w-5 h-5" />
                   ) : (
                      <div className="w-4 h-1 bg-[#262626] rounded-full" />
                   )}
                </div>
                <div className="flex justify-center">
                   {row.pro ? (
                      <div className="bg-primary/20 p-1 rounded-full">
                         <Check className="text-primary w-4 h-4" />
                      </div>
                   ) : (
                      <X className="text-red-500 w-5 h-5" />
                   )}
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

const PublicPricing: React.FC<{ onBack: () => void; onSignup: () => void }> = ({ onBack, onSignup }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [showExitModal, setShowExitModal] = useState(false);
  const [hasShownExitModal, setHasShownExitModal] = useState(false);

  useEffect(() => {
     const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && !hasShownExitModal) {
           setShowExitModal(true);
           setHasShownExitModal(true);
        }
     };

     document.addEventListener('mouseleave', handleMouseLeave);
     return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShownExitModal]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 animate-fade-in font-sans selection:bg-primary selection:text-white">
      <ExitIntentFlow 
         isOpen={showExitModal} 
         onClose={() => setShowExitModal(false)} 
         onSignup={onSignup} 
      />

      {/* Nav */}
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-6 mb-12">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> <span className="font-medium">Back to Home</span>
          </button>
          <span className="font-bold text-xl tracking-widest text-white uppercase">Momentum</span>
          <div className="w-24"></div> {/* Spacer for centering */}
      </nav>

      <div className="max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-none">
            INVEST IN YOUR POTENTIAL.<br />
            <span className="text-primary">JOIN THE MOMENTUM.</span>
          </h1>
          
          {/* Toggle */}
          <div className="inline-flex bg-[#171717] p-1 rounded-full border border-[#262626] relative">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
            >
              Yearly
              <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wide ${billingCycle === 'yearly' ? 'bg-black text-white' : 'bg-primary/20 text-primary'}`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-start">
          
          {/* Starter */}
          <div className="bg-[#171717]/50 border border-[#262626] rounded-2xl p-8 flex flex-col h-full hover:border-white/20 transition-colors">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">STARTER</h3>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">For the casuals</p>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-black text-white">Free</span>
            </div>
            <Button variant="outline" onClick={onSignup} className="w-full mb-8 border-[#262626] text-white hover:bg-white/10">
              CREATE ACCOUNT
            </Button>
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-white" />
                <span className="text-gray-300">Manual Workout Logging</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-white" />
                <span className="text-gray-300">Basic Stats History</span>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <X className="w-5 h-5 text-red-500" />
                <span className="text-gray-500 line-through">AI Neural Coaching</span>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <X className="w-5 h-5 text-red-500" />
                <span className="text-gray-500 line-through">Retail Rewards</span>
              </div>
            </div>
          </div>

          {/* Pro - Hero Card */}
          <div className="bg-[#0a0a0a] border border-primary rounded-2xl p-8 flex flex-col h-full relative shadow-[0_0_50px_-10px_rgba(139,92,246,0.2)] scale-105 z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-black uppercase tracking-[0.2em] px-4 py-1 rounded-full shadow-lg">
              Most Popular
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                <Crown className="w-5 h-5 fill-current" /> PRO
              </h3>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">For the obsessed</p>
            </div>
            <div className="mb-8 flex flex-col">
              <div className="flex items-baseline gap-3">
                 <span className="text-5xl font-black text-white">{billingCycle === 'yearly' ? '99 SEK' : '129 SEK'}</span>
                 {billingCycle === 'yearly' && (
                    <span className="text-gray-500 font-bold line-through text-lg">129 SEK</span>
                 )}
                 <span className="text-gray-500 text-sm">/mo</span>
              </div>
              {billingCycle === 'yearly' && (
                  <span className="text-xs text-primary font-medium mt-2">Billed 1188 SEK yearly</span>
              )}
            </div>
            
            <ShinyButton onClick={onSignup} className="w-full mb-8">
              START 7-DAY TRIAL
            </ShinyButton>
            <p className="text-center text-xs text-gray-400 mb-8 font-medium -mt-4">
              Don't leave rewards on the table. Join 10k+ Pro users.
            </p>

            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-1 rounded-full"><Check className="w-4 h-4 text-primary" /></div>
                <span className="text-white font-bold">AI Neural Coaching</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-1 rounded-full"><Check className="w-4 h-4 text-primary" /></div>
                <span className="text-white font-bold">Unlimited Rewards</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-1 rounded-full"><Check className="w-4 h-4 text-primary" /></div>
                <span className="text-white font-bold">Advanced Biometrics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-1 rounded-full"><Check className="w-4 h-4 text-primary" /></div>
                <span className="text-white font-bold">Community Leaderboard Boost</span>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="bg-[#171717]/50 border border-[#262626] rounded-2xl p-8 flex flex-col h-full hover:border-white/20 transition-colors">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">TEAM</h3>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">For clubs & gyms</p>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-black text-white">Custom</span>
            </div>
            <Button variant="outline" className="w-full mb-8 border-[#262626] text-white hover:bg-white/10">
              CONTACT SALES
            </Button>
            <div className="space-y-4 flex-1">
               <p className="text-gray-400 text-sm leading-relaxed">
                 Bulk licenses for your entire roster. Includes dedicated support manager and custom team leaderboards.
               </p>
            </div>
          </div>

        </div>

        {/* Detailed Comparison Table */}
        <ComparisonTable />

        {/* FAQ Section */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-white mb-8 tracking-tight text-center">FREQUENTLY ASKED QUESTIONS</h2>
          <div className="space-y-2">
            <FAQItem 
              question="Can I cancel anytime?" 
              answer="Yes. No contracts, no hidden fees. Cancel via your settings panel with one click. We don't believe in trapping you." 
            />
            <FAQItem 
              question="How does the AI Coaching work?" 
              answer="Momentum analyzes your past workouts, sleep data (if connected), and daily HRV to build a custom regimen every morning. It adapts in real-time." 
            />
            <FAQItem 
              question="Are the rewards real?" 
              answer="Absolutely. We partner directly with brands like Nike, Gymshark, and Whoop. Your sweat equity translates directly into discounts." 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicPricing;