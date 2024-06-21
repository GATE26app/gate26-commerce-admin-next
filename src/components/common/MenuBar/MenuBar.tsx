'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { ColorGrayMenu, ColorRed, ColorWhite } from '@/utils/_Palette';

function MenuBar() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(1);
  const [orderMenu, setOrdreMenu] = useState(1);

  useEffect(() => {
    if (pathname == '/goodsSetting' || pathname == '/updateGoods') {
      setMenu(2);
      setOrdreMenu(1);
    } else if (
      pathname == '/entries/first' ||
      pathname == '/entries/first/detail' ||
      pathname == '/entries/first/create'
    ) {
      setMenu(5);
      setOrdreMenu(1);
    } else if (
      pathname == '/entries/auction' ||
      pathname == '/entries/auction/detail'
    ) {
      setMenu(5);
      setOrdreMenu(2);
    } else if (
      pathname == '/entries/winnerInquiry' ||
      pathname == '/entries/winnerInquiry/detail'
    ) {
      setMenu(5);
      setOrdreMenu(3);
    }
  }, [pathname]);

  return (
    <Box
      w={'340px'}
      h={'100%'}
      bgColor={ColorWhite}
      pl={'30px'}
      pt={'35px'}
      position={'sticky'}
      top={0}
      height={'100%'}
    >
      <Flex flexDirection={'row'} alignItems={'center'} mb={'57px'}>
        <Image
          src={'/images/header/icon_logo_big.png'}
          width={185}
          height={41}
          alt="로고"
          priority={true}
        />
        <Box
          bgColor={'rgba(255,223,219,0.38)'}
          borderRadius={'11px'}
          px={'6px'}
          py={'2px'}
          ml={'15px'}
        >
          <Text fontSize={'13px'} fontWeight={600} color={ColorRed}>
            관리자
          </Text>
        </Box>
      </Flex>
      {/* <Flex
        alignItems={'center'}
        cursor={'pointer'}
        mb={'30px'}
        onClick={() => {
          setMenu(1);
          setOrdreMenu(1);
        }}
      >
        {menu == 1 ? (
          <Image
            src={'/images/menu/leftmenu01_on.png'}
            width={40}
            height={40}
            alt="로고"
          />
        ) : (
          <Image
            src={'/images/menu/leftmenu01_off.png'}
            width={40}
            height={40}
            alt="로고"
          />
        )}

        <Text
          color={menu == 1 ? ColorRed : ColorGrayMenu}
          fontWeight={800}
          fontSize={'18px'}
          ml={'15px'}
        >
          파트너사 승인/관리
        </Text>
      </Flex> */}
      <Link href={'/goodsSetting'}>
        <Flex
          alignItems={'center'}
          cursor={'pointer'}
          mb={'30px'}
          onClick={() => {
            setMenu(2);
            setOrdreMenu(1);
          }}
        >
          {menu == 2 ? (
            <Image
              src={'/images/menu/leftmenu02_on.png'}
              width={40}
              height={40}
              alt="로고"
            />
          ) : (
            <Image
              src={'/images/menu/leftmenu02_off.png'}
              width={40}
              height={40}
              alt="로고"
            />
          )}

          <Text
            color={menu == 2 ? ColorRed : ColorGrayMenu}
            fontWeight={800}
            fontSize={'18px'}
            ml={'15px'}
          >
            상품 승인/관리
          </Text>
        </Flex>
      </Link>

      {/* <Flex
        alignItems={'center'}
        cursor={'pointer'}
        justifyContent={'space-between'}
        justifyItems={'center'}
        mr={'30px'}
        mb={menu == 3 ? '15px' : '30px'}
        onClick={() => {
          setMenu(3);
          setOrdreMenu(1);
        }}
      >
        <Flex alignItems={'center'}>
          {menu == 3 ? (
            <Image
              src={'/images/menu/leftmenu03_on.png'}
              width={40}
              height={40}
              alt="로고"
            />
          ) : (
            <Image
              src={'/images/menu/leftmenu03_off.png'}
              width={40}
              height={40}
              alt="로고"
            />
          )}
          <Text
            color={menu == 3 ? ColorRed : ColorGrayMenu}
            fontWeight={800}
            fontSize={'18px'}
            ml={'15px'}
          >
            주문관리
          </Text>
        </Flex>
        {menu == 3 ? (
          <Image
            src={'/images/menu/icon_menu_up.png'}
            width={16}
            height={16}
            alt="로고"
          />
        ) : (
          <Image
            src={'/images/menu/icon_menu_down.png'}
            width={16}
            height={16}
            alt="로고"
          />
        )}
      </Flex> */}
      {/* {menu == 3 && (
        <Flex mb={'30px'} ml={'57px'} flexDirection={'column'}>
          <Link href={'/orderlist'}>
            <Text
              fontWeight={700}
              fontSize={'16px'}
              mb={'15px'}
              color={orderMenu == 1 ? ColorRed : ColorGrayMenu}
              cursor={'pointer'}
              onClick={() => {
                setOrdreMenu(1);
              }}
            >
              주문관리
            </Text>
          </Link>
          <Link href={'/cancellist'}>
            <Text
              fontWeight={700}
              fontSize={'16px'}
              mb={'15px'}
              color={orderMenu == 2 ? ColorRed : ColorGrayMenu}
              cursor={'pointer'}
              onClick={() => setOrdreMenu(2)}
            >
              취소관리
            </Text>
          </Link>
          <Link href={'/cancellist'}>
            <Text
              fontWeight={700}
              fontSize={'16px'}
              mb={'15px'}
              color={orderMenu == 3 ? ColorRed : ColorGrayMenu}
              cursor={'pointer'}
              onClick={() => setOrdreMenu(3)}
            >
              마일충전내역
            </Text>
          </Link>
        </Flex>
      )} */}
      {/* <Flex
        alignItems={'center'}
        cursor={'pointer'}
        justifyContent={'space-between'}
        justifyItems={'center'}
        mr={'30px'}
        mb={menu == 4 ? '15px' : '30px'}
        onClick={() => {
          setMenu(4);
          setOrdreMenu(1);
        }}
      >
        <Flex alignItems={'center'}>
          {menu == 4 ? (
            <Image
              src={'/images/menu/leftmenu04_on.png'}
              width={40}
              height={40}
              alt="로고"
            />
          ) : (
            <Image
              src={'/images/menu/leftmenu04_off.png'}
              width={40}
              height={40}
              alt="로고"
            />
          )}
          <Text
            color={menu == 4 ? ColorRed : ColorGrayMenu}
            fontWeight={800}
            fontSize={'18px'}
            ml={'15px'}
          >
            쿠폰관리
          </Text>
        </Flex>
        {menu == 4 ? (
          <Image
            src={'/images/menu/icon_menu_up.png'}
            width={16}
            height={16}
            alt="로고"
          />
        ) : (
          <Image
            src={'/images/menu/icon_menu_down.png'}
            width={16}
            height={16}
            alt="로고"
          />
        )}
      </Flex> */}
      {/* {menu == 4 && (
        <Flex mb={'30px'} ml={'57px'} flexDirection={'column'}>
          <Link href={'/orderlist'}>
            <Text
              fontWeight={700}
              fontSize={'16px'}
              mb={'15px'}
              color={orderMenu == 1 ? ColorRed : ColorGrayMenu}
              cursor={'pointer'}
              onClick={() => {
                setOrdreMenu(1);
              }}
            >
              GATE26 쿠폰관리
            </Text>
          </Link>
          <Link href={'/cancellist'}>
            <Text
              fontWeight={700}
              fontSize={'16px'}
              mb={'15px'}
              color={orderMenu == 2 ? ColorRed : ColorGrayMenu}
              cursor={'pointer'}
              onClick={() => setOrdreMenu(2)}
            >
              파트너사 쿠폰관리
            </Text>
          </Link>
          <Link href={'/cancellist'}>
            <Text
              fontWeight={700}
              fontSize={'16px'}
              mb={'15px'}
              color={orderMenu == 3 ? ColorRed : ColorGrayMenu}
              cursor={'pointer'}
              onClick={() => setOrdreMenu(3)}
            >
              상품 쿠폰관리
            </Text>
          </Link>
        </Flex>
      )} */}
      <Flex
        alignItems={'center'}
        cursor={'pointer'}
        justifyContent={'space-between'}
        justifyItems={'center'}
        mr={'30px'}
        mb={menu == 5 ? '15px' : '30px'}
        onClick={() => {
          setMenu(5);
          setOrdreMenu(1);
        }}
      >
        <Flex alignItems={'center'}>
          {menu == 5 ? (
            <Image
              src={'/images/menu/leftmenu05_on.png'}
              width={40}
              height={40}
              alt="로고"
            />
          ) : (
            <Image
              src={'/images/menu/leftmenu05_off.png'}
              width={40}
              height={40}
              alt="로고"
            />
          )}
          <Text
            color={menu == 5 ? ColorRed : ColorGrayMenu}
            fontWeight={800}
            fontSize={'18px'}
            ml={'15px'}
          >
            상품응모
          </Text>
        </Flex>
        {menu == 5 ? (
          <Image
            src={'/images/menu/icon_menu_up.png'}
            width={16}
            height={16}
            alt="로고"
          />
        ) : (
          <Image
            src={'/images/menu/icon_menu_down.png'}
            width={16}
            height={16}
            alt="로고"
          />
        )}
      </Flex>
      {menu == 5 && (
        <Flex mb={'30px'} ml={'57px'} flexDirection={'column'}>
          <Link href={'/entries/first'}>
            <Text
              fontWeight={700}
              fontSize={'16px'}
              mb={'15px'}
              color={orderMenu == 1 ? ColorRed : ColorGrayMenu}
              cursor={'pointer'}
              onClick={() => {
                setOrdreMenu(1);
              }}
            >
              선착순상품응모
            </Text>
          </Link>
          <Link href={'/entries/auction'}>
            <Text
              fontWeight={700}
              fontSize={'16px'}
              mb={'15px'}
              color={orderMenu == 2 ? ColorRed : ColorGrayMenu}
              cursor={'pointer'}
              onClick={() => setOrdreMenu(2)}
            >
              경매상품응모
            </Text>
          </Link>
          <Link href={'/entries/winnerInquiry'}>
            <Text
              fontWeight={700}
              fontSize={'16px'}
              mb={'15px'}
              color={orderMenu == 3 ? ColorRed : ColorGrayMenu}
              cursor={'pointer'}
              onClick={() => setOrdreMenu(3)}
            >
              당첨자조회
            </Text>
          </Link>
        </Flex>
      )}
      {/* <Flex
        alignItems={'center'}
        cursor={'pointer'}
        justifyContent={'space-between'}
        justifyItems={'center'}
        mr={'30px'}
        mb={menu == 6 ? '15px' : '30px'}
        onClick={() => {
          setMenu(6);
          setOrdreMenu(1);
        }}
      >
        <Flex alignItems={'center'}>
          {menu == 6 ? (
            <Image
              src={'/images/menu/leftmenu06_on.png'}
              width={40}
              height={40}
              alt="로고"
            />
          ) : (
            <Image
              src={'/images/menu/leftmenu06_off.png'}
              width={40}
              height={40}
              alt="로고"
            />
          )}
          <Text
            color={menu == 6 ? ColorRed : ColorGrayMenu}
            fontWeight={800}
            fontSize={'18px'}
            ml={'15px'}
          >
            주문관리
          </Text>
        </Flex>
        {menu == 6 ? (
          <Image
            src={'/images/menu/icon_menu_up.png'}
            width={16}
            height={16}
            alt="로고"
          />
        ) : (
          <Image
            src={'/images/menu/icon_menu_down.png'}
            width={16}
            height={16}
            alt="로고"
          />
        )}
      </Flex>
      {menu == 6 && (
        <Flex mb={'30px'} ml={'57px'} flexDirection={'column'}>
          <Link href={'/orderlist'}>
            <Text
              fontWeight={700}
              fontSize={'16px'}
              mb={'15px'}
              color={orderMenu == 1 ? ColorRed : ColorGrayMenu}
              cursor={'pointer'}
              onClick={() => {
                setOrdreMenu(1);
              }}
            >
              정산내역
            </Text>
          </Link>
          <Link href={'/cancellist'}>
            <Text
              fontWeight={700}
              fontSize={'16px'}
              mb={'15px'}
              color={orderMenu == 2 ? ColorRed : ColorGrayMenu}
              cursor={'pointer'}
              onClick={() => setOrdreMenu(2)}
            >
              세금계산서
            </Text>
          </Link>
        </Flex>
      )} */}
      {/* <Flex
        alignItems={'center'}
        cursor={'pointer'}
        mb={'30px'}
        onClick={() => {
          setMenu(7);
          setOrdreMenu(1);
        }}
      >
        {menu == 7 ? (
          <Image
            src={'/images/menu/leftmenu07_on.png'}
            width={40}
            height={40}
            alt="로고"
          />
        ) : (
          <Image
            src={'/images/menu/leftmenu07_off.png'}
            width={40}
            height={40}
            alt="로고"
          />
        )}

        <Text
          color={menu == 7 ? ColorRed : ColorGrayMenu}
          fontWeight={800}
          fontSize={'18px'}
          ml={'15px'}
        >
          배너관리
        </Text>
      </Flex> */}
      {/* <Flex
        alignItems={'center'}
        cursor={'pointer'}
        mb={'30px'}
        onClick={() => {
          setMenu(8);
          setOrdreMenu(1);
        }}
      >
        {menu == 8 ? (
          <Image
            src={'/images/menu/leftmenu08_on.png'}
            width={40}
            height={40}
            alt="로고"
          />
        ) : (
          <Image
            src={'/images/menu/leftmenu08_off.png'}
            width={40}
            height={40}
            alt="로고"
          />
        )}

        <Text
          color={menu == 8 ? ColorRed : ColorGrayMenu}
          fontWeight={800}
          fontSize={'18px'}
          ml={'15px'}
        >
          신고관리
        </Text>
      </Flex> */}
      {/* <Flex
        alignItems={'center'}
        cursor={'pointer'}
        mb={'30px'}
        onClick={() => {
          setMenu(9);
          setOrdreMenu(1);
        }}
      >
        {menu == 9 ? (
          <Image
            src={'/images/menu/leftmenu01_on.png'}
            width={40}
            height={40}
            alt="로고"
          />
        ) : (
          <Image
            src={'/images/menu/leftmenu01_off.png'}
            width={40}
            height={40}
            alt="로고"
          />
        )}

        <Text
          color={menu == 9 ? ColorRed : ColorGrayMenu}
          fontWeight={800}
          fontSize={'18px'}
          ml={'15px'}
        >
          리뷰관리
        </Text>
      </Flex> */}
      {/* <Flex
        alignItems={'center'}
        cursor={'pointer'}
        mb={'30px'}
        onClick={() => {
          setMenu(10);
          setOrdreMenu(1);
        }}
      >
        {menu == 10 ? (
          <Image
            src={'/images/menu/leftmenu10_on.png'}
            width={40}
            height={40}
            alt="로고"
          />
        ) : (
          <Image
            src={'/images/menu/leftmenu10_off.png'}
            width={40}
            height={40}
            alt="로고"
          />
        )}

        <Text
          color={menu == 10 ? ColorRed : ColorGrayMenu}
          fontWeight={800}
          fontSize={'18px'}
          ml={'15px'}
        >
          채팅
        </Text>
      </Flex> */}
    </Box>
  );
}

export default MenuBar;
