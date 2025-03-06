import { v4 as uuidv4 } from 'uuid';

import { TemplateRepository } from '@/repositories/TemplateRepository.ts';
import { TemplateFormValues } from '@/types/schema';

export class LocalStorageTemplateRepository implements TemplateRepository {
  private readonly STORAGE_KEY = 'survey_templates';

  save(template: TemplateFormValues): void {
    const templates = this.getTemplates();
    const existingIndex = templates.findIndex((t) => t.id === template.id);

    if (existingIndex >= 0) {
      templates[existingIndex] = template; // 업데이트
    } else {
      if (!template.id) {
        template.id = uuidv4(); // ID 생성
      }
      templates.push(template); // 추가
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(templates));
  }

  findById(id: string): TemplateFormValues | null {
    const templates = this.getTemplates();
    return templates.find((t) => t.id === id) || null;
  }

  findAll(): TemplateFormValues[] {
    return this.getTemplates();
  }

  delete(id: string): void {
    const templates = this.getTemplates();
    const updatedTemplates = templates.filter((t) => t.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedTemplates));
  }

  private getTemplates(): TemplateFormValues[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}
