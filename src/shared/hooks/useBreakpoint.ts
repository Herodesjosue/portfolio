import { useEffect, useState } from 'react';

const useBreakpoint = (breakpoint = 768): boolean => {
    const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(
        typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
    );

    useEffect(() => {
        const handleResize = () => {
            setIsBelowBreakpoint(window.innerWidth < breakpoint);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [breakpoint]);

    return isBelowBreakpoint;
};

export default useBreakpoint;
