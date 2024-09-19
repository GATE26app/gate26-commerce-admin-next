import React, { useState } from 'react';

import {
  Box,
  CircularProgress,
  Flex,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';

import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';

import styled from '@emotion/styled';
import {
  ColorBlack,
  ColorBlue,
  ColorGray50,
  ColorGray100,
  ColorGray200,
  ColorGray400,
  ColorGray700,
  ColorGray900,
  ColorGrayBorder,
  ColorInputBorder,
  ColorRed,
  ColorRedOpa,
  ColorWhite,
} from '@/utils/_Palette';
import { getImagePath, imgPath } from '@/utils/format';

import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { GoodsSchedulesListProps } from '@/app/apis/goods/GoodsApi.type';
import { usePostImageMutation } from '@/app/apis/goods/GoodsApi.mutation';
import ButtonModal from '../common/Modal/ButtonModal';
import GoogleMapModal from '../common/Modal/GoogleMapModal';

interface ScheduleItemProps {
  sort: number;
  startDay: string;
  startTime: string;
  durationTime: string;
  location: string;
  info: string;
  lat: string;
  lng: string;
  images: ImageItemProps[];
}
interface ImageItemProps {
  imagePath: string;
  thumbnailImagePath: string;
}

interface ImagetPathProps {
  id: number;
  imagePath: string;
}
interface ImagetListProps {
  id: number;
  imageListImage: string;
}
interface Props {
  list: Array<GoodsSchedulesListProps>;
  setList: React.Dispatch<React.SetStateAction<GoodsSchedulesListProps[]>>;
}
function PlanComponent({ list, setList }: Props) {
  const toast = useToast();
  const { goodsInfo } = useGoodsStateZuInfo((state) => state);
  const [open, setOpen] = useState(true);
  const [addressModal, setAddressModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState<{
    lat: string;
    lng: string;
    address: string;
  } | null>(null);
  const [comment, setComment] = useState('');

  const [thumImagePath, setThumImagePath] = useState<string>('');
  const [thumImageList, setThumImageList] = useState('');
  const [imageList, setImageList] = useState<ImagetListProps[]>([
    {
      id: 0,
      imageListImage: '',
    },
  ]);
  const [imagePath, setImagePath] = useState<ImagetPathProps[]>([
    {
      id: 0,
      imagePath: '',
    },
  ]);
  const [roadAddress, setRoadAddress] = useState<string>('');

  const [imageIndex, setImageIndex] = useState(0);
  const [addressIndex, setAddressIndex] = useState(0);

  const [isLoadingModal, setLoadingModal] = useState(false);
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const [ModalState, setModalState] = useState({
    title: '',
    message: '',
    type: 'alert',
    okButtonName: '',
    cbOk: () => {},
    cbCancel: () => {},
  });

  //구글 주소 modal
  const handleOpenModal = (index: number) => {
    setIsModalOpen(true);
    setAddressIndex(index);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleComplete = (location: {
    lat: string;
    lng: string;
    address: string;
  }) => {
    list[addressIndex].lat = String(location.lat);
    list[addressIndex].lng = String(location.lng);
    list[addressIndex].location = location.address;
    // setList({
    //   ...list,
    //   lat: location.lat,
    //   lng: location.lng,
    //   location: location.address,
    // });
    // addressIndex
    setLocation(location);
  };

  const onAddressClose = () => {
    setAddressModal(!addressModal);
  };

  const completeHandler = (data: any) => {
    setRoadAddress(data.roadAddress);
    // setZipcode(data.zonecode); // 추가
    // setRoadAddress(data.roadAddress); // 추가
    setAddressModal(false);
  };
  const handleChangeItem = (id: number, type: string, value: string) => {};

  const handleDeleteItem = (id: number) => {
    if (list.length > 1) {
      setList(
        list.filter((item: ScheduleItemProps, index: number) => index !== id),
      );
    }
  };

  const handlePlusItem = () => {
    const object: ScheduleItemProps = {
      sort: 1,
      startDay: '',
      startTime: '',
      durationTime: '',
      location: '',
      info: '',
      lng: '',
      lat: '',
      images: [
        {
          imagePath: '',
          thumbnailImagePath: '',
        },
      ],
    };
    const imgObj = {
      id: list.length - 1,
      imagePath: '',
    };
    const imListObj = {
      id: list.length - 1,
      imageListImage: '',
    };
    setImagePath([...imagePath, imgObj]);
    setImageList([...imageList, imListObj]);
    setList([...list, object]);
  };

  const { mutate: ItemCodeMutate, isLoading } = usePostImageMutation({
    options: {
      onSuccess: (res) => {
        if (res.success == true) {
          list[imageIndex].images[0].imagePath = res.data?.imagePath;
          list[imageIndex].images[0].thumbnailImagePath =
            res.data?.thumbnailImagePath;
          imagePath[imageIndex].imagePath = thumImagePath;
          imageList[imageIndex].imageListImage = thumImageList;
        } else {
          console.log('error 코드 생성 에러', res.code);
        }
      },
      onError: (req) => {
        toast({
          position: 'top',
          duration: 2000,
          render: () => (
            <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
              {'이미지 용량이 초과되어 업로드가 불가능합니다.'}
            </Box>
          ),
        });
      },
    },
  });

  const handleUploadImage = (e: any) => {
    if (
      e.target.files[0].name.split('.')[1] !== 'jpg' &&
      e.target.files[0].name.split('.')[1] !== 'JPG' &&
      e.target.files[0].name.split('.')[1] !== 'jpeg' &&
      e.target.files[0].name.split('.')[1] !== 'JPEG' &&
      e.target.files[0].name.split('.')[1] !== 'png' &&
      e.target.files[0].name.split('.')[1] !== 'PNG' &&
      e.target.files[0].name.split('.')[1] !== 'gif' &&
      e.target.files[0].name.split('.')[1] !== 'GIF' &&
      e.target.files[0].name.split('.')[1] !== 'bmp' &&
      e.target.files[0].name.split('.')[1] !== 'BMP'
    ) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            {'jpg, jpeg, png, gif, bmp 확장자만 등록 가능합니다.'}
          </Box>
        ),
      });
    } else {
      setThumImageList(e.target.files[0]);
      //이미지 미리보기 기능
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setThumImagePath(reader.result as string);
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        ItemCodeMutate(formData);
      };
    }
  };

  const onDeleteImg = (index: number) => {
    list[index].images[0].imagePath = '';
    list[index].images[0].thumbnailImagePath = '';
    setImageList((prevItems) =>
      prevItems.map((item, idx) =>
        idx === index ? { ...item, imageListImage: '' } : item,
      ),
    );
    setImagePath((prevItems) =>
      prevItems.map((item, idx) =>
        idx === index ? { ...item, imagePath: '' } : item,
      ),
    );
  };

  const onAddressDelete = (index: number) => {
    setList((prevLocations) => {
      const newLocations = [...prevLocations];
      const updatedObject = {
        ...newLocations[index],
        location: '',
        lat: '',
        lng: '',
      };
      newLocations[index] = updatedObject;
      return newLocations;
    });
  };
  // const center = {
  //   lat: 37.5,
  //   lng: 127,
  // };
  return (
    <>
      <ButtonModal
        isOpen={isOpenAlertModal}
        ModalState={ModalState}
        onClose={() => setOpenAlertModal(false)}
      />
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
              여행일정
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
            gap={'20px'}
          >
            {list &&
              list?.map((item, index: number) => {
                return (
                  <Flex
                    key={index}
                    flexDirection={'column'}
                    borderColor={ColorGray400}
                    borderWidth={1}
                    borderRadius={'12px'}
                    p={'20px'}
                  >
                    <Flex mb={'30px'} gap={'10px'} flexWrap={'wrap'}>
                      <Flex w={'311px'} flexDirection={'column'} gap={'6px'}>
                        <Text
                          fontWeight={700}
                          fontSize={'16px'}
                          color={ColorBlack}
                        >
                          진행일자
                        </Text>
                        <InputBox
                          placeholder="예) 첫째날"
                          disabled={goodsInfo.LogItemDisable}
                          defaultValue={item.startDay}
                          onBlur={(e: any) =>
                            (list[index].startDay = e.target.value)
                          }
                        />
                      </Flex>
                      <Flex w={'311px'} flexDirection={'column'} gap={'6px'}>
                        <Text
                          fontWeight={700}
                          fontSize={'16px'}
                          color={ColorBlack}
                        >
                          시간대
                        </Text>

                        <InputBox
                          placeholder="예) 11:30"
                          defaultValue={item.startTime}
                          disabled={goodsInfo.LogItemDisable}
                          onBlur={(e: any) =>
                            (list[index].startTime = e.target.value)
                          }
                        />
                      </Flex>
                      <Flex w={'311px'} flexDirection={'column'} gap={'6px'}>
                        <Text
                          fontWeight={700}
                          fontSize={'16px'}
                          color={ColorBlack}
                        >
                          소요시간
                        </Text>

                        <InputBox
                          placeholder="예) 2시간"
                          disabled={goodsInfo.LogItemDisable}
                          defaultValue={item.durationTime}
                          onBlur={(e: any) =>
                            (list[index].durationTime = e.target.value)
                          }
                        />
                      </Flex>
                    </Flex>
                    <Flex flexDirection={'column'} mb={'30px'}>
                      <Text
                        fontWeight={700}
                        fontSize={'16px'}
                        color={ColorBlack}
                      >
                        위치
                      </Text>
                      <Flex mt={'6px'} flexDirection={'row'}>
                        <Flex
                          bgColor={ColorGray200}
                          alignItems={'center'}
                          borderRadius={'10px'}
                          px={'15px'}
                          py={'13px'}
                          mr={'10px'}
                          w={'980px'}
                          justifyContent={'space-between'}
                        >
                          <Text>
                            {item.location !== ''
                              ? item.location
                              : '주소를 검색해주세요.'}
                          </Text>
                          <Image
                            src={'/images/Page/icon_delete_img.png'}
                            width={'15px'}
                            height={'15px'}
                            alt="삭제"
                            onClick={() => onAddressDelete(index)}
                          />
                        </Flex>
                        <Flex
                          bgColor={ColorRedOpa}
                          borderRadius={'10px'}
                          px={'31px'}
                          py={'13px'}
                          flexShrink={0}
                          onClick={() => handleOpenModal(index)}
                          // onClick={onClickAddr}
                          // onClick={() =>}
                        >
                          <Text
                            color={ColorRed}
                            fontWeight={400}
                            fontSize={'15px'}
                          >
                            주소검색
                          </Text>
                        </Flex>
                      </Flex>
                      {/* {item.location !== '' && (
                        <LoadScript
                          googleMapsApiKey={
                            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
                          }
                          libraries={['places']}
                        >
                          <GoogleMap
                            mapContainerStyle={{
                              width: '400px',
                              height: '600px',
                            }}
                            center={item.lat !== 0 ? location : center}
                            zoom={13}
                          >
                            {item.lat !== 0 && (
                              <Marker
                                position={{ lat: item.lat, lng: item.lng }}
                              />
                            )}
                          </GoogleMap>
                        </LoadScript>
                      )} */}

                      {/* <Flex pt={'10px'} w={'100%'} flexDirection={'column'}>
                      <InputBox
                        defaultValue={list[index].location}
                        placeholder="주소를 입력해주세요."
                        disabled={goodsInfo.LogItemDisable}
                        onBlur={(e) => (list[index].location = e.target.value)}
                      />
                    </Flex> */}
                    </Flex>

                    {isModalOpen && (
                      <GoogleMapModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onComplete={handleComplete}
                      />
                    )}

                    {/* <Modal isOpen={addressModal} onClose={onAddressClose}>
                  <ModalOverlay />
                  <Content maxW={600}>
                    <Header>
                      <Flex
                        alignItems={'center'}
                        justifyContent={'flex-end'}
                        mb={'17px'}
                      >
                        <Image
                          src={'/images/Page/ico_modal_close.png'}
                          width={'20px'}
                          height={'20px'}
                          alt="모달 close"
                          onClick={onAddressClose}
                        />
                      </Flex>
                    </Header>
                    <DaumPostcode onComplete={completeHandler} />
                  </Content>
                </Modal> */}
                    <Flex mb={'30px'}>
                      <Flex flexDirection={'row'} pb="20px" flexWrap={'wrap'}>
                        <Flex flexDirection={'column'} w={320}>
                          <Flex>
                            <Text
                              fontWeight={700}
                              color={ColorBlack}
                              fontSize={'16px'}
                            >
                              상품이미지
                            </Text>
                          </Flex>
                          <Text
                            fontWeight={700}
                            color={ColorGray700}
                            fontSize={'16px'}
                          >
                            (
                            {item.images[0].thumbnailImagePath !== ''
                              ? '1'
                              : '0'}
                            /1)
                          </Text>
                        </Flex>
                        <Flex flexDirection={'column'} position={'relative'}>
                          {item.images[0].thumbnailImagePath !== '' && (
                            <Flex
                              position={'absolute'}
                              top={'10px'}
                              right={'10px'}
                              onClick={() => {
                                setOpenAlertModal(true);
                                setModalState({
                                  ...ModalState,
                                  title: '이미지 삭제',
                                  message: '이미지를 삭제하시곘습니까?',
                                  type: 'alert',
                                  okButtonName: '확인',
                                  cbOk: () => {
                                    onDeleteImg(index);
                                    // window.history.back();
                                  },
                                });
                              }}
                            >
                              <Image
                                src={'/images/Page/icon_delete_img.png'}
                                alt="이미지 삭제"
                                width={'32px'}
                                height={'32px'}
                                // onClick={() => onDeleteImg(index)}
                              />
                            </Flex>
                          )}
                          {isLoading ? (
                            <Flex
                              w={'380px'}
                              h={'185px'}
                              justifyContent={'center'}
                              alignItems={'center'}
                              borderRadius={'10px'}
                              overflow={'hidden'}
                              borderWidth={1}
                              borderStyle={'dashed'}
                              borderColor={ColorInputBorder}
                            >
                              <CircularProgress
                                isIndeterminate
                                color={ColorBlue}
                              />
                            </Flex>
                          ) : (
                            <>
                              {item.images[0].thumbnailImagePath !== '' ? (
                                <>
                                  <Flex
                                    key={index}
                                    w={'380px'}
                                    h={'185px'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    borderRadius={'10px'}
                                    overflow={'hidden'}
                                    borderWidth={1}
                                    borderStyle={'dashed'}
                                    borderColor={ColorInputBorder}
                                  >
                                    <img
                                      // src={imagePath[index]?.imagePath}
                                      // src={imagePath[]}
                                      src={getImagePath(
                                        item.images[0].thumbnailImagePath,
                                      )}
                                      alt="이미지 업로드"
                                    />
                                  </Flex>
                                </>
                              ) : (
                                <label htmlFor="img3">
                                  <Flex
                                    w={380}
                                    h={185}
                                    borderWidth={1}
                                    borderStyle={'dashed'}
                                    borderColor={ColorInputBorder}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    borderRadius={'10px'}
                                    onClick={() => setImageIndex(index)}
                                  >
                                    <Image
                                      src={'/images/Page/ico_plus.png'}
                                      width={'28px'}
                                      height={'28px'}
                                      alt="이미지 추가"
                                    />
                                  </Flex>
                                </label>
                              )}
                            </>
                          )}
                          <input
                            type="file"
                            id="img3"
                            onChange={handleUploadImage}
                            style={{ display: 'none' }}
                          ></input>
                          <Box>
                            <Text
                              color={ColorGray700}
                              fontSize={'14px'}
                              fontWeight={400}
                              pt={'10px'}
                            >
                              * 1140px*555px사이즈
                            </Text>
                            <Text
                              color={ColorGray700}
                              fontSize={'14px'}
                              fontWeight={400}
                            >
                              * 비율이 맞지 않는 이미지를 올리시면 이미지가 일부
                              잘릴 수 있습니다.
                            </Text>
                            <Text
                              color={ColorGray700}
                              fontSize={'14px'}
                              fontWeight={400}
                            >
                              * 이미지는 5MB이하 / gif, png, jpg(jpeg)로만 등록
                              가능합니다.
                            </Text>
                          </Box>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex w={'100%'} flexDirection={'column'}>
                      <Text
                        fontWeight={700}
                        color={ColorBlack}
                        fontSize={'16px'}
                      >
                        여행설명
                      </Text>
                      <Flex flexDirection={'column'} mt={'10px'}>
                        <Textarea
                          placeholder="여행에 대한 설명을 입력헤주세요."
                          _placeholder={{ color: ColorGray700 }}
                          color={ColorBlack}
                          borderColor={ColorGray400}
                          // onChange={(e) => setData(e.target.value)}
                          maxLength={100}
                          height={100}
                          borderRadius={'10px'}
                          disabled={goodsInfo.LogItemDisable}
                          defaultValue={item.info}
                          onChange={(e) => {
                            list[index].info = e.target.value;
                            setComment(e.target.value);
                          }}
                        />
                        <Flex justifyContent={'flex-end'} mt={'5px'}>
                          <Text
                            color={ColorGray700}
                            fontWeight={400}
                            fontSize={'15px'}
                          >
                            ({comment.length}/100)
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex justifyContent={'center'}>
                      {index > 0 && (
                        <CustomButton
                          text="삭제하기"
                          bgColor={ColorWhite}
                          borderColor={ColorGray900}
                          color={ColorGray900}
                          fontSize="15px"
                          px="31px"
                          py="13px"
                          onClick={() => handleDeleteItem(index)}
                        />
                      )}
                    </Flex>
                  </Flex>
                );
              })}

            <Flex justifyContent={'center'} mt={'30px'}>
              <CustomButton
                text="+ 항목추가"
                bgColor={ColorGray900}
                borderColor={ColorGray900}
                color={ColorWhite}
                fontSize="15px"
                px="54px"
                py="19px"
                onClick={() => handlePlusItem()}
              />
            </Flex>
          </Flex>
        )}
      </Flex>
    </>
  );
}

const Content = styled(ModalContent)`
  &.chakra-modal__content {
    padding: 30px 0px;
    border-radius: 10px;
    .chakra-modal {
      &__header {
        padding: 0px 30px;
        text-align: center;
        /* color: #ff5942; */
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 27px;
        letter-spacing: -0.02em;
      }
      &__body {
        /* padding: 10px 20px 20px 20px; */
        /* text-align: center; */
        /* white-space: break-spaces; */
        /* color: #757983; */

        /* font-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 27px;
        letter-spacing: -0.02em; */
      }
      &__footer {
        padding: 0;
        display: flex;
        background-color: '#292A2E';
        /* justify-content: space-between; */
        .button {
          cursor: pointer;

          width: 100%;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;

          border-radius: '10px';
          color: #292a2e;
          border: 1px solid '#292A2E';
          font-family: 'Pretendard';
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 27px;
          letter-spacing: -0.02em;
        }
      }
    }
  }
`;
const Header = styled(ModalHeader)``;
export default PlanComponent;
