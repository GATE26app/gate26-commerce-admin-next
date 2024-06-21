import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { Box, Flex, Image, Text, Textarea } from '@chakra-ui/react';

import { GoodsBasicProps } from '@apis/goods/GoodsApi.type';

import { FormDataType } from '@components/CreateGoodsPage/_hooks/useExampleForm';

import {
  ColorBlack,
  ColorGray50,
  ColorGray100,
  ColorGray400,
  ColorGray700,
  ColorRed,
  ColorWhite,
} from '@utils/_Palette';

import { useGoodsStateZuInfo } from '_store/StateZuInfo';

interface Props {
  list: GoodsBasicProps;
  setList: React.Dispatch<React.SetStateAction<GoodsBasicProps>>;
}
function InfoComponent({ list, setList }: Props) {
  const { goodsInfo } = useGoodsStateZuInfo((state) => state);
  const [open, setOpen] = useState(true);
  const [data, setData] = useState('');
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
            기본정보
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
          <Flex flexDirection={'column'}>
            <Textarea
              placeholder="기본정보를 입력해주세요."
              _placeholder={{ color: ColorGray700 }}
              color={ColorBlack}
              borderColor={ColorGray400}
              // onChange={(e) => setData(e.target.value)}
              maxLength={500}
              height={150}
              disabled={goodsInfo.LogItemDisable}
              value={list.basicInfo}
              onChange={(e) => setList({ ...list, basicInfo: e.target.value })}
              // {...register('basicInfo')}
            />
            <Flex justifyContent={'flex-end'} mt={'5px'}>
              <Text color={ColorGray700} fontWeight={400} fontSize={'15px'}>
                ({list?.basicInfo.length}/500)
              </Text>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default InfoComponent;
