import { Label } from "./Label";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  htmlFor: string;
}

export function FormField({ label, children, htmlFor }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
