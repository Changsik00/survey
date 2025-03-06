import { useFormContext } from 'react-hook-form';

import { TemplateFormValues } from '@/types/schema';

const TextFieldEditor = ({ index }: { index: number }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TemplateFormValues>();

  return (
    <>
      <div className="mb-2">
        <label htmlFor={`fields.${index}.label`} className="block text-sm font-medium text-gray-700 mb-1">
          라벨
        </label>
        <input
          id={`fields.${index}.label`}
          {...register(`fields.${index}.label`)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.fields?.[index]?.label && (
          <p className="mt-1 text-sm text-red-500">{errors.fields[index].label?.message}</p>
        )}
      </div>
      <div className="mb-2">
        <label htmlFor={`fields.${index}.placeholder`} className="block text-sm font-medium text-gray-700 mb-1">
          플레이스홀더
        </label>
        <input
          id={`fields.${index}.placeholder`}
          {...register(`fields.${index}.placeholder`)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          id={`fields.${index}.required`}
          {...register(`fields.${index}.required`)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor={`fields.${index}.required`} className="text-sm text-gray-700">
          필수
        </label>
      </div>
    </>
  );
};

export default TextFieldEditor;
