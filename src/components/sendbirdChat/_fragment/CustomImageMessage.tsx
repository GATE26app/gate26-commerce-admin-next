import moment from 'moment';
import React from 'react';
import Icon, { IconTypes, IconColors } from '@sendbird/uikit-react/ui/Icon';

import EmojiReactions from '@sendbird/uikit-react/ui/EmojiReactions';
import { Message } from '@sendbird/uikit-react/GroupChannel/components/Message';
import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react';
import lodash from 'lodash';
import { useSendImageMutation } from '@/app/apis/sendbird/SendBirdApi.mutation';

const CustomImageMessage = (props) => {
  const { message } = props;
  const [load, setLoad] = React.useState(false);
  const [image, setImage] = React.useState({
    plainUrl: '',
    fileUrl: '',
  });
  const [msg, setMsg] = React.useState<any>();
  const toast = useToast();

  const { mutate: GetImage } = useSendImageMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          setLoad(true);
          let d = lodash.cloneDeep(message);
          // d.url= res.data.presignedUrl;
          // d.fileUrl = res.data.presignedUrl;
          // d.plainUrl = res.data.presignedUrl;
          // d.type = 'image/png';
          // d.name = 'onboarding_1.png';
          setMsg(d);
          setImage({
            plainUrl: res.data.presignedUrl,
            fileUrl: res.data.presignedUrl,
          });
        } else {
          toast({
            position: 'top',
            duration: 2000,
            render: () => (
              <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
                {'이미지 조회에 실패했습니다.'}
              </Box>
            ),
          });
        }
      },
      onError: (req) => {
        toast({
          position: 'top',
          duration: 2000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              {'이미지 조회에 실패했습니다.'}
            </Box>
          ),
        });
      },
    },
  });

  React.useEffect(() => {
    if (load === false) {
      if (props?.file?.data != '') {
        let data: any;
        data = JSON.parse(props.file?.data);
        GetImage({
          ChannelUrl: data.channelUrl,
          imageId: data.imageId,
        });
      }
    }
  }, [load]);

  React.useEffect(() => {
    if (props?.file?.data != '') {
      let data: any;
      data = JSON.parse(props.file?.data);
      let d = lodash.cloneDeep(props);
      // d.url= res.data.presignedUrl;
      d.fileUrl = image.fileUrl;
      d.plainUrl = image.plainUrl;
      d.type = 'image/png';
      d.name = 'onboarding_1.png';
      setMsg(d);
    }
  }, [props]);

  return (
    <>
      {msg && (
        <Flex
          w={props?.width}
          h={props?.heigth}
          borderRadius={'16px'}
          bgColor={'#F0F0F0'}
          overflow={'hidden'}
        >
          <Image
            width={'100%'}
            height={'100%'}
            src={image.fileUrl}
            objectFit={'cover'}
          />
        </Flex>
      )}
    </>
  );
};

export default CustomImageMessage;
