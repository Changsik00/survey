import { useController, UseControllerProps } from 'react-hook-form';

import { SurveyResponse, FieldFormValues } from '@/types/schema';

interface CheckboxFieldSurveyProps {
  field: FieldFormValues;
  index: number;
  control: UseControllerProps<SurveyResponse>['control'];
}

const CheckboxFieldSurvey = ({ field, index, control }: CheckboxFieldSurveyProps) => {
  const {
    field: { onChange, value = [] },
  } = useController({
    name: `answers.${index}.value` as const,
    control,
    defaultValue: [],
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
            type="checkbox"
            id={`answer-${field.id}-${optIndex}`}
            checked={(value as string[]).includes(option.label)}
            onChange={(e) => {
              const newValue = e.target.checked
                ? [...(value as string[]), option.label]
                : (value as string[]).filter((v) => v !== option.label);
              onChange(newValue);
            }}
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

export default CheckboxFieldSurvey;
