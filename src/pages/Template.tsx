import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SurveyForm from '@/components/survey/SurveyForm';
import { LocalStorageTemplateRepository } from '@/repositories/LocalStorageTemplateRepository';
import { SurveyResponse, TemplateFormValues } from '@/types/schema';

const Survey = () => {
  const { id } = useParams<{ id: string }>();
  const [template, setTemplate] = useState<TemplateFormValues | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const repository = new LocalStorageTemplateRepository();
      const foundTemplate = repository.findById(id);
      setTemplate(foundTemplate || null);
    }
  }, [id]);

  const handleSubmit = (response: SurveyResponse) => {
    // TODO: localStorage에 응답 저장 또는 서버로 전송
    console.warn('SurveyResponse saved:', response);
    // TODO : 응답 저장 toast 띄우기
    navigate('/');
  };

  if (!template) return <div>템플릿을 로드 중입니다...</div>;

  return (
    <div className="survey-page">
      <h1>설문 응답</h1>
      <SurveyForm template={template} onSubmit={handleSubmit} />
    </div>
  );
};

export default Survey;
