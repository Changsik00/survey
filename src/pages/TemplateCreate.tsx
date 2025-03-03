import TemplateForm from '@/components/TemplateForm';
import { TemplateFormValues } from '@/types/schema';

const TemplateCreate = () => {
  const handleSubmit = (data: TemplateFormValues) => {
    // 유효한 데이터만 여기로 전달됨
    console.warn('Validated data received:', data);
    // 비즈니스 로직: localStorage 저장, API 호출 등
  };

  return (
    <div className="template-create-page">
      <h1>새 템플릿 만들기</h1>
      <div className="template-editor-container">
        <TemplateForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default TemplateCreate;
