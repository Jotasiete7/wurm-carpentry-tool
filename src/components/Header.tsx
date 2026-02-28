import React from 'react';
import EcosystemDropdown from './EcosystemDropdown';
import { LanguageSelector } from './LanguageSelector';

const Header: React.FC = () => {
    return (
        <div className="fixed top-4 right-4 z-[100] bg-wurm-panel/90 backdrop-blur-md border border-wurm-border rounded-lg px-3 py-1.5 flex items-center justify-end gap-3 shadow-lg">
            <LanguageSelector />
            <div className="w-px h-4 bg-wurm-border" />
            <EcosystemDropdown />
        </div>
    );
};

export default Header;
