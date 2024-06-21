import { Icon, IconProps } from '@chakra-ui/react';

interface CloseIconProps extends IconProps {
  strokeColor?: string;
}
const CloseIcon = ({ strokeColor = '#1A1A1A', ...props }: CloseIconProps) => {
  return (
    <Icon
      maxW={'20px'}
      maxH={'20px'}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.47607 4.47607L18.4761 18.4761"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18.4761 4.47607L4.47607 18.4761"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Icon>
  );
};

export default CloseIcon;
