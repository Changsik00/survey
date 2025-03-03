import { useFieldArray, useFormContext } from 'react-hook-form';

import { FieldTypeValue, FieldTypeEnum } from '@/types/field';
import { TemplateFormValues } from '@/types/schema';

const FieldsManager = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TemplateFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });

  const addField = (type: FieldTypeValue) => {
    append({
      id: crypto.randomUUID(),
      type,
      label: `New ${type} field`,
      required: false,
      order: fields.length,
    });
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">필드</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">라벨</label>
            <input
              {...register(`fields.${index}.label`)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.fields?.[index]?.label && (
              <p className="mt-1 text-sm text-red-500">{errors.fields[index].label.message}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">타입</label>
            <select
              {...register(`fields.${index}.type`)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={FieldTypeEnum.TEXT}>텍스트</option>
              <option value={FieldTypeEnum.TEXTAREA}>텍스트 영역</option>
              <option value={FieldTypeEnum.CHECKBOX}>체크박스</option>
              <option value={FieldTypeEnum.RADIO}>라디오</option>
              <option value={FieldTypeEnum.DROPDOWN}>드롭다운</option>
            </select>
            {errors.fields?.[index]?.type && (
              <p className="mt-1 text-sm text-red-500">{errors.fields[index].type.message}</p>
            )}
          </div>

          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              {...register(`fields.${index}.required`)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">필수</span>
          </label>

          <button
            type="button"
            onClick={() => remove(index)}
            className="mt-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
          >
            삭제
          </button>
        </div>
      ))}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => addField(FieldTypeEnum.TEXT)}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          텍스트 추가
        </button>
        <button
          type="button"
          onClick={() => addField(FieldTypeEnum.CHECKBOX)}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          체크박스 추가
        </button>
      </div>
    </div>
  );
};

export default FieldsManager;
