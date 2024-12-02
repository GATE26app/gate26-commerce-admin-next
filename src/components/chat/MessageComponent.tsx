import { useSendMessageMutation } from '@/app/apis/sendbird/SendBirdApi.mutation';
import { Box, Flex, Img, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { ColorBlack, ColorGray700, ColorInputBorder } from '@/utils/_Palette';
import {
  useGetBackUpChatListQuery,
  useGetChatListQuery,
} from '@/app/apis/sendbird/SendBirdApi.query';
import Icon from '@sendbird/uikit-react/ui/Icon';
import useIntersectionObserver from '@/app/apis/useIntersectionObserver';
import MessageChat from './MessageChat';
import MessageHeader from './MessageHeader';
interface Props {
  channelrUrl: string;
  pageChange: boolean;
  setPageChange: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  img: string;
}
function MessageComponent({
  channelrUrl,
  pageChange,
  setPageChange,
  title,
  img,
}: Props) {
  const [chatList, setChatList] = useState([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true); // 첫 로드 여부
  const [firstScroll, setFirstScroll] = useState(false);
  const [backUpStart, setBackUpStart] = useState(false); //백업 데이터 사용 유무 확인
  const [timeState, setTimeState] = useState(false); // 백업 time 체크
  const [menu, setMenu] = useState(false);

  const [obj, setObj] = useState({
    prevLimit: 30,
    nextLimit: 0,
    channelUrl: '',
    ts: Date.now(),
    messageId: '',
  });
  const [bckObj, setBckObj] = useState({
    prevLimit: 30,
    nextLimit: 0,
    channelUrl: '',
    ts: 0,
    messageId: '',
  });

  //채팅창 클릭시 리스트 초기화
  useEffect(() => {
    if (pageChange) {
      setChatList([]);
      setIsFetching(false);
      setIsFirstLoad(true);
      setFirstScroll(false);
      setPageChange(false);
      setObj({
        prevLimit: 30,
        nextLimit: 0,
        channelUrl: '',
        ts: Date.now(),
        messageId: '',
      });
      setBckObj({
        prevLimit: 30,
        nextLimit: 0,
        channelUrl: '',
        ts: Date.now(),
        messageId: '',
      });
    }
  }, [pageChange]);

  const { data: chatListData, hasNextPage } = useGetChatListQuery({
    prevLimit: obj.prevLimit,
    nextLimit: obj.nextLimit,
    channelUrl: channelrUrl,
    ts: obj.ts,
    messageId: obj.messageId,
  });
  const {
    data: BackUpChatListData,
    hasNextPage: hasBackUpNextPage,
    refetch,
  } = useGetBackUpChatListQuery(
    {
      prevLimit: bckObj.prevLimit,
      nextLimit: bckObj.nextLimit,
      channelUrl: channelrUrl,
      ts: bckObj.ts,
      messageId: bckObj.messageId,
    },
    {
      // staleTime: Infinity, // 데이터가 절대 오래되었다고 간주되지 않음
      // refetchInterval: false, // 자동 새로 고침 비활성화
      enabled: bckObj.ts !== 0 ? true : false,
    },
  );

  const checkTimeDifference = (timestamp: number) => {
    const currentTime = new Date().getTime(); // 현재 시간을 밀리초로 가져옴
    const givenTime = new Date(timestamp).getTime(); // 타임스탬프를 밀리초로 변환
    const timeDifference = (currentTime - givenTime) / 1000; // 밀리초를 초로 변환

    const secondsIn3600Hours = 3600; // 3600시간을 초로 변환
    // const secondsIn3600Hours = 3600 * 3600; // 3600시간을 초로 변환

    return timeDifference >= secondsIn3600Hours;
  };

  const fetchNextPageTarget = useIntersectionObserver(() => {
    if (chatListData?.pages[0].data.messages.length >= 30) {
      setObj({
        ...obj,
        ts: chatListData?.pages[0].data.messages[
          chatListData?.pages[0].data.messages.length - 1
        ].created_at,
        messageId:
          chatListData?.pages[0].data.messages[
            chatListData?.pages[0].data.messages.length - 1
          ].message_id,
      });
    } else {
      const createAt =
        chatListData?.pages[0].data.messages[
          chatListData?.pages[0].data.messages.length - 1
        ].created_at;
      setTimeState(checkTimeDifference(createAt));
      if (checkTimeDifference(createAt)) {
        if (!backUpStart) {
          // 백업 api 첫 사용 무한 스크롤 시
          setBckObj({
            ...bckObj,
            ts: chatListData?.pages[0].data.messages[
              chatListData?.pages[0].data.messages.length - 1
            ].created_at,
            messageId:
              chatListData?.pages[0].data.messages[
                chatListData?.pages[0].data.messages.length - 1
              ].message_id,
          });
        } else {
          // 백업 api 사용 무한 스크롤 시
          setBckObj({
            ...bckObj,
            ts: BackUpChatListData?.pages[0].data.messages[
              BackUpChatListData?.pages[0].data.messages.length - 1
            ].created_at,
            messageId:
              BackUpChatListData?.pages[0].data.messages[
                BackUpChatListData?.pages[0].data.messages.length - 1
              ].message_id,
          });
        }
      }
    }
  });

  // 데이터가 변경되면 채팅 리스트를 업데이트
  useEffect(() => {
    if (chatListData) {
      if (chatListData?.pages[0].data.messages.length > 0) {
        setFirstScroll(true);

        // if (!isFirstLoad && isFetching) {
        if (!isFirstLoad) {
          setChatList([
            ...chatList,
            ...chatListData?.pages[0].data.messages.slice(1),
          ]);
        } else {
          setIsFirstLoad(false);
          setChatList([...chatList, ...chatListData?.pages[0].data.messages]);
        }
      } else if (chatListData?.pages[0].data.messages.length == 0) {
        setChatList([]);
      }
    }
  }, [chatListData]);

  useEffect(() => {
    if (timeState) {
      if (BackUpChatListData) {
        if (BackUpChatListData?.pages[0].data.messages.length > 0) {
          // if (!isFirstLoad && isFetching) {
          setChatList([
            ...chatList,
            ...BackUpChatListData?.pages[0].data.messages.slice(1),
          ]);
        } else if (BackUpChatListData?.pages[0].data.messages.length == 0) {
          // setChatList([]);
        }
      }
    }
  }, [BackUpChatListData]);

  let lastDate: any = null; // 마지막으로 출력된 날짜를 저장하는 변수

  //최고관리자 메세지 전송
  const { mutate: SendMessageMutate } = useSendMessageMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          setChatList([]);
          setIsFirstLoad(true);
          setObj({
            prevLimit: 30,
            nextLimit: 0,
            channelUrl: channelrUrl,
            ts: Date.now(),
            messageId: '',
          });
          refetch();
        }
      },
      onError: (req) => {},
    },
  });

  const handleSendMessage = (event) => {
    if (event.key === 'Enter' && event.nativeEvent.isComposing == false) {
      event.preventDefault();
      const message = event.target.value;
      if (message.trim()) {
        SendMessageMutate({
          channelUrl: channelrUrl,
          body: {
            message: message,
          },
        });
        event.target.value = '';
      }
    }
  };

  return (
    <Flex flexDirection={'column'} w={'100%'} position={'relative'}>
      <Flex
        px={'16px'}
        height={'64px'}
        minH={'64px'}
        alignItems={'center'}
        borderColor={'#E2E8F0'}
        borderWidth={1}
      >
        <Box
          overflow={'hidden'}
          borderRadius={'50%'}
          w={'32px'}
          h={'32px'}
          flexShrink={0}
          mr={'8px'}
        >
          <Img src={img} w={'32px'} h={'32px'} />
        </Box>
        <Text fontSize={'18px'} color={ColorBlack} fontWeight={600}>
          {title}
        </Text>
        <Flex
          position="absolute"
          right={'20px'}
          cursor="pointer"
          w="24px"
          h="24px"
          // onClick={openModal}
          onClick={() => setMenu(!menu)}
        >
          <Icon fillColor="DEFAULT" height={26} type="INFO" width={26} />
        </Flex>
      </Flex>
      <Flex
        overflowY={'auto'}
        px={'24px'}
        ref={scrollRef}
        flexDirection={'column-reverse'}
        h={'800px'}
        justifyContent={chatList.length < 10 ? 'flex-end' : 'normal'}
      >
        {chatList.length > 0 &&
          chatList?.map((item, index) => {
            var date = new Date(item.created_at);
            var year = date.getFullYear().toString().slice(-2);
            var month = ('0' + (date.getMonth() + 1)).slice(-2);
            var day = ('0' + date.getDate()).slice(-2);
            const messageDate = new Date(item.created_at).toDateString(); // 메시지의 날짜를 가져옴
            const showDate = lastDate !== messageDate; // 마지막으로 출력된 날짜와 다르면 true
            lastDate = messageDate; // 마지막으로 출력된 날짜를 현재 메시지의 날짜로 갱신
            return (
              <Flex flexDirection={'column'} w={'100%'} key={index}>
                {showDate && (
                  <Flex alignItems={'center'} w={'100%'}>
                    <Box
                      w={'100%'}
                      display={'inline-block'}
                      h={'1px'}
                      border={'none'}
                      bgColor="rgba(0, 0, 0, 0.12)"
                    ></Box>
                    <Text
                      fontSize={'12px'}
                      color={ColorGray700}
                      fontWeight={600}
                      mx={'16px'}
                      whiteSpace={'nowrap'}
                    >
                      {'20' + year + '년 ' + month + '월 ' + day + '일'}
                    </Text>
                    <Box
                      w={'100%'}
                      display={'inline-block'}
                      h={'1px'}
                      border={'none'}
                      bgColor="rgba(0, 0, 0, 0.12)"
                    ></Box>
                  </Flex>
                )}

                {item.type == 'MESG' || item.type == 'FILE' ? (
                  <MessageChat
                    item={item}
                    lastNickname={chatList[index - 1]?.user?.nickname}
                    nextNickname={chatList[index + 1]?.user?.nickname}
                    lastDate={new Date(chatList[index - 1]?.created_at)}
                    nextDate={new Date(chatList[index + 1]?.created_at)}
                    type={chatList[index + 1]?.type}
                  />
                ) : item.type == 'ADMM' ? (
                  <Flex justifyContent={'center'} py={'5px'}>
                    <Text
                      fontSize={'12px'}
                      fontWeight={400}
                      color={ColorGray700}
                    >
                      {item.message}
                    </Text>
                  </Flex>
                ) : (
                  <Flex></Flex>
                )}
              </Flex>
            );
          })}
        {hasNextPage && <Box ref={fetchNextPageTarget} mt={'10px'} />}
      </Flex>

      <div
        style={{
          margin: '15px',
        }}
      >
        <input
          type="text"
          placeholder="관리자 메세지를 입력해주세요."
          style={{
            width: '100%',
            padding: '10px',
            borderColor: ColorInputBorder,
            borderWidth: 1,
            borderRadius: '10px',
            outline: 'none',
          }}
          onKeyDown={handleSendMessage}
        />
      </div>

      {menu && (
        <MessageHeader onMenu={(e:boolean) => setMenu(e)} channelUrl={channelrUrl}/>
      )}
    </Flex>
  );
}

export default MessageComponent;
