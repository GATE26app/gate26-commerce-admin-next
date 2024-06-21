import { Icon, IconProps } from '@chakra-ui/react';

interface PlusIconProps extends IconProps {
  strokeColor?: string;
  size: 'md' | 'sm' | 'xs';
}
const PlusIcon = ({
  strokeColor = '#1A1A1A',
  size = 'md',
  ...props
}: PlusIconProps) => {
  return (
    <Icon
      w={size === 'md' ? '24px' : '18px'}
      h={size === 'md' ? '24px' : '18px'}
      maxW={'24px'}
      maxH={'24px'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.75 12H20.25"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3.75V20.25"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default PlusIcon;
