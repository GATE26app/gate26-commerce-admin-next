import { Icon, IconProps } from '@chakra-ui/react';

interface DeleteIconProps extends IconProps {
  strokeColor?: string;
}
const DeleteIcon = ({ strokeColor = '#B8BCC8', ...props }: DeleteIconProps) => {
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
        d="M10 0C11.9778 0 13.9112 0.58649 15.5557 1.6853C17.2002 2.78412 18.4819 4.3459 19.2388 6.17317C19.9957 8.00043 20.1937 10.0111 19.8079 11.9509C19.422 13.8907 18.4696 15.6725 17.0711 17.0711C15.6725 18.4696 13.8907 19.422 11.9509 19.8079C10.0111 20.1937 8.00043 19.9957 6.17317 19.2388C4.3459 18.4819 2.78412 17.2002 1.6853 15.5557C0.58649 13.9112 0 11.9778 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0V0Z"
        fill={strokeColor}
      />
      <path
        d="M13.0322 6.66797L6.66827 13.0319"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13.0322 13.0317L6.66827 6.66778"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Icon>
  );
};

export default DeleteIcon;
