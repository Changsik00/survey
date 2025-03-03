import { z } from 'zod';

import { FieldTypeValueSchema } from '@/types/field';

export const TemplateSchema = z.object({
  name: z.string().min(1, '템플릿 이름은 필수입니다.'),
  description: z.string().optional(),
  fields: z
    .array(
      z.object({
        id: z.string(),
        type: FieldTypeValueSchema,
        label: z.string().min(1, '필드 이름은 필수입니다.'),
        required: z.boolean(),
        order: z.number(),
      })
    )
    .min(1, '최소 하나의 필드가 필요합니다.'),
});

export type TemplateFormValues = z.infer<typeof TemplateSchema>;
