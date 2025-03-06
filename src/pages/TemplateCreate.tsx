import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import TemplateForm from '@/components/TemplateForm';
import { LocalStorageTemplateRepository } from '@/repositories/LocalStorageTemplateRepository';
import { TemplateFormValues } from '@/types/schema';

const TemplateCreate = () => {
  const navigate = useNavigate();
  const repository = new LocalStorageTemplateRepository();

  const handleSubmit = (data: TemplateFormValues) => {
    if (!data.id) {
      data.id = uuidv4(); // ID가 없으면 생성
    }
    repository.save(data);
    // TODO: 템플릿 id로 url 만들고 복사하기 모달 띄우기
    navigate('/');
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
