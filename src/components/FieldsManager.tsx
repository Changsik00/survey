// src/components/FieldsManager.tsx
import { useFieldArray, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import RadioFieldEditor from '@/components/template//RadioFieldEditor';
import TextFieldEditor from '@/components/template//TextFieldEditor';
import CheckboxFieldEditor from '@/components/template/CheckboxFieldEditor';
import { FieldTypeEnum } from '@/types/field';
import { TemplateFormValues } from '@/types/schema';

const FieldsManager = () => {
  const { control } = useFormContext<TemplateFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });

  const addField = (type: FieldTypeEnum) => {
    const baseField = {
      id: uuidv4(),
      type,
      label: `New ${type} field`,
      required: false,
      order: fields.length,
    };

    if (type === FieldTypeEnum.CHECKBOX || type === FieldTypeEnum.RADIO) {
      append({
        ...baseField,
        options: [{ id: uuidv4(), label: '옵션 1', checked: false }],
      });
    } else {
      append(baseField);
    }
  };

  const renderFieldEditor = (field: unknown, index: number) => {
    if (isCheckboxField(field)) {
      return <CheckboxFieldEditor index={index} />;
    } else if (isRadioField(field)) {
      return <RadioFieldEditor index={index} />;
    } else {
      return <TextFieldEditor index={index} />;
    }
  };

  // 타입 가드: 필드가 CheckboxField인지 확인
  const isCheckboxField = (field: unknown): field is { type: FieldTypeEnum.CHECKBOX } =>
    typeof field === 'object' && field !== null && 'type' in field && field.type === FieldTypeEnum.CHECKBOX;

  // 타입 가드: 필드가 RadioField인지 확인
  const isRadioField = (field: unknown): field is { type: FieldTypeEnum.RADIO } =>
    typeof field === 'object' && field !== null && 'type' in field && field.type === FieldTypeEnum.RADIO;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">필드</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
          {renderFieldEditor(field, index)}
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
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          텍스트 추가
        </button>
        <button
          type="button"
          onClick={() => addField(FieldTypeEnum.CHECKBOX)}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          체크박스 추가
        </button>
        <button
          type="button"
          onClick={() => addField(FieldTypeEnum.RADIO)}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          라디오 추가
        </button>
      </div>
    </div>
  );
};

export default FieldsManager;
