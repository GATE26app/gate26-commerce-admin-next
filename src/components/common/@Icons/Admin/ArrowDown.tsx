import { Icon, IconProps } from '@chakra-ui/react';

const ArrowDownIcon = ({ color, ...props }: IconProps) => {
  return (
    <Icon
      maxW={'8px'}
      maxH={'5px'}
      viewBox="0 0 8 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      {...props}
    >
      <path d="M4 5L0 0H8L4 5Z" fill={'currentColor'} />
    </Icon>
  );
};

export default ArrowDownIcon;
