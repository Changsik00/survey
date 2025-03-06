import { useController, UseControllerProps } from 'react-hook-form';

import { FieldFormValues, SurveyResponse } from '@/types/schema';

interface RadioFieldSurveyProps {
  field: FieldFormValues;
  index: number;
  control: UseControllerProps<SurveyResponse>['control'];
}

const RadioFieldSurvey = ({ field, index, control }: RadioFieldSurveyProps) => {
  const {
    field: { onChange, value = '' },
  } = useController({
    name: `answers.${index}.value` as const,
    control,
    defaultValue: '',
    rules: { required: field.required },
  });

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {field.label} {field.required && '*'}
      </label>
      {field.options?.map((option, optIndex) => (
        <div key={option.id} className="flex items-center mb-2">
          <input
            type="radio"
            id={`answer-${field.id}-${optIndex}`}
            value={option.label}
            checked={value === option.label}
            onChange={onChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor={`answer-${field.id}-${optIndex}`} className="ml-2 text-sm text-gray-700">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioFieldSurvey;
