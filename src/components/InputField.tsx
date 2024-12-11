const InputField: React.FC<{ label: string; placeholder?: string; type?: string; defaultValue?: string|number; id?: string}> = ({ 
    label, 
    placeholder, 
    type = "text",
    defaultValue,
    id = ''
  }) => (
    <div className="input-field">
      <label>
        {label}
        <input id={id} type={type} placeholder={placeholder} defaultValue={defaultValue} />
      </label>
    </div>
  );

  export default InputField;