import React, { useEffect, useRef, useState } from 'react';
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
import { useGetChatMemberListQuery } from '@/app/apis/sendbird/SendBirdApi.query';
import useIntersectionObserver from '@/app/apis/useIntersectionObserver';

export default function MessageHeader({
  onMenu,
  channelUrl,
}: {
  onMenu: any;
  channelUrl: string;
}) {
  const [count, setCount] = useState<number>(0);
  const [list, setList] = useState<Array<SendbirdUserMembers>>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true); // 첫 로드 여부
  const [backUpStart, setBackUpStart] = useState(false); //백업 데이터 사용 유무 확인
  const [firstScroll, setFirstScroll] = useState(false);
  const [timeState, setTimeState] = useState(false); // 백업 time 체크
  const limit = 100;
  const [Obj, setObj] = useState({
    channelUrl: channelUrl,
    token: '',
    limit: limit,
  });

  const {
    data: memberList,
    hasNextPage: hasNextPage,
    refetch,
  } = useGetChatMemberListQuery(
    {
      channelUrl: Obj.channelUrl,
      token: Obj.token,
      limit: Obj.limit,
    },
    {
      // staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      // refetchInterval: false, // 자동 새로 고침 비활성화
      enabled: Obj.token !== 'stop' ? true : false,
    },
  );

  // Obj 초기화 
  useEffect(() => {
    setObj({
      channelUrl: channelUrl,
      token: '',
      limit: limit,
    });
    setList([]);
  }, [channelUrl]);

  useEffect(() => {
    if(memberList && memberList.pages?.length > 0){
      if(memberList.pages[0].data.members?.length > 0){
        setList(prev => [
          ...prev,
          ...memberList.pages[0].data.members
        ]);
      }
    }
  }, [memberList]);

  const fetchNextPageTarget = useIntersectionObserver(() => {
    if (memberList?.pages[0].data.members.length >= 1) {
      setObj({
        ...Obj,
        token: memberList?.pages[0].data.next,
      });
    } else {
      setObj({
        ...Obj,
        token: 'stop',
      });
    }
  });

  return (
    <Flex
      position={'absolute'}
      right={0}
      height={'100%'}
      width={'230px'}
      borderLeftWidth={1}
      flexDirection={'column'}
      bg={'#f5f5f5'}
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
        bg={'white'}
        flexDirection={'row'}
        p={'15px'}
        justifyContent={'space-between'}
        borderBottomWidth={1}
      >
        <Flex gap={'10px'}>
          <Icon
            fillColor="PRIMARY"
            height={22}
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
          bg={'#FF5942'}
          borderRadius={'50%'}
        >
          <Text color={'white'} fontSize={'12px'} fontWeight={400}>
            {list && list?.length}
          </Text>
        </Flex>
      </Flex>
      <Flex flexDirection={'column'} overflowY={'auto'} pb={'15px'} h={'100%'} bg={'#f5f5f5'}>
        {list &&
        list.length > 0 &&
        list.map((item: SendbirdUserMembers, index: number) => {
          return (
            <>
              <Flex
                px={'15px'}
                pt={'15px'}
                justifyContent={'space-between'}
                // alignItems={'center'}
                flexDirection={'column'}
              >
                <Flex gap={'10px'} alignItems={'flex-start'}>
                  <Image
                    src={item.profile_url?.includes('http') ? item.profile_url : `${imgUserPath()}${item.profile_url}`}
                    width={'24px'}
                    height={'24px'}
                    borderRadius={'80px'}
                    alt="프로필"
                  />
                  <Flex flexDirection={'column'}>
                  <Text fontSize={'15px'}>{item.nickname}</Text>
                  </Flex>
                </Flex>
                <Text fontSize={'9px'} px={'10px'}>{item.user_id}</Text>
              </Flex>
            </>
          );
        })}
      </Flex>
      {hasNextPage && <Box ref={fetchNextPageTarget} mt={'10px'} />}
    </Flex>
  );
}
