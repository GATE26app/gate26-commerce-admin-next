import Image from 'next/image';
import React, { SyntheticEvent } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import {
  ColorBlack,
  ColorBlue,
  ColorGray400,
  ColorGray700,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { DashDate, getImagePath, imgPath, intComma } from '@/utils/format';

import { DataTableHeaderProps } from './GoodsDataTable';
import { GoodsListItemProps } from '@/app/apis/goods/GoodsApi.type';

interface Props {
  header: Array<DataTableHeaderProps>;
  item: GoodsListItemProps;
}
function GoodsItemCard({ header, item }: Props) {
  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/Page/no_data.png';
  };
  return (
    <>
      <Flex w={`15%`} alignItems={'center'} justifyContent={'center'}>
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.partnerTitle}
        </Text>
      </Flex>
      <Flex
        w={`15%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Flex flexDirection={'column'}>
          {item?.locations.length == 0 ? (
            '-'
          ) : (
            <>
              {item?.locations[0].fullTitle !== undefined && (
                <>
                  {item?.locations[0].fullTitle.includes('>') ? (
                    <>
                      <Text
                        fontSize={'14px'}
                        fontWeight={400}
                        color={ColorBlack}
                      >
                        {item?.locations[0].fullTitle.split('>')[0]}
                      </Text>
                      <Text
                        fontSize={'14px'}
                        fontWeight={400}
                        color={ColorBlack}
                      >
                        {'>'}
                        {item?.locations[0].fullTitle.split('>')[1]}
                      </Text>
                    </>
                  ) : (
                    <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
                      {item?.locations[0].fullTitle}
                    </Text>
                  )}
                </>
              )}
            </>
          )}
        </Flex>
        {/* {item.locations[0].fullTitle !== undefined && (
          <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
            {item.locations[0].fullTitle}
          </Text>
        )} */}

        {/* <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.locations[0].fullTitle}
        </Text>
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item.locations[1].fullTitle}
        </Text> */}
      </Flex>
      <Flex
        w={`15%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Flex flexDirection={'column'}>
          {/* {item} */}
          {item?.categories.length == 0 ? (
            '-'
          ) : (
            <>
              {item?.categories[0].fullTitle !== undefined && (
                <>
                  {item?.categories[0].fullTitle.includes('>') ? (
                    <>
                      <Text
                        fontSize={'14px'}
                        fontWeight={400}
                        color={ColorBlack}
                      >
                        {item?.categories[0].fullTitle.split('>')[0]}
                      </Text>
                      <Text
                        fontSize={'14px'}
                        fontWeight={400}
                        color={ColorBlack}
                      >
                        {'>'}
                        {item?.categories[0].fullTitle.split('>')[1]}
                      </Text>
                    </>
                  ) : (
                    <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
                      {item?.categories[0].fullTitle}
                    </Text>
                  )}
                </>
              )}
            </>
          )}
        </Flex>
      </Flex>
      <Flex
        w={`42%`}
        alignItems={'center'}
        justifyContent={'flex-start'}
        gap={'10px'}
      >
        <Box
          w={'80px'}
          minWidth={'80px'}
          h={'80px'}
          borderRadius={'10px'}
          position={'relative'}
          overflow={'hidden'}
          ml={'10px'}
        >
          <img
            loading='lazy'
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'cover',
            }}
            src={
              item?.images.length == 0
                ? '/images/Page/no_data.png'
                : getImagePath(item?.images[0].thumbnailImagePath)
            }
            onError={addDefaultImg}
            alt="이미지 업로드"
          />
        </Box>
        <Flex flexDirection={'column'}>
          <Text
            fontSize={'14px'}
            fontWeight={400}
            color={ColorBlack}
            pr={'10px'}
            overflow="hidden"
            textOverflow={'ellipsis'}
            display="-webkit-box"
            style={{
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {item?.title}
          </Text>
          {item?.priceDcPer !== 0 && (
            <Text
              fontSize={'14px'}
              fontWeight={400}
              color={ColorGray700}
              textDecoration={'line-through'}
            >
              {intComma(item?.priceNet)}원
            </Text>
          )}
          <Flex>
            <Text
              fontSize={'14px'}
              fontWeight={800}
              color={ColorBlack}
              mr={'10px'}
            >
              {intComma(item?.price)}원
            </Text>
            {item?.priceDcPer !== 0 && (
              <Text fontSize={'14px'} fontWeight={400} color={ColorRed}>
                {intComma(item?.priceDcPer)}%할인
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex w={`15%`} alignItems={'center'} justifyContent={'center'}>
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item?.createdDate !== undefined ? DashDate(item?.createdDate) : '-'}
        </Text>
      </Flex>
      <Flex w={`7%`} alignItems={'center'} justifyContent={'center'}>
        <Text
          fontSize={'14px'}
          fontWeight={800}
          color={
            item?.status == 0
              ? ColorGray700
              : item?.status == 1
              ? ColorBlue
              : item?.status == 2
              ? ColorBlack
              : item?.status == 3
              ? ColorRed
              : item?.status == 10
              ? ColorBlack
              : ColorGray700
          }
        >
          {item?.statusName}
        </Text>
      </Flex>
      <Flex
        w={`20%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item?.requestDate !== undefined ? DashDate(item?.requestDate) : '-'}
        </Text>
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item?.approvalDate !== undefined
            ? DashDate(item?.approvalDate)
            : '-'}
          {/* {item.approvalDate !== null ? DashDate(item.approvalDate) : '-'} */}
        </Text>
      </Flex>
      <Flex
        w={`${header[9]?.width}%`}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item?.levelName}
        </Text>
      </Flex>
      <Flex
        w={`20%`}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        <Text
          fontSize={'14px'}
          fontWeight={400}
          color={ColorBlack}
          whiteSpace={'pre-wrap'}
        >
          {item?.viewStartDate !== undefined
            ? DashDate(item?.viewStartDate)
            : '-'}
          ~
        </Text>
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item?.viewEndDate !== undefined ? DashDate(item?.viewEndDate) : '-'}
        </Text>
      </Flex>
      <Flex w={`10%`} alignItems={'center'} justifyContent={'center'}>
        <Text fontSize={'14px'} fontWeight={400} color={ColorBlack}>
          {item?.forSaleName}
        </Text>
      </Flex>
    </>
  );
}

export default GoodsItemCard;
