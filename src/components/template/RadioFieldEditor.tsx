import { useFieldArray, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { TemplateFormValues } from '@/types/schema';

const RadioFieldEditor = ({ index }: { index: number }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TemplateFormValues>();
  const {
    fields: options,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `fields.${index}.options`,
  });

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
        <p className="block text-sm font-medium text-gray-700 mb-1">옵션</p>
        {options.map((option, optIndex) => (
          <div key={option.id} className="flex items-center gap-2 mb-2">
            <input
              id={`fields.${index}.options.${optIndex}.label`}
              {...register(`fields.${index}.options.${optIndex}.label`)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* value 필드 제거 */}
            <button
              type="button"
              onClick={() => remove(optIndex)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            append({
              id: uuidv4(),
              label: `옵션 ${options.length + 1}`,
              value: `option-${options.length + 1}`, // 자동 생성된 value
            })
          }
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          옵션 추가
        </button>
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

export default RadioFieldEditor;
