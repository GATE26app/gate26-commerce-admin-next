import React, { useEffect, useState } from 'react';

import { Flex, Image, Text, useToast } from '@chakra-ui/react';

import { GoodsAttributeListProps } from '@/app/apis/goods/GoodsApi.type';

import InputBox from '@/components/common/Input';

import { ColorBlack, ColorGray50, ColorGray400 } from '@/utils/_Palette';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import SelectBox from '../common/SelectBox/SelectBox';

const tranList = ['도보', '차량', '그외(직접입력)'];
const tripSizeList = ['단독 프라이빗/투어', '그룹 투어'];
const timeList = ['1시간', '2시간', '3시간', '4시간', '5시간', '6시간'];
const languageList = [
  '한국어',
  '영어',
  '스페인어',
  '독일어',
  '프랑스어',
  '중국어',
  '일본어',
  '그외(직접입력)',
];
interface Props {
  list: Array<GoodsAttributeListProps>;
  setList: React.Dispatch<React.SetStateAction<GoodsAttributeListProps[]>>;
}
function DivisionComponent({ list, setList }: Props) {
  const { goodsInfo } = useGoodsStateZuInfo((state) => state);
  const [open, setOpen] = useState(true);

  const [trans, setTrans] = useState('');
  const [inputTrans, setInputTrans] = useState('');
  const [tripSize, seTripSize] = useState('');
  const [time, setTime] = useState('');
  const [language, setLanguage] = useState('');
  const [inputLanguage, setInputLanguage] = useState('');
  // const [list, setList] = useState<GoodsAttributeListProps[]>([]);

  const toast = useToast();

  const handleOnChange = (
    code: number,
    codeName: string,
    type: number,
    value: string,
  ) => {
    // code : 1=>이동수단, 2=>여행규모, 3=>소요시간, 4=>언어
    // type : 1=>일반, 2=>기타(직접입력)
    if (list.some((arr) => arr.code == code) == false) {
      const object: GoodsAttributeListProps = {
        code: code,
        codeName: codeName,
        sort: code,
        type: type,
        title: value,
      };
      setList([...list, object]);
    } else {
      const existingIndex = list.findIndex((item) => item.code === code);
      list[existingIndex].title = value;
    }
  };
  //수정시 기존 데이터 불러오기
  useEffect(() => {
    if (list) {
      // list.forEach((item)=>{
      //   // item.codeName == '이동수단'
      // })
      list.filter((item) => {
        // item.code == 1 && item.type == 1
        // ? setTrans(item.title)
        // : item.code == 1 && item.type == 2
        // ? setTrans('그외(직접입력)')
        // setInputTrans(item.title)
        // : item.code == 2
        // ? seTripSize(item.title)
        // : item.code == 3
        // ? setTime(item.title)
        // : setLanguage(item.title);
        if (item.code == 1) {
          if (item.type == 1) {
            setTrans(item.title);
          } else {
            setTrans('그외(직접입력)');
            setInputTrans(item.title);
          }
        }
        if (item.code == 2) {
          seTripSize(item.title);
        }
        if (item.code == 3) {
          setTime(item.title);
        }
        if (item.code == 4) {
          setLanguage(item.title);
        }
      });
      // setTrans(list.)
    }
  }, [list]);

  return (
    <Flex w={'100%'} flexDirection={'column'} mb={'30px'}>
      <Flex
        bgColor={ColorGray50}
        px={'30px'}
        py={'20px'}
        w={'100%'}
        borderWidth={1}
        borderTopRadius={'12px'}
        borderColor={ColorGray400}
        alignItems={'center'}
        borderBottomRadius={open ? 0 : '12px'}
        justifyContent={'space-between'}
      >
        <Flex>
          <Text fontWeight={800} fontSize={'18px'} color={ColorBlack}>
            구분
          </Text>
        </Flex>
        <Flex>
          {open ? (
            <Image
              src={'/images/Page/icon_regist_up.png'}
              width={'40px'}
              height={'40px'}
              alt="카테고리 삭제"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <Image
              src={'/images/Page/icon_regist_down.png'}
              width={'40px'}
              height={'40px'}
              alt="카테고리 삭제"
              onClick={() => setOpen(!open)}
            />
          )}
        </Flex>
      </Flex>
      {open && (
        <Flex
          px={'30px'}
          py={'20px'}
          w={'100%'}
          borderWidth={1}
          borderTopWidth={0}
          borderColor={ColorGray400}
          flexDirection={'column'}
          borderBottomRadius={'12px'}
        >
          <Flex mb={'20px'} gap={'10px'} flexWrap={'wrap'}>
            <Flex w={'311px'} flexDirection={'column'} gap={'6px'}>
              <Text fontWeight={700} fontSize={'16px'} color={ColorBlack}>
                이동수단
              </Text>
              <SelectBox
                placeholder="이동수단"
                width={'311px'}
                list={tranList}
                select={trans}
                setSelect={setTrans}
                disable={goodsInfo.LogItemDisable}
                onClick={(data: string) =>
                  handleOnChange(
                    1,
                    '이동수단',
                    data !== '그외(직접입력)' ? 1 : 2,
                    data,
                  )
                }
              />
              {/* {trans == '그외(직접입력)' && (
                <InputBox placeholder="이동수단 직접입력" />
              )} */}
              {trans == '그외(직접입력)' && (
                <InputBox
                  placeholder="언어 직접입력"
                  value={inputTrans}
                  onChange={(e) => {
                    setInputTrans(e.target.value);
                    // handleOnChange(4, '언어', 1, e.target.value);
                  }}
                  disabled={goodsInfo.LogItemDisable}
                  onBlur={(e) =>
                    handleOnChange(1, '이동수단', 1, e.target.value)
                  }
                />
              )}
            </Flex>
            <Flex w={'311px'} flexDirection={'column'} gap={'6px'}>
              <Text fontWeight={700} fontSize={'16px'} color={ColorBlack}>
                여행규모
              </Text>

              <SelectBox
                placeholder="여행규모"
                width={'311px'}
                list={tripSizeList}
                select={tripSize}
                setSelect={seTripSize}
                disable={goodsInfo.LogItemDisable}
                onClick={(data: string) =>
                  handleOnChange(2, '여행규모', 1, data)
                }
              />
            </Flex>
            <Flex w={'311px'} flexDirection={'column'} gap={'6px'}>
              <Text fontWeight={700} fontSize={'16px'} color={ColorBlack}>
                소요시간
              </Text>

              <SelectBox
                placeholder="소요시간"
                width={'311px'}
                list={timeList}
                select={time}
                disable={goodsInfo.LogItemDisable}
                setSelect={setTime}
                onClick={(data: string) =>
                  handleOnChange(3, '소요시간', 1, data)
                }
              />
            </Flex>
            <Flex w={'311px'} flexDirection={'column'} gap={'6px'}>
              <Text fontWeight={700} fontSize={'16px'} color={ColorBlack}>
                언어
              </Text>

              <SelectBox
                placeholder="언어"
                width={'311px'}
                list={languageList}
                select={language}
                setSelect={setLanguage}
                disable={goodsInfo.LogItemDisable}
                onClick={(data: string) => {
                  data !== '그외(직접입력)'
                    ? handleOnChange(4, '언어', 1, data)
                    : setInputLanguage('');
                }}
              />
              {language == '그외(직접입력)' && (
                <InputBox
                  placeholder="언어 직접입력"
                  value={inputLanguage}
                  onChange={(e) => {
                    setInputLanguage(e.target.value);
                    // handleOnChange(4, '언어', 1, e.target.value);
                  }}
                  disabled={goodsInfo.LogItemDisable}
                  onBlur={(e) => handleOnChange(4, '언어', 1, e.target.value)}
                />
              )}
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default DivisionComponent;
