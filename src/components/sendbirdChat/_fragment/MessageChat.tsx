import { ColorGray700, ColorWhite } from '@/utils/_Palette';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CustomImageMessage from './CustomImageMessage';

interface Props {
  nextNickname: string;
  lastNickname: string;
  nextDate: Date;
  lastDate: Date;
  type: string;
}
export const EmojiImage = (emoji: string) => {
  if (emoji == 'sendbird_emoji_sweat_smile') {
    return 'https://static.sendbird.com/icons/emoji_sweat_smile.png';
  } else if (emoji == 'sendbird_emoji_thumbsdown') {
    return 'https://static.sendbird.com/icons/emoji_thumbsdown.png';
  } else if (emoji == 'sendbird_emoji_heart_eyes') {
    return 'https://static.sendbird.com/icons/emoji_heart_eyes.png';
  } else if (emoji == 'sendbird_emoji_laughing') {
    return 'https://static.sendbird.com/icons/emoji_laughing.png';
  } else if (emoji == 'sendbird_emoji_sob') {
    return 'https://static.sendbird.com/icons/emoji_sob.png';
  } else if (emoji == 'sendbird_emoji_rage') {
    return 'https://static.sendbird.com/icons/emoji_rage.png';
  } else if (emoji == 'sendbird_emoji_thumbsup') {
    return 'https://static.sendbird.com/icons/emoji_thumbsup.png';
  }
};
function MessageChat({
  item,
  nextNickname,
  lastNickname,
  nextDate,
  lastDate,
  type,
}: Props) {
  // let lastNick: string | null = null;
  var date = new Date(item.created_at);
  var year = date.getFullYear().toString().slice(-2);
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  var hour = ('0' + date.getHours()).slice(-2);
  var minute = ('0' + date.getMinutes()).slice(-2);

  // 각 메시지에 시간을 표시할지 결정하는 함수
  const shouldShowTime = () => {
    var nextYear = nextDate.getFullYear().toString().slice(-2);
    var nextMonth = ('0' + (nextDate.getMonth() + 1)).slice(-2);
    var nextDay = ('0' + nextDate.getDate()).slice(-2);
    var nextHour = ('0' + nextDate.getHours()).slice(-2);
    var nextMinute = ('0' + nextDate.getMinutes()).slice(-2);

    if (!lastDate) return true; // 마지막 메시지라면 시간 표시
    // if (type !== item.type) return true; // 마지막 메시지라면 시간 표시
    const isDifferentUser = item.user?.nickname !== nextNickname;
    const isDifferentMinute =
      `${year}.${month}.${day} ${hour}:${minute}` !==
      `${nextYear}.${nextMonth}.${nextDay} ${nextHour}:${nextMinute}`;

    return isDifferentUser || isDifferentMinute;
  };
  // 닉네임을 보여줄지 결정하는 함수
  const shouldShowUserName = () => {
    var lastYear = lastDate.getFullYear().toString().slice(-2);
    var lastMonth = ('0' + (lastDate.getMonth() + 1)).slice(-2);
    var lastDay = ('0' + lastDate.getDate()).slice(-2);
    var lastHour = ('0' + lastDate.getHours()).slice(-2);
    var lastMinute = ('0' + lastDate.getMinutes()).slice(-2);

    if (!lastDate) return true; // 첫 번째 메시지이면 닉네임 표시
    // if (type !== item.type) return true; // type이 다르면

    const isDifferentUser = item.user?.nickname !== lastNickname;
    const isDifferentMinute =
      `${year}.${month}.${day} ${hour}:${minute}` !==
      `${lastYear}.${lastMonth}.${lastDay} ${lastHour}:${lastMinute}`;

    return isDifferentUser || isDifferentMinute;
  };

  return (
    <Flex
      alignItems={'flex-end'}
      gap={'10px'}
      mb={shouldShowTime() ? '10px' : '5px'}
    >
      <Flex w={'28px'} h={'28px'} borderRadius={'50px'} overflow={'hidden'}>
        {shouldShowTime() && (
          <Image w={'100%'} h={'100%'} src={item.user.profile_url} />
        )}
      </Flex>
      <Flex flexDirection={'column'}>
        {/* 이전 닉네임과 현재 닉네임이 다르고 (true) 현재 시간과 이전 시간이 다르면  */}
        {shouldShowUserName() && (
          <Text fontSize={'12px'} fontWeight={400} color={ColorGray700}>
            {item.user.nickname}
          </Text>
        )}
        <Flex
          flexDirection={'column'}
          alignItems={'flex-start'}
          position={'static'}
        >
          {/* 대댓글 */}
          {item.parent_message_info !== undefined && (
            <Flex
              bgColor={'#F0F0F0'}
              px={'12px'}
              pt={'8px'}
              pb={'16px'}
              borderRadius={'20px'}
              position={'relative'}
              top={'12px'}
              overflow={'hidden'}
              opacity={0.5}
            >
              {item.parent_message_info.file !== undefined ? (
                <CustomImageMessage
                  {...item.parent_message_info}
                  width={'144px'}
                  heigth={'108px'}
                />
              ) : (
                <Text fontWeight={400} fontSize={'14px'} color={'#000000E0'}>
                  {item.parent_message_info?.message}
                </Text>
              )}
            </Flex>
          )}

          {item.type == 'FILE' ? (
            <CustomImageMessage {...item} width={'360px'} heigth={'270px'} />
          ) : (
            <Flex
              bgColor={'#F0F0F0'}
              borderRadius={'20px'}
              flexDirection={'column'}
            >
              <Text fontSize={'14px'} fontWeight={500} px={'12px'} py={'8px'}>
                {/* {item.mentioned_message_template} */}
                {item.message}
              </Text>
              {item.reactions.length > 0 && (
                <Flex
                  bgColor={ColorWhite}
                  borderRadius={'20px'}
                  borderColor={'#F0F0F0'}
                  borderWidth={1}
                  py={'5px'}
                  px={'5px'}
                  flexWrap={'wrap'}
                  maxW={'400px'}
                  gap={'5px'}
                >
                  {item.reactions.length > 0 &&
                    item.reactions?.map((item, index) => {
                      return (
                        <Flex
                          key={index}
                          bgColor={'#F0F0F0'}
                          borderRadius={'20px'}
                          px={'5px'}
                          alignItems={'center'}
                        >
                          <Image
                            w={'20px'}
                            h={'20px'}
                            src={EmojiImage(item.key)}
                          />
                          <Text
                            fontSize={'12px'}
                            fontWeight={400}
                            color={'#000000E0'}
                            marginLeft={'5px'}
                          >
                            {item.user_ids.length}
                          </Text>
                        </Flex>
                      );
                    })}
                </Flex>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
      {shouldShowTime() && (
        <Text fontSize={'12px'} fontWeight={400} color={ColorGray700}>
          {hour + ':' + minute}
        </Text>
      )}
    </Flex>
  );
}

export default MessageChat;
