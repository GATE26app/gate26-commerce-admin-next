import { Icon, IconProps } from '@chakra-ui/react';

interface DownloadIconProps extends IconProps {
  strokeColor?: string;
  size: 'md' | 'sm' | 'xs';
}
const DownloadIcon = ({
  strokeColor = '#1A1A1A',
  size = 'md',
  ...props
}: DownloadIconProps) => {
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
        xmlns="http://www.w3.org/2000/svg"
        d="M8.0625 10.3125L12 14.25L15.9375 10.3125"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M12 3.75V14.25"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M20.25 14.25V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V14.25"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default DownloadIcon;
