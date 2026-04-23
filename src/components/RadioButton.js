export default function RadioButton({
  id,
  name,
  value,
  label,
  className = "",
  ...props
}) {
  // id y name son opcionales, pero se recomiendan en formularios para accesibilidad y envío de datos.
  return (
    <label htmlFor={id || undefined} className={`inline-flex cursor-pointer items-center gap-2 ${className}`}>
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
        {...props}
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}