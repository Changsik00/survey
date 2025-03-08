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
import { Input } from '@/components/ui/input';
import { LocalStorageTemplateRepository } from '@/repositories/LocalStorageTemplateRepository';
import { TemplateWithId } from '@/repositories/TemplateRepository';

export default function Home() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<TemplateWithId[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<TemplateWithId[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const repository = new LocalStorageTemplateRepository();

  useEffect(() => {
    // 템플릿 목록 가져오기
    const fetchedTemplates = repository.findAll() || [];
    setTemplates(fetchedTemplates);
    setFilteredTemplates(fetchedTemplates); // 초기 목록 설정
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
    setFilteredTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterTemplates(query);
  };

  const filterTemplates = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = templates.filter(
      (template) =>
        template.name.toLowerCase().includes(lowerCaseQuery) ||
        (template.description || '').toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredTemplates(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* 헤더 섹션 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">📋 설문 템플릿 목록</h1>
        <p className="text-gray-600">만든 설문 템플릿을 확인하거나 새로 만들어보세요!</p>
      </div>

      {/* 새로 만들기 버튼 섹션 (CTA) */}
      <div className="mb-10">
        <Button onClick={goToCreateTemplate} className="px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700">
          새 템플릿 만들기
        </Button>
      </div>

      {/* 검색 및 목록 섹션 */}
      <div className="w-full max-w-4xl px-4 mt-5">
        {/* 검색 바 */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="템플릿 검색..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full max-w-md"
          />
        </div>

        {/* 템플릿 목록 */}
        {filteredTemplates.length === 0 ? (
          <Card className="text-center p-6">
            <CardContent>
              <p className="text-gray-500 text-lg">
                {searchQuery ? '검색 결과가 없습니다.' : '아직 만든 템플릿이 없습니다.'}
              </p>
              <p className="text-gray-400 mt-2">
                {searchQuery
                  ? '다른 키워드로 검색하거나 새 템플릿을 만들어보세요!'
                  : '위 버튼을 눌러 첫 템플릿을 만들어보세요!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
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
                      <Button variant="destructive" data-testid={`delete-button-${template.id}`}>
                        삭제
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>템플릿 삭제 확인</DialogTitle>
                        <DialogDescription>
                          {`" ${template.name} " 템플릿을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.`}
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="destructive"
                          data-testid={`confirm-delete-button-${template.id}`}
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
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
