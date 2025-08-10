import { useEffect, useRef, useState } from 'react';

function TooltipWrapper({ children, title }) {
    const wrapperRef = useRef();
    const tooltipRef = useRef();
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (visible && wrapperRef.current && tooltipRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            const tipRect = tooltipRef.current.getBoundingClientRect();
            const tooltipWidth = tipRect.width; // adjust to match your tooltip max width
            let left = rect.left + rect.width / 2 - tooltipWidth / 2;
            const top = rect.bottom - 4; // 8px gap below element

            // Check left overflow
            if (left < 0) {
                left = 8; // padding from left edge
            }

            // Check right overflow
            const rightEdge = left + tooltipWidth;
            if (rightEdge > window.innerWidth) {
                left = window.innerWidth - tooltipWidth - 8; // padding from right edge
            }

            setPosition({ left, top });
        }
    }, [visible]);

    return (
        <>
            <span ref={wrapperRef} className="tooltip-wrapper" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
                {children}
            </span>
            <div ref={tooltipRef} className={`tooltip ${visible ? 'visible' : ''}`} style={{ top: position.top, left: position.left }}>
                {title}
            </div>
        </>
    );
}

export default TooltipWrapper;
