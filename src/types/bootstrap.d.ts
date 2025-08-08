declare global {
    interface Window {
        bootstrap: {
            Modal: new (element: HTMLElement, options?: {}) => {
                show: () => void;
                hide: () => void;
            };
        };
    }
}

export {};