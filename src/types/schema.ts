import { z } from 'zod';

import { FieldTypeEnum } from '@/types/field';

export const OptionSchema = z.object({
  id: z.string(),
  label: z.string().min(1, '옵션 라벨을 입력해주세요'),
  value: z.string().optional(),
  checked: z.boolean().optional(),
});

export const FieldSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(FieldTypeEnum),
  label: z.string().min(1, '필드 라벨을 입력해주세요'),
  required: z.boolean(),
  order: z.number(),
  placeholder: z.string().optional(),
  options: z.array(OptionSchema).optional(),
});

export const TemplateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, '템플릿 이름을 입력해주세요'),
  description: z.string().optional(),
  fields: z.array(FieldSchema).min(1, '최소 하나의 필드가 필요합니다'),
});

export const ResponseAnswerSchema = z.object({
  fieldId: z.string(),
  value: z.union([
    z.string().min(1, '응답을 입력해주세요'),
    z.array(z.string()).min(1, '최소 하나의 옵션을 선택해주세요'),
    z.boolean(),
  ]),
});

export const SurveyResponseSchema = z.object({
  templateId: z.string().min(1, '템플릿 ID가 필요합니다'),
  respondentId: z.string().optional(),
  answers: z.array(ResponseAnswerSchema).min(1, '최소 하나의 응답이 필요합니다'),
  submittedAt: z.string().datetime(),
});

export type TemplateFormValues = z.infer<typeof TemplateSchema>;
export type FieldFormValues = z.infer<typeof FieldSchema>;
export type OptionFormValues = z.infer<typeof OptionSchema>;
export type SurveyResponse = z.infer<typeof SurveyResponseSchema>;
export type ResponseAnswer = z.infer<typeof ResponseAnswerSchema>;
