import React from 'react';
import EcosystemDropdown from './EcosystemDropdown';
import { LanguageSelector } from './LanguageSelector';

const Header: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-wurm-bg/80 backdrop-blur-md border-b border-wurm-border px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <img src="/logo.jpg" alt="A Guilda" className="w-8 h-8 rounded-full border border-wurm-accent/20"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                <span className="font-serif font-bold text-wurm-accent tracking-tight hidden sm:block">A GUILDA</span>
            </div>

            <div className="flex items-center gap-2">
                <LanguageSelector />
                <EcosystemDropdown />
            </div>
        </div>
    );
};

export default Header;
