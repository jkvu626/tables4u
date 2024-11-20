const InputField: React.FC<{ label: string; placeholder: string; type?: string; id?: string}> = ({ 
    label, 
    placeholder, 
    type = "text",
    id = ''
  }) => (
    <div className="input-field">
      <label>
        {label}
        <input id={id} type={type} placeholder={placeholder} />
      </label>
    </div>
  );

  export default InputField;