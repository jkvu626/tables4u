const InputField: React.FC<{ label: string; placeholder?: string; type?: string; pattern?: string; defaultValue?: string|number; id?: string}> = ({ 
    label, 
    placeholder, 
    type = "text",
    defaultValue,
    id = '',
    pattern
  }) => (
    <div className="input-field">
      <label>
        {label}
        <input id={id} type={type} placeholder={placeholder} defaultValue={defaultValue} pattern={pattern}/>
      </label>
    </div>
  );

  export default InputField;