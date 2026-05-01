function InputField({ label, error, ...props }) {
  return (
    <label className="input-group">
      <span>{label}</span>
      <input className={error ? 'input-error' : ''} {...props} />
      {error && <small>{error}</small>}
    </label>
  )
}

export default InputField
