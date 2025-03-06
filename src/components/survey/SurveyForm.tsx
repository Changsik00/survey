import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import CheckboxFieldSurvey from './CheckboxFieldSurvey';
import RadioFieldSurvey from './RadioFieldSurvey';
import TextFieldSurvey from './TextFieldSurvey';

import { FieldTypeEnum } from '@/types/field';
import { SurveyResponseSchema, SurveyResponse, TemplateFormValues, FieldFormValues } from '@/types/schema';

interface SurveyFormProps {
  template: TemplateFormValues & { id: string };
  onSubmit: (response: SurveyResponse) => void;
}

const SurveyForm = ({ template, onSubmit }: SurveyFormProps) => {
  const methods = useForm<SurveyResponse>({
    resolver: zodResolver(SurveyResponseSchema),
    defaultValues: {
      templateId: template.id,
      respondentId: '',
      answers: template.fields.map((field) => ({
        fieldId: field.id,
        value: field.type === FieldTypeEnum.CHECKBOX ? [] : '',
      })),
      submittedAt: new Date().toISOString(),
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const renderFieldSurvey = (field: FieldFormValues, index: number) => {
    switch (field.type) {
      case FieldTypeEnum.TEXT:
      case FieldTypeEnum.TEXTAREA:
        return <TextFieldSurvey field={field} index={index} control={control} />;
      case FieldTypeEnum.CHECKBOX:
        return <CheckboxFieldSurvey field={field} index={index} control={control} />;
      case FieldTypeEnum.RADIO:
        return <RadioFieldSurvey field={field} index={index} control={control} />;
      default:
        return null;
    }
  };

  const onFormSubmit = (data: SurveyResponse) => {
    console.warn('Survey submitted:', data); // 디버깅 로그
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md  text-gray-900"
      >
        <h2 className="text-xl font-semibold mb-4">{template.name}</h2>
        {template.description && <p className="mb-4">{template.description}</p>}
        {template.fields.map((field, index) => (
          <div key={field.id} className="mb-6">
            {renderFieldSurvey(field, index)}
          </div>
        ))}
        {/* 전체 에러 메시지 표시 */}
        {errors.templateId && <p className="mb-4 text-sm text-red-500">{errors.templateId.message}</p>}
        {errors.answers && !Array.isArray(errors.answers) && errors.answers.message && (
          <p className="mb-4 text-sm text-red-500">{errors.answers.message}</p>
        )}
        {errors.answers &&
          Array.isArray(errors.answers) &&
          errors.answers.map(
            (answer, idx) =>
              answer?.value && (
                <p key={idx} className="mb-4 text-sm text-red-500">
                  {answer.value.message}
                </p>
              )
          )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          제출
        </button>
      </form>
    </FormProvider>
  );
};

export default SurveyForm;
