import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';

import Home from '@/pages/Home';
import { FieldTypeEnum } from '@/types/field';

describe('Home Component', () => {
  beforeEach(() => {
    // TODO:  LocalStorageTemplateRepository 을 사용하여 테스트를 진행해야 하는데 Mocking이 제대로 되지 않아서 LocalStorage에 직접 데이터를 넣어주는 방식으로 테스트를 진행하였습니다.
    localStorage.clear();

    const initialTemplates = [
      {
        id: '1',
        name: 'Test Template',
        description: 'Test Description',
        fields: [
          { id: '1', type: FieldTypeEnum.TEXT, label: 'Question 1', required: true, order: 0 },
          { id: '2', type: FieldTypeEnum.TEXT, label: 'Question 2', required: false, order: 1 },
        ],
      },
      {
        id: '2',
        name: 'Another Template',
        description: 'Another Description',
        fields: [
          { id: '3', type: FieldTypeEnum.TEXT, label: 'Question A', required: true, order: 0 },
          { id: '4', type: FieldTypeEnum.TEXT, label: 'Question B', required: false, order: 1 },
        ],
      },
    ];
    localStorage.setItem('survey_templates', JSON.stringify(initialTemplates));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders template list correctly', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(screen.getByText('Test Template')).toBeInTheDocument();
        expect(screen.getByText('Another Template')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('Another Description')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('템플릿 검색...')).toBeInTheDocument();
        expect(screen.getByText('새 템플릿 만들기')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('filters templates based on search input', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(screen.getByText('Test Template')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const input = screen.getByPlaceholderText('템플릿 검색...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Test' } });

    await waitFor(() => {
      expect(screen.getByText('Test Template')).toBeInTheDocument();
      expect(screen.queryByText('Another Template')).toBeNull();
    });

    fireEvent.change(input, { target: { value: 'Nonexistent' } });
    await waitFor(() => {
      expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument();
    });
  });

  it('shows no templates message when list is empty', async () => {
    localStorage.removeItem('survey_templates');

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(screen.getByText('아직 만든 템플릿이 없습니다.')).toBeInTheDocument();
        expect(screen.getByText('위 버튼을 눌러 첫 템플릿을 만들어보세요!')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('opens delete dialog and deletes template', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(screen.getByText('Test Template')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    const testTemplateCard = screen.getByText('Test Template').closest('.hover\\:shadow-lg') as HTMLElement | null;
    if (!testTemplateCard) throw new Error('Test Template card not found');
    const deleteButton = within(testTemplateCard).getByTestId('delete-button-1');
    fireEvent.click(deleteButton);

    const dialogText = await screen.findByText(
      '" Test Template " 템플릿을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.',
      {},
      { timeout: 2000 }
    );
    expect(dialogText).toBeInTheDocument();

    const confirmDeleteButton = await screen.findByTestId('confirm-delete-button-1', undefined, { timeout: 3000 });
    fireEvent.click(confirmDeleteButton);

    await waitFor(
      () => {
        expect(screen.queryByText('Test Template')).toBeNull();
      },
      { timeout: 2000 }
    );
  });
});
