import { z } from 'zod';

export enum FieldTypeEnum {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  DROPDOWN = 'dropdown',
}

export const FieldTypeKeySchema = z.enum(
  Object.keys(FieldTypeEnum) as [keyof typeof FieldTypeEnum, ...Array<keyof typeof FieldTypeEnum>]
);
export type FieldTypeKey = z.infer<typeof FieldTypeKeySchema>; // "TEXT" | "TEXTAREA" | ...

export const FieldTypeValueSchema = z.enum(Object.values(FieldTypeEnum) as [string, ...string[]]);
export type FieldTypeValue = z.infer<typeof FieldTypeValueSchema>; // "text" | "textarea" | ...
