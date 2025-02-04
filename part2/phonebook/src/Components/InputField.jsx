const InputField = ({onChange, value, text_description}) => {
    return (
        <div>
          {text_description}: <input value={value} onChange={onChange} />
        </div>
    )
}

export default InputField