import { useState, useEffect, useRef } from 'react';

export default function WeddingLetterHazel() {
  const [stage, setStage] = useState('start');
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('https://drive.google.com/uc?export=download&id=1d-befPS_T-rxejmg0W8nLPXxZuTp1ncP');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    return () => { if (audioRef.current) audioRef.current.pause(); };
  }, []);

  const startExperience = () => {
    if (audioRef.current) audioRef.current.play().catch(e => console.log('Audio blocked'));
    setStage('envelope');
  };

  const openEnvelope = () => {
    setStage('opening');
    setTimeout(() => setStage('letter'), 1000);
  };

  const petals = Array.from({ length: 15 }, (_, i) => (
    <div key={i} className="fixed pointer-events-none" style={{
      width: 10 + Math.random() * 10, height: 10 + Math.random() * 10,
      left: `${Math.random() * 100}%`, top: '-20px',
      background: ['#D4A5A5', '#F5E6E0', '#9CAF88', '#C9A962', '#722F37'][Math.floor(Math.random() * 5)],
      borderRadius: '50% 0 50% 50%', opacity: 0.4,
      animation: `fall ${15 + Math.random() * 10}s linear infinite`,
      animationDelay: `${Math.random() * 15}s`,
    }} />
  ));

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FDF8F5 0%, #F5E6E0 50%, #D4A5A5 100%)', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Great+Vibes&display=swap');
        @keyframes fall { 0% { transform: translateY(-100vh) rotate(0deg); opacity: 0; } 10% { opacity: 0.4; } 90% { opacity: 0.4; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.8; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes flapOpen { 0% { transform: rotateX(0deg); } 100% { transform: rotateX(180deg); } }
        @keyframes sealBreak { 0% { transform: translateX(-50%) scale(1) rotate(0deg); opacity: 1; } 100% { transform: translateX(-50%) scale(0) rotate(180deg); opacity: 0; } }
        @keyframes letterRise { 0% { transform: translateY(0); } 100% { transform: translateY(-120%); opacity: 0; } }
        .font-script { font-family: 'Great Vibes', cursive; }
        .font-elegant { font-family: 'Cormorant Garamond', Georgia, serif; }
      `}</style>

      {petals}

      {stage === 'start' && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 cursor-pointer" style={{ background: 'rgba(45, 74, 62, 0.95)' }} onClick={startExperience}>
          <h2 className="font-script text-5xl md:text-6xl mb-6 text-center px-8" style={{ color: '#FDF8F5' }}>You have a letter...</h2>
          <p className="font-elegant text-xl italic mb-10" style={{ color: '#D4A5A5' }}>tap to open</p>
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ border: '2px solid #C9A962', animation: 'pulse 2s ease-in-out infinite' }}>
            <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#C9A962"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
        </div>
      )}

      {(stage === 'envelope' || stage === 'opening') && (
        <div className="w-full max-w-md px-5">
          <div className="relative cursor-pointer" style={{ aspectRatio: '1.5 / 1', perspective: '1000px' }} onClick={stage === 'envelope' ? openEnvelope : undefined}>
            <div className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(180deg, #E8DFD5 0%, #DED4C8 100%)', boxShadow: '0 15px 50px rgba(114, 47, 55, 0.25)' }} />
            <div className="absolute flex items-center justify-center rounded" style={{ top: '15%', left: '8%', width: '84%', height: '70%', background: 'linear-gradient(180deg, #FFFEF9 0%, #F9F6F0 100%)', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', animation: stage === 'opening' ? 'letterRise 1s ease-out forwards' : 'none' }}>
              <span className="font-script text-2xl" style={{ color: '#722F37', opacity: 0.6 }}>For you...</span>
            </div>
            <div className="absolute top-0 left-0 w-full" style={{ height: '60%', background: 'linear-gradient(180deg, #DED4C8 0%, #E8DFD5 100%)', clipPath: 'polygon(0 0, 50% 100%, 100% 0)', transformOrigin: 'top center', transformStyle: 'preserve-3d', animation: stage === 'opening' ? 'flapOpen 0.8s ease-out forwards' : 'none' }} />
            <div className="absolute left-1/2 flex items-center justify-center rounded-full" style={{ top: 'calc(60% - 30px)', transform: 'translateX(-50%)', width: 60, height: 60, background: 'radial-gradient(circle at 30% 30%, #9B3D47, #722F37 50%, #5A1F26)', boxShadow: '0 4px 20px rgba(114, 47, 55, 0.5)', animation: stage === 'opening' ? 'sealBreak 0.6s ease-out forwards' : 'none' }}>
              <span className="font-script text-lg" style={{ color: '#FDF8F5', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>F & P</span>
            </div>
          </div>
          {stage === 'envelope' && <p className="text-center mt-8 italic font-elegant text-lg" style={{ color: '#2D4A3E', opacity: 0.8 }}>tap the seal to open</p>}
        </div>
      )}

      {stage === 'letter' && (
        <div className="fixed inset-0 flex items-start justify-center px-4 py-8 overflow-y-auto z-50" style={{ background: 'linear-gradient(180deg, #FDF8F5 0%, #F5E6E0 100%)' }}>
          <div className="w-full max-w-lg rounded-xl p-8 md:p-12 my-4" style={{ background: 'linear-gradient(180deg, #FFFEF9 0%, #FAF7F2 100%)', boxShadow: '0 25px 80px rgba(114, 47, 55, 0.18)', animation: 'fadeInUp 1s ease-out' }}>
            <div className="text-center mb-10"><span className="text-5xl">💌</span></div>
            <p className="font-script text-4xl md:text-5xl mb-8" style={{ color: '#2D4A3E' }}>My dearest Hazel,</p>
            <div className="font-elegant text-lg md:text-xl space-y-5" style={{ color: '#4A4A4A', lineHeight: 2 }}>
              <p>My Day 1. From the very beginning, you've been there, and the fact that you'll be there on one of the biggest days of my life means everything to me.</p>
              <p>Phil and I are keeping things intimate. I'll have just two bridesmaids standing beside me, but you are absolutely one of my girls, and I'd love for that to show.</p>
              <p>If you're open to it, I'd love you to wear something in one of our wedding colours:</p>
              <div className="py-5 px-6 rounded-xl text-center my-8" style={{ background: 'linear-gradient(90deg, #722F37, #D4A5A5, #2D4A3E, #C9A962)' }}>
                <span className="text-white font-semibold tracking-wide" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>burgundy · blush pink · forest green · muted gold</span>
              </div>
              <p>No need to match anyone else. Pick whichever shade makes you feel beautiful and a style you love. You'll all look gorgeous together without being "matching bridesmaids," which feels right for us.</p>
              <p>No pressure on where you shop or what you spend. It's about having the people I love most looking like they belong to our day.</p>
              <p>Can't wait to celebrate with you.</p>
            </div>
            <div className="text-right mt-12 font-elegant text-xl" style={{ color: '#4A4A4A' }}>
              <p>All my love,</p>
              <p className="font-script text-4xl mt-3" style={{ color: '#722F37' }}>Flo x</p>
            </div>
            <div className="text-center mt-12 pt-8 font-elegant" style={{ borderTop: '1px solid #D4A5A5' }}>
              <p className="italic text-lg" style={{ color: '#9CAF88' }}>11th July 2026</p>
              <p className="font-script text-2xl mt-2" style={{ color: '#722F37' }}>LovePhiled</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
