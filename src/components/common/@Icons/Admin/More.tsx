import { Icon, IconProps } from '@chakra-ui/react';

interface MoreIconProps extends IconProps {
  strokeColor?: string;
}
const MoreIcon = ({ strokeColor = '#1A1A1A', ...props }: MoreIconProps) => {
  return (
    <Icon
      w={'24px'}
      h={'24px'}
      maxW={'24px'}
      maxH={'24px'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 12.5C7 11.6716 6.32843 11 5.5 11C4.67157 11 4 11.6716 4 12.5C4 13.3284 4.67157 14 5.5 14C6.32843 14 7 13.3284 7 12.5Z"
        fill={strokeColor}
      />
      <path
        d="M14 12.5C14 11.6716 13.3284 11 12.5 11C11.6716 11 11 11.6716 11 12.5C11 13.3284 11.6716 14 12.5 14C13.3284 14 14 13.3284 14 12.5Z"
        fill={strokeColor}
      />
      <path
        d="M21 12.5C21 11.6716 20.3284 11 19.5 11C18.6716 11 18 11.6716 18 12.5C18 13.3284 18.6716 14 19.5 14C20.3284 14 21 13.3284 21 12.5Z"
        fill={strokeColor}
      />
    </Icon>
  );
};

export default MoreIcon;
