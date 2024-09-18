import { usePathname } from 'next/navigation';

const isPdfRoute = () => {
  const pathName = usePathname();
  return pathName.endsWith('/pdf');
};

export { isPdfRoute };
