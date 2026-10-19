// React 19: ref is accepted directly as a prop without forwardRef()
export function CustomInput({ label, ref, ...props }) {
  return (
    <div className="custom-input-group">
      {label && <label className="input-label">{label}</label>}
      <input ref={ref} className="custom-input" {...props} />
    </div>
  );
}
