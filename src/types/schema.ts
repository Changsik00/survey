import { z } from 'zod';

import { FieldTypeEnum } from '@/types//field';

export const OptionSchema = z.object({
  id: z.string(),
  label: z.string().min(1, '옵션 라벨을 입력해주세요'),
  value: z.string().optional(), // radio에서 사용
  checked: z.boolean().optional(), // checkbox에서 사용
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
  fields: z.array(FieldSchema),
});

export type TemplateFormValues = z.infer<typeof TemplateSchema>;
export type FieldFormValues = z.infer<typeof FieldSchema>;
export type OptionFormValues = z.infer<typeof OptionSchema>;
