import { InertiaLinkProps as LinkProps } from '@inertiajs/react';

interface DropdownContextType {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    toggleOpen: () => void;
}

interface DropdownProps {
    children: React.ReactNode;
}

interface TriggerProps {
    children: React.ReactNode;
}

interface ContentProps {
    align?: 'left' | 'right';
    width?: '48' | string;
    contentClasses?: string;
    children: React.ReactNode;
}

interface DropdownLinkProps extends LinkProps {
    className?: string;
    children: React.ReactNode;
}
