import { useParams } from 'react-router-dom';

export default function Template() {
  const { id } = useParams<{ id: string }>();
  return <div>Template Page - ID: {id} (Temporary Text)</div>;
}
