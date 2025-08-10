function Input({ label, type, name, value, onInput, required, containerClass }) {
    return (
        <div className={`form-control flex flex-col ${containerClass ?? ''}`}>
            {label && (
                <label className={`mb-1 ${required ? 'required' : ''}`} htmlFor={`${name}-input`}>
                    {label}
                </label>
            )}
            <input id={`${name}-input`} type={type} name={name} autoComplete="off" value={value} onInput={onInput} required={required} />
        </div>
    );
}

export default Input;
