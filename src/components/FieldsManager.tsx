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
    <div>
      <h3>필드</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="field-item">
          <div>
            <input {...register(`fields.${index}.label`)} />
            {errors.fields?.[index]?.label && <p className="error">{errors.fields[index].label.message}</p>}
          </div>

          <div>
            <select {...register(`fields.${index}.type`)}>
              <option value={FieldTypeEnum.TEXT}>텍스트</option>
              <option value={FieldTypeEnum.TEXTAREA}>텍스트 영역</option>
              <option value={FieldTypeEnum.CHECKBOX}>체크박스</option>
              <option value={FieldTypeEnum.RADIO}>라디오</option>
              <option value={FieldTypeEnum.DROPDOWN}>드롭다운</option>
            </select>
            {errors.fields?.[index]?.type && <p className="error">{errors.fields[index].type.message}</p>}
          </div>

          <label>
            <input type="checkbox" {...register(`fields.${index}.required`)} />
            필수
          </label>

          <button type="button" onClick={() => remove(index)}>
            삭제
          </button>
        </div>
      ))}

      <div className="field-actions">
        <button type="button" onClick={() => addField(FieldTypeEnum.TEXT)}>
          텍스트 추가
        </button>
        <button type="button" onClick={() => addField(FieldTypeEnum.CHECKBOX)}>
          체크박스 추가
        </button>
      </div>
    </div>
  );
};

export default FieldsManager;
