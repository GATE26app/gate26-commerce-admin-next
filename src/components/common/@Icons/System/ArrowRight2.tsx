import { Icon, IconProps } from '@chakra-ui/react';

const ArrowRight2Icon = ({ ...props }: IconProps) => {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M9.64099 16.7046L14.382 12.0146L9.64099 7.67383"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default ArrowRight2Icon;
