/**
 * Utility functions for responsive design
 */

export const isMobile = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
};

export const isTablet = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth > 768 && window.innerWidth <= 1024;
};

export const isDesktop = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth > 1024;
};

export const useIsomorphicLayoutEffect = () => {
    if (typeof window === 'undefined') return null;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { useEffect, useLayoutEffect } = require('react');
    return typeof window !== 'undefined' ? useLayoutEffect : useEffect;
};

