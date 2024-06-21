export interface CheckBoxProps {
  disabled?: boolean;
  checked?: boolean;
  children?: string | JSX.Element;
  onClick?: () => void;
  width?: string;
  height?: string;
}
