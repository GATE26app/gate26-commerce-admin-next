import { Icon, IconProps } from '@chakra-ui/react';

export const CheckedOnIcon = ({ ...props }: IconProps) => {
  return (
    <Icon viewBox="0 0 20 20" fill="none" {...props}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 0H4C1.79086 0 0 1.79086 0 4V16C0 18.2091 1.79086 20 4 20H16C18.2091 20 20 18.2091 20 16V4C20 1.79086 18.2091 0 16 0Z"
          fill="#FF5942"
        />
        <path
          d="M4.38965 9.75232L8.73065 13.9652L14.9986 6.61621"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  );
};
