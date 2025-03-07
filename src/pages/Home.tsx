import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
    repository.delete(id);
    setTemplates((prevTemplates) => prevTemplates.filter((t) => t.id !== id));
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
        <Button onClick={goToCreateTemplate} className="px-6 py-3 text-lg font-semibold">
          새 템플릿 만들기
        </Button>
      </div>

      {/* 템플릿 목록 */}
      <div className="w-full max-w-4xl px-4">
        {templates.length === 0 ? (
          <Card className="text-center p-6">
            <CardContent>
              <p className="text-gray-500 text-lg">아직 만든 템플릿이 없습니다.</p>
              <p className="text-gray-400 mt-2">위 버튼을 눌러 첫 템플릿을 만들어보세요!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-2">
                    {template.description || '설명이 없습니다.'}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <a
                    href={`/template/${template.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      goToTemplate(template.id);
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    설문 응답하러 가기 →
                  </a>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">삭제</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>템플릿 삭제 확인</DialogTitle>
                        <DialogDescription>
                          {template.name} 템플릿을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="destructive" onClick={() => handleDeleteTemplate(template.id)}>
                          삭제
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
