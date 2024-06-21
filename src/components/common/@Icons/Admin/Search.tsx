import { Icon, IconProps } from '@chakra-ui/react';

interface SearchIconProps extends IconProps {
  strokeColor?: string;
}
const SearchIcon = ({ strokeColor = '#1A1A1A', ...props }: SearchIconProps) => {
  return (
    <Icon
      maxW={'24px'}
      maxH={'24px'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.875 18.75C15.2242 18.75 18.75 15.2242 18.75 10.875C18.75 6.52576 15.2242 3 10.875 3C6.52576 3 3 6.52576 3 10.875C3 15.2242 6.52576 18.75 10.875 18.75Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4438 16.4434L21.0001 20.9996"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default SearchIcon;
