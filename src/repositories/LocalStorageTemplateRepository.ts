import { v4 as uuidv4 } from 'uuid';

import { TemplateRepository, TemplateWithId } from './TemplateRepository';

import { SurveyResponse, TemplateFormValues } from '@/types/schema';

export class LocalStorageTemplateRepository implements TemplateRepository {
  private readonly TEMPLATE_KEY = 'survey_templates';
  private readonly RESPONSE_KEY = 'survey_responses';

  save(template: TemplateFormValues): TemplateWithId {
    const templates = this.getTemplates();
    const templateWithId: TemplateWithId = {
      ...template,
      id: template.id || uuidv4(),
    };

    const existingIndex = templates.findIndex((t) => t.id === templateWithId.id);
    if (existingIndex >= 0) {
      templates[existingIndex] = templateWithId;
    } else {
      templates.push(templateWithId);
    }

    localStorage.setItem(this.TEMPLATE_KEY, JSON.stringify(templates));
    return templateWithId;
  }

  saveResponse(response: SurveyResponse): void {
    const responses = this.getResponses();
    responses.push(response);
    localStorage.setItem(this.RESPONSE_KEY, JSON.stringify(responses));
  }

  findById(id: string): TemplateWithId | null {
    const templates = this.getTemplates();
    return templates.find((t) => t.id === id) || null;
  }

  findAll(): TemplateWithId[] {
    return this.getTemplates();
  }

  delete(id: string): void {
    const templates = this.getTemplates();
    const updatedTemplates = templates.filter((t) => t.id !== id);
    localStorage.setItem(this.TEMPLATE_KEY, JSON.stringify(updatedTemplates));
  }

  private getTemplates(): TemplateWithId[] {
    const data = localStorage.getItem(this.TEMPLATE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private getResponses(): SurveyResponse[] {
    const data = localStorage.getItem(this.RESPONSE_KEY);
    return data ? JSON.parse(data) : [];
  }
}
