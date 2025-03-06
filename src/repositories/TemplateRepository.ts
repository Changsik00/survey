import { TemplateFormValues } from '@/types/schema';

export interface TemplateRepository {
  save(template: TemplateFormValues): void;
  findById(id: string): TemplateFormValues | null;
  findAll(): TemplateFormValues[];
  delete(id: string): void;
}

export interface TemplateWithId extends TemplateFormValues {
  id: string;
}
