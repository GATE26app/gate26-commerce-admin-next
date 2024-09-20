import { useSendMessageMutation } from '@/app/apis/sendbird/SendBirdApi.mutation';
import { Box, Flex, Img, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { ColorBlack, ColorGray700, ColorInputBorder } from '@/utils/_Palette';
import { useGetChatListQuery } from '@/app/apis/sendbird/SendBirdApi.query';
import useIntersectionObserver from '@/app/apis/useIntersectionObserver';
import MessageChat from './MessageChat';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage/helper';
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
  const [scrollHeight, setScrollHeight] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true); // 첫 로드 여부
  const [prevHeight, setPrevHeight] = useState(0);
  const [firstScroll, setFirstScroll] = useState(false);

  const topMessageRef = useRef<HTMLDivElement>(null);

  const [obj, setObj] = useState({
    prevLimit: 30,
    nextLimit: 0,
    channelUrl: '',
    ts: Date.now(),
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
    }
  }, [pageChange]);

  const {
    data: chatListData,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,
    refetch,
    fetchNextPage,
  } = useGetChatListQuery({
    prevLimit: obj.prevLimit,
    nextLimit: obj.nextLimit,
    channelUrl: channelrUrl,
    ts: obj.ts,
    messageId: obj.messageId,
  });

  console.log('isFetching', isFetching);
  const fetchNextPageTarget = useIntersectionObserver(() => {
    // 랜더링 한번만 되게 막기
    if (
      chatList.length >= 30 &&
      chatListData?.pages[0].data.messages.length >= 30 &&
      !isFetching &&
      firstScroll
    ) {
      setObj({
        ...obj,
        ts: chatListData?.pages[0].data.messages[0].created_at,
        messageId: chatListData?.pages[0].data.messages[0].message_id,
      });
      setIsFetching(true);
    }
  });

  // 데이터가 변경되면 채팅 리스트를 업데이트
  useEffect(() => {
    if (chatListData) {
      if (chatListData?.pages[0].data.messages.length > 0) {
        if (!isFirstLoad && isFetching) {
          setChatList([
            ...chatListData?.pages[0].data.messages.slice(0, -1),
            ...chatList,
          ]);
          // scrollRef.current!.scrollTop =
          //   chatListData?.pages[0].data.messages.length >= 30
          //     ? scrollRef.current!.scrollHeight -
          //       Number(localStorage.getItem('scrollHeigth')) -
          //       Number(localStorage.getItem('scrollTop'))
          //     : 0;
        } else {
          setChatList([...chatListData?.pages[0].data.messages, ...chatList]);
          // scrollRef.current!.scrollTop =
          //   chatListData?.pages[0].data.messages.length >= 30
          //     ? scrollRef.current!.scrollHeight -
          //       Number(localStorage.getItem('scrollHeigth')) -
          //       Number(localStorage.getItem('scrollTop'))
          //     : 0;
        }
      } else if (chatListData?.pages[0].data.messages.length == 0) {
        setChatList([]);
        // setPrevHeight(0);
      }
    } else {
      // setPrevHeight(0);
      // setChatList([]);
    }
  }, [chatListData]);

  // 데이터 로딩 후 스크롤 처리
  useEffect(() => {
    if (!isLoading && scrollRef.current) {
      if (isFirstLoad) {
        // 첫 로드 시, 맨 아래로 스크롤
        console.log('first');
        setTimeout(() => {
          scrollRef.current!.scrollTop = scrollRef.current!.scrollHeight;
          setFirstScroll(true);
        }, 100);
        setIsFirstLoad(false);
      } else if (isFetching) {
        if (topMessageRef.current) {
          const topMessagePosition =
            topMessageRef.current.getBoundingClientRect().top;
          console.log(
            'scrollRef.current!.scrollTop',
            scrollRef.current!.scrollTop,
          );
          console.log('topMessagePosition', topMessagePosition);
          scrollRef.current!.scrollTop =
            scrollRef.current!.scrollTop + topMessagePosition; // 약간의 여유 공간을 추가
        }
        setIsFetching(false);
      }
    }
  }, [chatListData, isLoading]);
  console.log('chatList', chatList);
  console.log('chatList.length - 30', chatList.length - 30);
  console.log(
    '****item',
    chatList.filter((item, index) => index == chatList.length - 30),
  );
  // 데이터 추가 전에 스크롤 위치 저장

  const handleScrollToSection = () => {
    console.log('***');
    // scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); // 스크롤 이동
    scrollRef.current?.focus();
  };
  let lastDate = null; // 마지막으로 출력된 날짜를 저장하는 변수

  //최고관리자 메세지 전송
  const { mutate: SendMessageMutate } = useSendMessageMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
        }
      },
      onError: (req) => {},
    },
  });

  const handleSendMessage = (event) => {
    if (event.key === 'Enter') {
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

  console.log('chatList.length', chatList.length);
  return (
    <Flex flexDirection={'column'} w={'100%'}>
      <Flex
        px={'16px'}
        height={'64px'}
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
      </Flex>
      <Flex
        overflowY={'auto'}
        px={'24px'}
        ref={scrollRef}
        flexDirection={'column'}
        h={'calc(100vh - 600px)'}
      >
        {chatList.length > 0 && (
          <Box>
            {hasNextPage && <Box ref={fetchNextPageTarget} />}
            {chatList.length > 0 &&
              chatList?.map((item, index) => {
                var date = new Date(item.created_at);
                var year = date.getFullYear().toString().slice(-2);
                var month = ('0' + (date.getMonth() + 1)).slice(-2);
                var day = ('0' + date.getDate()).slice(-2);
                const messageDate = new Date(item.created_at).toDateString(); // 메시지의 날짜를 가져옴
                const showDate = lastDate !== messageDate; // 마지막으로 출력된 날짜와 다르면 true
                lastDate = messageDate; // 마지막으로 출력된 날짜를 현재 메시지의 날짜로 갱신

                console.log(
                  '*^*^',
                  chatList.length >= 30 ? 30 : chatList.length - 30,
                );
                return (
                  <Flex
                    flexDirection={'column'}
                    w={'100%'}
                    onClick={handleScrollToSection}
                    key={index}
                    ref={
                      index ===
                      (chatList.length >= 30 ? 30 : chatList.length - 30)
                        ? topMessageRef
                        : null
                    }
                  >
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
          </Box>
        )}
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
    </Flex>
  );
}

export default MessageComponent;
