export function Label({
  children,
  htmlFor,
  ...props
}: {
  children: React.ReactNode;
  htmlFor?: string;
} & React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700 mb-2"
      {...props}
    >
      {children}
    </label>
  );
}
