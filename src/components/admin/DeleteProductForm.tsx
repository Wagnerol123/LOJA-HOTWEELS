"use client";

export default function DeleteProductForm({
  id,
  name,
  action,
}: {
  id: string;
  name: string;
  action: (formData: FormData) => void;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Excluir "${name}"? Essa ação não pode ser desfeita.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-xs font-bold uppercase tracking-wide text-red-600 hover:underline"
      >
        Excluir
      </button>
    </form>
  );
}
