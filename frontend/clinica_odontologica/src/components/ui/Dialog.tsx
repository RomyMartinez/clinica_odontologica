import { ButtonForm } from "./ButtonForm";

interface DialogDetailsProps {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  formId?: string;
  isPending: boolean;
  onEdit?: () => void;
  isEditing?: boolean;
}

export function Dialog({
  open,
  title,
  children,
  onClose,
  formId,
  isPending,
  onEdit,
  isEditing,
}: DialogDetailsProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-3xl w-full max-h-[95vh] overflow-hidden">
        <div className="bg-blue-600 px-8 py-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
              {title}
            </h3>
          </div>
        </div>
        <div className="p-8">{children}</div>
        <div className="flex justify-end gap-4 p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
          <ButtonForm isCancel={true} name="Fechar" onClick={onClose} />
          {onEdit && !isEditing && (
            <ButtonForm isCancel={false} name="Editar" onClick={onEdit} />
          )}
          {isEditing && formId && (
            <ButtonForm
              isCancel={false}
              name="Salvar"
              type="submit"
              form={formId}
              disabled={isPending}
            />
          )}
          {!onEdit && !isEditing && formId && (
            <ButtonForm
              isCancel={false}
              name="Salvar"
              type="submit"
              form={formId}
              disabled={isPending}
            />
          )}
        </div>
      </div>
    </div>
  );
}
