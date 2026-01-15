export default function Input({ label, type = 'text', value, onChange, ...props }) {
    return (
      <div className="input-container">
        <label>{label}</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    );
  }