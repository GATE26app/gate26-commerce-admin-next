import React, { useEffect, useState } from 'react';
import { Box, Flex, Img, Text, Image } from '@chakra-ui/react';
import Icon from '@sendbird/uikit-react/ui/Icon';
import {
  ColorBackGray,
  ColorGray3,
  ColorInputBack,
  ColorLineGray,
  ColorTextBlack,
  ColorTextGray,
} from '@/utils/_Palette';
import { SendbirdUserMembers } from '@/app/apis/sendbird/SendBirdApi.type';
import { useGetSendbirdMembers } from '@/app/apis/sendbird/SendBirdApi.mutation';
import { imgUserPath } from '@/utils/format';

export default function MessageHeader({
  onMenu,
  channelUrl,
}: {
  onMenu: any;
  channelUrl: string;
}) {
const [count, setCount] = useState<number>(0);
  const [list, setList] = useState<Array<SendbirdUserMembers>>([]);

  //최고관리자 메세지 전송
  const { mutate: getSendbirdUser } = useGetSendbirdMembers({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          console.log('res::', res);
          setCount(res.count);
          setList(res.data.members);
        }
      },
      onError: (req) => {},
    },
  });

  useEffect(() => {
    getSendbirdUser({
      channelUrl: channelUrl,
      next: 0,
      limit: 100,
    });
  }, [channelUrl]);

  return (
    <Flex
      position={'absolute'}
      right={0}
      height={'100%'}
      width={'230px'}
      bg={'white'}
      borderLeftWidth={1}
      flexDirection={'column'}
    >
      <Flex
        px={'16px'}
        height={'64px'}
        minH={'64px'}
        w={'100%'}
        alignItems={'center'}
        borderWidth={1}
      >
        <Flex
          position="absolute"
          right={'20px'}
          cursor="pointer"
          w="24px"
          h="24px"
          // onClick={openModal}
          onClick={() => onMenu(false)}
        >
          <Icon fillColor="DEFAULT" height={26} type="INFO" width={26} />
        </Flex>
      </Flex>
      <Flex
        flexDirection={'row'}
        p={'15px'}
        justifyContent={'space-between'}
        borderBottomWidth={1}
      >
        <Flex gap={'10px'}>
          <Icon
            fillColor="PRIMARY"
            height={22}
            onClick={function Ms() {}}
            type="MEMBERS"
            width={22}
          />
          <Text fontSize={'14px'} fontWeight={500}>
            멤버
          </Text>
        </Flex>
        <Flex
          w={'22px'}
          h={'22px'}
          alignItems={'center'}
          justifyContent={'center'}
          bg={ColorGray3}
          borderRadius={'50%'}
        >
          <Text color={ColorTextBlack} fontSize={'12px'} fontWeight={400}>
            {count}
          </Text>
        </Flex>
      </Flex>
      <Flex flexDirection={'column'} overflowY={'auto'} pb={'15px'} h={'100%'}>
        {list &&
        list.length > 0 &&
        list.map((item: SendbirdUserMembers, index: number) => {
          return (
            <>
              <Flex
                px={'15px'}
                pt={'15px'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Flex gap={'10px'} alignItems={'center'}>
                  <Image
                    src={item.profile_url?.includes('http') ? item.profile_url : `${imgUserPath()}${item.profile_url}`}
                    width={'20px'}
                    height={'20px'}
                    borderRadius={'80px'}
                    alt="프로필"
                  />
                  <Text fontSize={'14px'}>{item.nickname}</Text>
                </Flex>
              </Flex>
            </>
          );
        })}
      </Flex>
    </Flex>
  );
}
