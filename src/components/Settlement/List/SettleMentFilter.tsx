import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import CustomButton from '@/components/common/CustomButton';
import DatePicker from '@/components/common/DatePicker';
import ImageButton from '@/components/common/ImageButton';
import SearchInput from '@/components/common/SearchInput';
import SelectBox from '@/components/common/SelectBox';
import {
  ColorBlack,
  ColorGray50,
  ColorGray600,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSettleFilterZuInfo } from '@/_store/SettleFilterInfo';
interface Props {
  request: any;
  setRequest: React.Dispatch<React.SetStateAction<any>>;
  setOnSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}
function SettleMentFilter({ request, setRequest, setOnSubmit }: Props) {
  const { setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const [search, setSearch] = useState('');
  const [searchSelect, setSearchSelect] = useState('');
  const searchSelectList = ['파트너사명', '상품주문번호', '결제번호', '사업자번호'];
  const router = useRouter();
  const toast = useToast();

  const [startDay, setStartDay] = useState<dayjs.Dayjs>();
  const [endDay, setEndDay] = useState<dayjs.Dayjs>();

  const [sState, setSState] = useState(false);
  const [eState, setEState] = useState(false);
  const { settleFilterInfo, setSettleFilterInfo, deleteSettleFilterInfo } = useSettleFilterZuInfo(
    (state) => state,
  );
  
  const onClickSubmit = () => {
    if (request.searchType == '' && request.searchKeyword !== '') {
      toast({
        position: 'top',
        duration: 2000,
        render: () => (
          <Box style={{ borderRadius: 8 }} p={3} color="white" bg="#ff6955">
            검색분류를 선택해주세요.
          </Box>
        ),
      });
      // ToastComponent('기간조회 유형을 선택해주세요.');
    } else {
      setSettleFilterInfo({
        ...settleFilterInfo,
        fromDate: request.fromDate,
        endDate: request.endDate,
        pageNo: 0,
        searchType: request.searchType !== undefined ? request.searchType : '',
        searchKeyword:
          request.searchKeyword !== undefined ? request.searchKeyword : '',
      });
      setGoodsInfo({
        settlementState: true,
      });
    }
  };

  useEffect(() => {
    if (request.searchType == '') {
      setSearchSelect('');
    }
    if(request.fromDate == ''){
      setStartDay(dayjs(''));
    }
    if(request.toDate == ''){
      setEndDay(dayjs(''));
    }
    // if (request.searchKeyword == '') {
    //   setSearchSelect('');
    // }
    console.log(request.searchKeyword, 'feaw', request.fromDate);
  }, [request]);

  // useEffect(() => {
  //   if (EntriesData?.openDate !== '' && EntriesData?.openDate !== null) {
  //     setOpenDay(dayjs(EntriesData.openDate));
  //   }
  //   if (EntriesData?.endDate !== '' && EntriesData?.endDate !== null) {
  //     setEndDay(dayjs(EntriesData.endDate));
  //   }
  // }, [EntriesData]);

  return (
    <Flex
      bgColor={ColorGray50}
      borderRadius={'12px'}
      p={'40px'}
      flexDirection={'column'}
    >
      <Flex>
        <Flex flexDirection={'column'} w={'100%'}>
          <Text
            fontSize={'16px'}
            fontWeight={700}
            color={ColorBlack}
            mb={'10px'}
          >
            기간조회
          </Text>
          <Flex mb={'30px'}>
            <Flex alignItems={'center'} gap={'5px'}>
            <DatePicker
            type={'date'}
            curDate={startDay}
            width={'190px'}
            maxDateTime={
              request.toDate == ''
                ? ''
                : dayjs(request.toDate).format('YYYY-MM-DD')
            }
            onApply={(date) => {
              setStartDay(date);
              setSState(true);
            }}
          />
          <Text color={ColorBlack} fontSize={'15px'} fontWeight={500}>
            ~
          </Text>
          <DatePicker
            type={'date'}
            curDate={endDay}
            width={'190px'}
            minDateTime={
              request.fromDate == ''
                ? ''
                : dayjs(request.fromDate).format('YYYY-MM-DD')
            }
            onApply={(date) => {
              setEndDay(date);
              setEState(true);
            }}
          />
              {/* </Flex> */}
            </Flex>
          </Flex>
          <Box w={'50%'} mr={'15px'}>
            <Text
              fontSize={'16px'}
              fontWeight={700}
              color={ColorBlack}
              mb={'10px'}
            >
              통합검색
            </Text>
            <Flex gap={'10px'}>
              <Box width={'190px'}>
                <SelectBox
                  placeholder="검색분류선택"
                  width={'190px'}
                  list={searchSelectList}
                  select={searchSelect}
                  setSelect={(item) => {
                    setSearchSelect(item);
                    setRequest({
                      ...request,
                      searchType:
                        item == '파트너사명'
                          ? 'partnerTitle'
                          : item == '상품주문번호'
                            ? 'orderId'
                            : item == '결제번호'
                              ? 'merchantUid'
                              : item == '사업자번호'
                                ? 'businessRegistrationNumber'
                                : '',
                    });
                  }}
                />
              </Box>
              <SearchInput
                value={request.searchKeyword}
                onChange={(e) => {
                  setRequest({ ...request, searchKeyword: e.target.value });
                }}
                placeholder="검색어를 입력해주세요."
              />
            </Flex>
          </Box>
        </Flex>
        {/* <FilterBox request={request} setRequest={setRequest} /> */}
        {/* <LeftBox
        filter_1={filter_1}
        filter_2={filter_2}
        setFilter_1={setFilter_1}
        setFilter_2={setFilter_2}
        search={search}
        setSearch={setSearch}
      />
      <RightBox filter_3={filter_3} setFilter_3={setFilter_3} /> */}
      </Flex>
      <Flex justifyContent={'center'} mt={'45px'} gap={'10px'}>
        <ImageButton
          img="/images/Page/icon_reload.png"
          backgroundColor={ColorWhite}
          px={'48px'}
          text="초기화"
          onClick={() => {
            setRequest({
              ...request,
              status: null,
              fromDate: '',
              toDate: '',
              searchKeyword: '',
              searchType: '',
            });
            deleteSettleFilterInfo();
            setOnSubmit(true);
            setGoodsInfo({
              settlementState: true,
            });
          }}
          borderColor={ColorGrayBorder}
          TextColor={ColorGray600}
          imgWidth={'15px'}
          imgHeight={'15px'}
          fontSize={'15px'}
          py="13px"
        />
        <CustomButton
          text="검색"
          fontSize="15px"
          color={ColorWhite}
          bgColor={ColorRed}
          borderColor={ColorRed}
          py="14px"
          px="67px"
          onClick={() => {
            onClickSubmit();
          }}
        />
        {/* <Button size="sm" text="검색" width={'160px'} /> */}
      </Flex>
    </Flex>
  );
}

export default SettleMentFilter;
