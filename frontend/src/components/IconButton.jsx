import TooltipWrapper from './TooltipWrapper.jsx';

function IconButton({ title, onClick, icon, attrs }) {
    return (
        <TooltipWrapper title={title}>
            <button type="button" className="icon text-2xl" onClick={onClick} {...attrs}>
                {icon}
            </button>
        </TooltipWrapper>
    );
}

export default IconButton;
