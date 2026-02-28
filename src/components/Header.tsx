import React from 'react';
import EcosystemDropdown from './EcosystemDropdown';
import { LanguageSelector } from './LanguageSelector';

const Header: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-wurm-bg/80 backdrop-blur-md border-b border-wurm-border px-4 h-14 flex items-center justify-end gap-2">
            <LanguageSelector />
            <EcosystemDropdown />
        </div>
    );
};

export default Header;
