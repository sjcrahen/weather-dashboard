import TooltipWrapper from './TooltipWrapper.jsx';

function IconButton({ title, onClick, icon }) {
    return (
        <TooltipWrapper title={title}>
            <button type="button" className="icon text-2xl" onClick={onClick}>
                {icon}
            </button>
        </TooltipWrapper>
    );
}

export default IconButton;
