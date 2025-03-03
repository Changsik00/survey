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
      <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        {/* 템플릿 이름 입력 */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            템플릿 이름
          </label>
          <input
            id="name"
            {...register('name')}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        {/* 설명 입력 */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            설명
          </label>
          <textarea
            id="description"
            {...register('description')}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
        </div>

        {/* 필드 관리 섹션 */}
        <div className="mb-6">
          <FieldsManager />
        </div>

        {/* fields 배열 에러 */}
        {errors.fields && !Array.isArray(errors.fields) && errors.fields.message && (
          <p className="mb-4 text-sm text-red-500">{errors.fields.message}</p>
        )}

        {/* 버튼 섹션 */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
          >
            저장
          </button>
          <button
            type="button"
            onClick={() => history.back()}
            className="w-full bg-gray-300 text-gray-700 p-3 rounded-md hover:bg-gray-400 transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default TemplateForm;
