import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/Button';

export default function Home() {
  const navigate = useNavigate();

  const goToCreateTemplate = () => {
    navigate('/template/create');
  };
  return (
    <>
      <div className="text-3xl font-bold underline">Home Page - Template List(Temporary Text)</div>
      <Button onClick={goToCreateTemplate} primary>
        Go Template Create
      </Button>
    </>
  );
}
