import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/Button';
import { LocalStorageTemplateRepository } from '@/repositories/LocalStorageTemplateRepository';
import { TemplateWithId } from '@/repositories/TemplateRepository';

export default function Home() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<TemplateWithId[]>([]);
  const repository = new LocalStorageTemplateRepository();

  // 템플릿 목록 가져오기
  useEffect(() => {
    const fetchedTemplates = repository.findAll();
    setTemplates(fetchedTemplates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToCreateTemplate = () => {
    navigate('/template/create');
  };

  const goToTemplate = (id: string) => {
    navigate(`/template/${id}`);
  };

  const handleDeleteTemplate = (id: string) => {
    if (window.confirm('정말로 이 템플릿을 삭제하시겠습니까?')) {
      repository.delete(id); // 템플릿 삭제
      setTemplates((prevTemplates) => prevTemplates.filter((t) => t.id !== id)); // 상태 업데이트
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* 헤더 섹션 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">📋 설문 템플릿 목록</h1>
        <p className="text-gray-600">만든 설문 템플릿을 확인하거나 새로 만들어보세요!</p>
      </div>

      {/* 템플릿 생성 버튼 */}
      <div className="mb-6">
        <Button
          onClick={goToCreateTemplate}
          primary
          className="px-6 py-3 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          새 템플릿 만들기
        </Button>
      </div>

      {/* 템플릿 목록 */}
      <div className="w-full max-w-4xl px-4">
        {templates.length === 0 ? (
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">아직 만든 템플릿이 없습니다.</p>
            <p className="text-gray-400 mt-2">위 버튼을 눌러 첫 템플릿을 만들어보세요!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200"
              >
                <a
                  href={`/template/${template.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goToTemplate(template.id);
                  }}
                  className="block text-decoration-none"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{template.name}</h2>
                  <p className="text-gray-600 line-clamp-2">{template.description || '설명이 없습니다.'}</p>
                  <div className="mt-4 text-blue-500 hover:underline">설문 응답하러 가기 →</div>
                </a>
                <Button
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="mt-4 bg-red-500 text-white hover:bg-red-600 rounded-md"
                >
                  삭제
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
