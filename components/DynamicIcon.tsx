import { icons } from 'lucide-react';

const DynamicIcon = ({ name, size = 24 }: { name: string; size?: number }) => {
  const IconComponent = icons[name as keyof typeof icons];
  if (!IconComponent) return null;
  return <IconComponent size={size} />;
};

export default DynamicIcon;