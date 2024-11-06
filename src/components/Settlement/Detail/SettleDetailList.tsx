import { useGoodsStateZuInfo } from '@/_store/StateZuInfo';
import Pagination from '@/components/common/Pagination';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import SettleDetailDataTable from './SettleDetailDataTable';
interface Props {
  data: any;
  request: any;
  setRequest: React.Dispatch<React.SetStateAction<any>>;
}
function SettleDetailList({ request, setRequest, data }: Props) {
  const router = useRouter();
  const { setGoodsInfo } = useGoodsStateZuInfo((state) => state);

  const paginationProps = {
    currentPage: request.pageNo,
    limit: request.pageSize,
    total: data?.totalCount,
    onPageNumberClicked: (page: number) => handleChangeInput('page', page),
    onPreviousPageClicked: (page: number) => handleChangeInput('page', page),
    onNextPageClicked: (page: number) => handleChangeInput('page', page),
  };

  function handleChangeInput(key: string, value: string | number, id?: string) {
    const newRequest = { ...request, [key]: value };

    //10개씩 보기, 20개씩 보기, 50개씩 보기, 100개씩 보기 클릭 시 0으로 초기화
    if (key === 'limit') {
      newRequest.pageNo = 0;
    } else if (key === 'page') {
      newRequest.pageNo = Number(value);
      router.push(`/settlementDetail?page=${Number(value) + 1}`);
      // setSettleFilterInfo({
      //   ...settleFilterInfo,
      //   pageNo: Number(value),
      // });
    }

    //페이지가 0보다 작은 경우 0으로 세팅
    if (newRequest.pageNo < 0) {
      newRequest.pageNo = 0;
    }

    setGoodsInfo({
      goodState: true,
    });
    setRequest(newRequest);
  }
  return (
    <Flex flexDirection={'column'}>
      <SettleDetailDataTable data={data.items} />
      {/* {data?.totalCount !== undefined &&
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
        )} */}
    </Flex>
  );
}

export default SettleDetailList;
