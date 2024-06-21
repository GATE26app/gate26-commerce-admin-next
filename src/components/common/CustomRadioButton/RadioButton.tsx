import { Radio, RadioGroup, Stack } from '@chakra-ui/react';

type radioColor = 'checked' | 'disabled';

interface GroupObj {
  value: any;
  label: string;
}

interface RadioPrsop {
  onClick?: (e: any) => void;
  type?: radioColor;
  radioCount?: number;
  groupItems?: GroupObj[];
  label?: string;
  disabled?: boolean;
  group?: boolean;
  checked?: boolean;
  value?: any;
}

const RadioButton = ({
  onClick,
  label,
  disabled = false,
  group = false,
  checked = false,
  groupItems,
  value,
}: RadioPrsop) => {
  return (
    <>
      {!group ? (
        <Radio
          isDisabled={disabled}
          size="lg"
          isChecked={checked ? checked : disabled ? true : value}
          onClick={onClick}
          _disabled={{ border: '5px solid #b8bccb' }}
          _checked={{ background: '#FF5942' }}
          _before={{
            background: '#ffffff',
            width: '10px',
            height: '10px',
            content: '""',
            borderRadius: '50%',
          }}
        >
          {label}
        </Radio>
      ) : (
        <RadioGroup onChange={onClick} value={value}>
          <Stack direction="row" columnGap={'30.5px'}>
            {groupItems?.map(({ value: item, label }, index) => {
              return (
                <Radio
                  key={index}
                  isChecked={
                    checked ? checked : disabled ? true : item === value
                  }
                  isDisabled={disabled}
                  size="lg"
                  onClick={onClick}
                  _disabled={{ border: '5px solid #b8bccb' }}
                  _checked={{ background: '#FF5942' }}
                  _before={{
                    background: '#ffffff',
                    width: '10px',
                    height: '10px',
                    content: '""',
                    borderRadius: '50%',
                  }}
                  value={item}
                >
                  {label}
                </Radio>
              );
            })}
          </Stack>
        </RadioGroup>
      )}
    </>
  );
};

export default RadioButton;
