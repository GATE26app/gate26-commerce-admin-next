import { Icon, IconProps } from '@chakra-ui/react';

const ArrowRightIcon = ({ ...props }: IconProps) => {
  return (
    <Icon
      maxW={'16px'}
      maxH={'16px'}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.0199 4.47803L9.51392 7.89001L6.0199 11.423"
        stroke="#FF5942"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default ArrowRightIcon;
