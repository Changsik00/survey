import { useController, UseControllerProps } from 'react-hook-form';

import { FieldTypeEnum } from '@/types/field';
import { SurveyResponse, FieldFormValues } from '@/types/schema';

interface TextFieldSurveyProps {
  field: FieldFormValues;
  index: number;
  control: UseControllerProps<SurveyResponse>['control'];
}

const TextFieldSurvey = ({ field, index, control }: TextFieldSurveyProps) => {
  const {
    field: { onChange, value },
  } = useController({
    name: `answers.${index}.value` as const,
    control,
    defaultValue: '',
    rules: { required: field.required },
  });

  return (
    <div className="mb-4">
      <label htmlFor={`answer-${field.id}`} className="block text-sm font-medium text-gray-700 mb-2">
        {field.label} {field.required && '*'}
      </label>
      <input
        id={`answer-${field.id}`}
        type={field.type === FieldTypeEnum.TEXTAREA ? 'textarea' : 'text'}
        value={value as string}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={field.placeholder}
      />
    </div>
  );
};

export default TextFieldSurvey;
