import React from 'react';
import MessageChat from './MessageChat';
import { Box, Flex, Text } from '@chakra-ui/react';
import { ColorGray700 } from '@/utils/_Palette';

function MessageChatList({ item, chatList, index }) {
  let lastDate = null; // 마지막으로 출력된 날짜를 저장하는 변수
  var date = new Date(item.created_at);
  var year = date.getFullYear().toString().slice(-2);
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  const messageDate = new Date(item.created_at).toDateString(); // 메시지의 날짜를 가져옴
  const showDate = lastDate !== messageDate; // 마지막으로 출력된 날짜와 다르면 true
  lastDate = messageDate; // 마지막으로 출력된 날짜를 현재 메시지의 날짜로 갱신
  return (
    <Flex flexDirection={'column'} w={'100%'}>
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
          <Text fontSize={'12px'} fontWeight={400} color={ColorGray700}>
            {item.message}
          </Text>
        </Flex>
      ) : (
        <></>
      )}
    </Flex>
  );
}

export default MessageChatList;
