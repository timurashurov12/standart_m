import { ContentProps, DropdownContextType, DropdownLinkProps, DropdownProps, TriggerProps } from '@/types/dropdown';
import { Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react';
import { createContext, Fragment, useContext, useState } from 'react';

const DropDownContext = createContext<DropdownContextType | undefined>(undefined);

const Dropdown = ({ children }: DropdownProps) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative cursor-pointer">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }: TriggerProps) => {
    const context = useContext(DropDownContext);
    if (!context) throw new Error('Trigger must be used within a Dropdown');

    const { open, setOpen, toggleOpen } = context;

    return (
        <>
            <button onClick={toggleOpen} className="flex items-center justify-between gap-2">
                {children}
                {open ? <ChevronUpIcon className="h-5 w-5" aria-hidden="true" /> : <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />}
            </button>

            {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}
        </>
    );
};

const Content = ({ align = 'right', width = '48', contentClasses = 'bg-black/80', children }: ContentProps) => {
    const context = useContext(DropDownContext);
    if (!context) throw new Error('Content must be used within a Dropdown');

    const { open, setOpen, toggleOpen } = context;

    let alignmentClasses = 'origin-top';

    if (align === 'left') {
        alignmentClasses = 'origin-top-left left-0';
    } else if (align === 'right') {
        alignmentClasses = 'origin-top-right right-0';
    }

    let widthClasses = '';

    if (width === '48') {
        widthClasses = 'w-48';
    }

    return (
        <>
            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div
                    className={`absolute z-50 mt-3 overflow-hidden rounded-xl shadow-lg ${alignmentClasses} ${widthClasses}`}
                    onClick={() => setOpen(false)}
                    onMouseLeave={toggleOpen}
                >
                    <div className={`ring-opacity-5 rounded-xl ring-1 ring-black ` + contentClasses}>{children}</div>
                </div>
            </Transition>
        </>
    );
};

const DropdownLink = ({ className = '', children, ...props }: DropdownLinkProps) => {
    const context = useContext(DropDownContext);
    if (!context) throw new Error('DropdownLink must be used within a Dropdown');

    const { setOpen } = context;

    return (
        <Link
            {...props}
            className={
                'hover:bg-mainColor focus:bg-mainColor block w-full px-5 py-3 text-left text-sm leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none ' +
                className
            }
            onClick={() => setOpen(false)}
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
