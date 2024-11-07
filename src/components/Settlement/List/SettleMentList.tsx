import { useSettleFilterZuInfo } from '@/_store/SettleFilterInfo';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import CustomButton from '@/components/common/CustomButton';
import Pagination from '@/components/common/Pagination';
import {
  ColorBlack,
  ColorGray700,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import SettleDataTable from './SettleDataTable';
import ImageButton from '@/components/common/ImageButton';
import SettlementModal from '@/components/common/Modal/SettlementModal';
import { getToken } from '@/utils/localStorage/token/index';
import LoadingModal from '@/components/common/Modal/LoadingModal';
import ButtonModal from '@/components/common/Modal/ButtonModal';

interface Props {
  data: any;
  request: any;
  setRequest: React.Dispatch<React.SetStateAction<any>>;
}
function SettleMentList({ data, request, setRequest }: Props) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setGoodsInfo } = useGoodsStateZuInfo((state) => state);
  const { settleFilterInfo, setSettleFilterInfo } = useSettleFilterZuInfo(
    (state) => state,
  );
  const [CheckList, setChekcList] = useState<string[]>([]);
  const [newCheckList, setNewChekcList] = useState<string[]>([]);
  const paginationProps = {
    currentPage: request.pageNo,
    limit: request.pageSize,
    total: data?.totalCount,
    onPageNumberClicked: (page: number) => handleChangeInput('page', page),
    onPreviousPageClicked: (page: number) => handleChangeInput('page', page),
    onNextPageClicked: (page: number) => handleChangeInput('page', page),
  };
  const [isOpenAlertModal, setOpenAlertModal] = useState(false);
  const [ModalState, setModalState] = useState({
    title: '',
    message: '',
    type: 'alert',
    okButtonName: '',
    cbOk: () => {},
    cbCancel: () => {},
  });

  function handleChangeInput(key: string, value: string | number, id?: string) {
    const newRequest = { ...request, [key]: value };

    //10개씩 보기, 20개씩 보기, 50개씩 보기, 100개씩 보기 클릭 시 0으로 초기화
    if (key === 'limit') {
      newRequest.pageNo = 0;
    } else if (key === 'page') {
      newRequest.pageNo = Number(value);
      // router.push({
      //   pathname: '/goodslist',
      //   query: { page: Number(value) + 1 },
      // });
      router.push(`/settlementList?page=${Number(value) + 1}`);
      setSettleFilterInfo({
        ...settleFilterInfo,
        pageNo: Number(value),
      });
    }

    //페이지가 0보다 작은 경우 0으로 세팅
    if (newRequest.pageNo < 0) {
      newRequest.pageNo = 0;
    }

    setGoodsInfo({
      settlementState: true,
    });
    setRequest(newRequest);
  }

  const f_excel_down = async () => {
    setIsLoading(true);
    let searchKeyword =
      request.searchKeyword != ''
        ? 'searchType=' +
          request.searchType +
          '&searchKeyword=' +
          request.searchKeyword
        : '';
    let and =
      request.searchKeyword != '' ||
      request.fromDate != '' ||
      request.toDate != '' ||
      request.status != null ||
      CheckList.length != 0
        ? '?'
        : '';
    let fromDate =
      request.fromDate != '' ? '&fromDate=' + request.fromDate : '';
    let toDate = request.toDate != '' ? '&toDate=' + request.toDate : '';
    let status = request.status != null ? '&status=' + request.status : '';
    let settleId = CheckList.length > 0 ? '&settlementIds=' + CheckList : '';
    const addUrl = `${searchKeyword}${fromDate}${toDate}${status}${settleId}`;
    const url = `/backoffice/admin/download-settlements${and}${addUrl.slice(
      1,
    )}`;
    console.log('yrl', url);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-AUTH-TOKEN': `${getToken().access}`,
        },
      });
      if (!response.ok) {
        setIsLoading(false);
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      let fileName = '알수없는파일';
      try {
        const contentDisposition = response.headers.get('Content-Disposition');

        if (contentDisposition && contentDisposition.includes('filename*=')) {
          fileName = contentDisposition
            .split(`filename*=UTF-8''`)[1]
            .split(';')[0]
            .replace(/"/g, '');
        }
        a.download = decodeURIComponent(fileName); // 다운로드할 파일의 이름
      } catch (error) {
        fileName = '알수없는파일';
      }

      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <Box mt={'40px'}>
      {/* {openModal && (
        <SettlementModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )} */}
      <ButtonModal
        isOpen={isOpenAlertModal}
        ModalState={ModalState}
        onClose={() => setOpenAlertModal(false)}
      />
      <LoadingModal
        children={isLoading}
        isOpen={isLoading}
        onClose={() => !isLoading}
      />
      <Flex justifyContent={'space-between'}>
        <Flex flexDirection={'row'} alignItems={'flex-end'} gap={'6px'}>
          <Text
            fontSize={'15px'}
            lineHeight={'15px'}
            fontWeight={500}
            color={ColorGray700}
          >
            총
          </Text>
          <Text
            fontSize={'15px'}
            lineHeight={'15px'}
            fontWeight={800}
            color={ColorBlack}
          >
            {data?.totalCount}건
          </Text>
        </Flex>
        <Flex gap={'10px'}>
          {/* <CustomButton
          text="정산미확정 확인"
          fontSize="15px"
          color={ColorWhite}
          bgColor={ColorRed}
          borderColor={ColorRed}
          py="14px"
          px="48px"
          onClick={() => setOpenModal(true)}
        /> */}
          <ImageButton
            img="/images/Page/excel_icon.png"
            backgroundColor={ColorWhite}
            borderColor={ColorGrayBorder}
            text="엑셀 다운로드"
            TextColor={ColorGray700}
            fontSize="14px"
            imgHeight="20px"
            imgWidth="20px"
            px="14px"
            py="10px"
            onClick={() => {
              if (
                (CheckList.length <= 0 && data?.totalCount >= 100) ||
                CheckList.length >= 100
              ) {
                setOpenAlertModal(true);
                setModalState({
                  ...ModalState,
                  title: '엑셀 다운로드',
                  message: `100개 이상의 상품을 다운로드하면 시간이 오래 걸립니다.\n그래도 하시겠습니까?`,
                  type: 'confirm',
                  okButtonName: '확인',
                  cbOk: () => {
                    f_excel_down();
                  },
                });
              } else {
                f_excel_down();
              }
            }}
          />
        </Flex>
      </Flex>
      {/* {data && data?.totalCount !== undefined && data?.totalCount !== 0 ? ( */}
      <SettleDataTable
        data={data}
        setChekcList={setChekcList}
        CheckList={CheckList}
      />
      {/* ) : (
    <Flex
      bgColor={ColorGray100}
      mt={'20px'}
      py={'42px'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Image
        width={80}
        height={80}
        src={'/images/Page/no_data.png'}
        alt="데이터 없음"
      />
      <Text fontSize={'14px'} fontWeight={'400'} color={ColorBlack}>
        조회한 내용이 없습니다.
      </Text>
    </Flex>
  )} */}
      {data?.totalCount !== undefined &&
        data?.totalCount !== 0 &&
        paginationProps && (
          <Flex justifyContent="center" alignItems="center">
            <Pagination
              currentPage={request.pageNo}
              limit={request.pageSize}
              total={paginationProps.total}
              onPageNumberClicked={paginationProps.onPageNumberClicked}
              onPreviousPageClicked={paginationProps.onPreviousPageClicked}
              onNextPageClicked={paginationProps.onNextPageClicked}
              // setOnSubmit={setOnSubmit}
            />
          </Flex>
        )}
    </Box>
  );
}

export default SettleMentList;
