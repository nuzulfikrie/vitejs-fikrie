import { useNavigate } from 'react-router-dom';

export function myNavigator() {
  let navigate = useNavigate();
  const goTo = (path: any) => navigate(path);
  return { goTo };
}
