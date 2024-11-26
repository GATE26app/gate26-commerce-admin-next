import React, { useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

// import { GoodsListParamGetType } from '@/apis/goods/GoodsApi.type';

import CustomButton from '@/components/common/CustomButton';
import ImageButton from '@/components/common/ImageButton';
import Pagination from '@/components/common/Pagination';

import {
  ColorBlack,
  ColorGray100,
  ColorGray700,
  ColorGrayBorder,
  ColorRed,
  ColorWhite,
} from '@/utils/_Palette';

import GoodsDataTable from './list/GoodsDataTable';
import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useGoodsSettingFilterZuInfo } from '@/_store/GoodsSetFIlterInfo';
import ButtonModal from '../common/Modal/ButtonModal';
import LoadingModal from '../common/Modal/LoadingModal';
import { getToken } from '@/utils/localStorage/token';

// import { useCustomModalHandlerContext } from 'contexts/modal/useCustomModalHandler.context';

interface ReqLoungeProps {
  keyword?: string;
  searchType?: number;
  page: number;
  limit: number;
}

interface Props {
  data: any;
  request: any;
  setRequest: React.Dispatch<React.SetStateAction<any>>;
  setOnSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}
function GoodsListComponet({
  data,
  request,
  setRequest,
  setOnSubmit,
  isLoading,
}: Props) {
  const router = useRouter();
  const { GoodsSettingFilterInfo, setGoodsSettingFilterInfo } =
    useGoodsSettingFilterZuInfo((state) => state);
  const { setGoodsInfo } = useGoodsStateZuInfo((state) => state);
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
    type: 'confirm',
    okButtonName: '',
    cbOk: () => {},
    cbCancel: () => {},
  });
  const [CheckList, setCheckList] = useState<string[]>([]);
  const [isAlertLoading, setIsLoading] = useState(false);
  function handleChangeInput(key: string, value: string | number, id?: string) {
    const newRequest = { ...request, [key]: value };

    //10개씩 보기, 20개씩 보기, 50개씩 보기, 100개씩 보기 클릭 시 0으로 초기화
    if (key === 'limit') {
      newRequest.pageNo = 0;
    } else if (key === 'page') {
      // setPage(value as number);
      newRequest.pageNo = Number(value);
      router.push(`/goodsSetting?page=${Number(value) + 1}`);
      setGoodsSettingFilterInfo({
        ...GoodsSettingFilterInfo,
        pageNo: Number(value),
      });
      // router.push(`/entries/first?page=${Number(value)}`);
    }

    //페이지가 0보다 작은 경우 0으로 세팅
    if (newRequest.pageNo < 0) {
      newRequest.pageNo = 0;
    }

    //페이지가 마지막 페이지보다 큰 경우 마지막 페이지로 세팅
    // if (newRequest.page >= lastPage - 1) {
    //   newRequest.page = lastPage - 1;
    //   console.log('444444');
    // }
    // setOnSubmit(true);
    setGoodsInfo({
      goodState: true,
    });
    setRequest(newRequest);
  }
  const onClickExcel = () => {
    if (CheckList.length == 0 && data?.totalCount >= 100) {
      setOpenAlertModal(true);
      setModalState({
        ...ModalState,
        title: '엑셀 다운로드',
        message:
          '100개 이상의 상품을 다운로드하면 시간이 오래 걸립니다. 그래도 하시겠습니까?',
        type: 'confirm',
        okButtonName: '확인',
        cbOk: () => {
          f_excel_down();
          // window.history.back();
        },
      });
    } else {
      f_excel_down();
    }
  };

  const f_excel_down = async () => {
    setIsLoading(true);

    let and =
      request.searchKeyword != '' ||
      request.type != 0 ||
      request.status != null ||
      request.level !== 0 ||
      request.forSale != 0 ||
      request.partnerId != '' ||
      CheckList.length != 0
        ? '?'
        : '';
    let type = request.type != 0 ? '&type=' + request.type : '';
    let status = request.status != null ? '&status=' + request.status : '';
    let level = request.level != 0 ? '&level=' + request.level : '';
    let forSale = request.forSale != 0 ? '&forSale=' + request.forSale : '';
    let searchKeyword =
      request.searchKeyword != ''
        ? '&searchType=' +
          request.searchType +
          '&searchKeyword=' +
          request.searchKeyword
        : '';
    let partnerId =
      request.partnerId !== '' ? '&partnerId=' + request.partnerId : '';
    let itemCodes = CheckList.length > 0 ? '&itemCodes=' + CheckList : '';
    const addUrl = `${forSale}${type}${status}${level}${searchKeyword}${partnerId}${itemCodes}`;
    const url = `/backoffice/admin/download-items${and}${addUrl.slice(1)}`;

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

      const contentDisposition = response.headers.get('Content-Disposition');
      let fileName = '첨부파일';
      console.log('contentDisposition', contentDisposition);

      if (contentDisposition && contentDisposition.includes('filename*=')) {
        fileName = decodeURIComponent(
          contentDisposition.split("filename*=UTF-8''")[1],
        );
      }

      a.download = decodeURIComponent(fileName); // 다운로드할 파일의 이름

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
      <ButtonModal
        isOpen={isOpenAlertModal}
        ModalState={ModalState}
        onClose={() => setOpenAlertModal(false)}
      />
      <LoadingModal
        children={isAlertLoading}
        isOpen={isAlertLoading}
        onClose={() => !isAlertLoading}
      />
      <Flex justifyContent={'space-between'}>
        <Flex flexDirection={'row'} alignItems={'center'} gap={'6px'}>
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
          <CustomButton
            text="예약형 상품 등록"
            bgColor={ColorRed}
            px="29px"
            py="11px"
            color={ColorWhite}
            fontSize="14px"
            onClick={() => router.push('/createGoods?type=3')}
            borderColor={ColorRed}
          />
          <CustomButton
            text="일반 상품 등록"
            bgColor={ColorRed}
            px="29px"
            py="11px"
            color={ColorWhite}
            fontSize="14px"
            onClick={() => router.push('/createGoods?type=1')}
            borderColor={ColorRed}
          />
          <CustomButton
            text="바우처형 상품 등록"
            bgColor={ColorRed}
            px="29px"
            py="11px"
            color={ColorWhite}
            fontSize="14px"
            onClick={() => router.push('/createGoods?type=2')}
            borderColor={ColorRed}
          />

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
            onClick={() => onClickExcel()}
          />
        </Flex>
      </Flex>
      <GoodsDataTable
        data={data}
        setOnSubmit={setOnSubmit}
        CheckList={CheckList}
        setCheckList={setCheckList}
        isLoading={isLoading}
      />
      {/* {data?.totalCount !== undefined && data?.totalCount !== 0 ? (
        <GoodsDataTable data={data} setOnSubmit={setOnSubmit} />
      ) : (
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

export default GoodsListComponet;
