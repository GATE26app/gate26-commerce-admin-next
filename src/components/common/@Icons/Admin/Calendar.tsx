import { Icon, IconProps } from '@chakra-ui/react';

interface CalendarIconProps extends IconProps {
  strokeColor?: string;
}
const CalendarIcon = ({
  strokeColor = '#1A1A1A',
  ...props
}: CalendarIconProps) => {
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
        d="M17.9999 4.6499H5.9999C4.70203 4.6499 3.6499 5.70203 3.6499 6.9999V18.9999C3.6499 20.2978 4.70203 21.3499 5.9999 21.3499H17.9999C19.2978 21.3499 20.3499 20.2978 20.3499 18.9999V6.9999C20.3499 5.70203 19.2978 4.6499 17.9999 4.6499Z"
        stroke={strokeColor}
        strokeWidth="1.3"
      />
      <path d="M9 13H7V15H9V13Z" fill={strokeColor} />
      <path d="M8.5 13.5H7.5V14.5H8.5V13.5Z" stroke={strokeColor} />
      <path d="M9 17H7V19H9V17Z" fill={strokeColor} />
      <path d="M8.5 17.5H7.5V18.5H8.5V17.5Z" stroke={strokeColor} />
      <path d="M17 9H15V11H17V9Z" fill={strokeColor} />
      <path d="M16.5 9.5H15.5V10.5H16.5V9.5Z" stroke={strokeColor} />
      <path d="M17 13H15V15H17V13Z" fill={strokeColor} />
      <path d="M16.5 13.5H15.5V14.5H16.5V13.5Z" stroke={strokeColor} />
      <path d="M13 9H11V11H13V9Z" fill={strokeColor} />
      <path d="M12.5 9.5H11.5V10.5H12.5V9.5Z" stroke={strokeColor} />
      <path d="M13 13H11V15H13V13Z" fill={strokeColor} />
      <path d="M12.5 13.5H11.5V14.5H12.5V13.5Z" stroke={strokeColor} />
      <path d="M13 17H11V19H13V17Z" fill={strokeColor} />
      <path d="M12.5 17.5H11.5V18.5H12.5V17.5Z" stroke={strokeColor} />
      <path d="M17 17H15V19H17V17Z" fill={strokeColor} />
      <path d="M16.5 17.5H15.5V18.5H16.5V17.5Z" stroke={strokeColor} />
      <path
        d="M6.25977 2.79785V6.29785"
        stroke={strokeColor}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M17.7402 2.79785V6.29785"
        stroke={strokeColor}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </Icon>
  );
};

export default CalendarIcon;
