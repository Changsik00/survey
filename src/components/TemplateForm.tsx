import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import FieldsManager from '@/components/FieldsManager';
import { TemplateSchema, TemplateFormValues } from '@/types/schema';

interface TemplateFormProps {
  onSubmit: (data: TemplateFormValues) => void;
  defaultValues?: Partial<TemplateFormValues>;
}

const TemplateForm = ({ onSubmit, defaultValues }: TemplateFormProps) => {
  const methods = useForm<TemplateFormValues>({
    resolver: zodResolver(TemplateSchema),
    defaultValues: defaultValues || {
      name: '',
      description: '',
      fields: [],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleFormSubmit = (data: TemplateFormValues) => {
    onSubmit(data); // 유효성 검사가 통과된 데이터만 전달
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <label htmlFor="name">템플릿 이름</label>
          <input id="name" {...register('name')} />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="description">설명</label>
          <textarea id="description" {...register('description')} />
          {errors.description && <p className="error">{errors.description.message}</p>}
        </div>

        <FieldsManager />

        {errors.fields && !Array.isArray(errors.fields) && errors.fields.message && (
          <p className="error">{errors.fields.message}</p>
        )}

        <div className="form-actions">
          <button type="submit">저장</button>
          <button type="button" onClick={() => history.back()}>
            취소
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default TemplateForm;
