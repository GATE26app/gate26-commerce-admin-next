//내역 params
export type SettlementListParamsType = {
    pageNo: number;
    pageSize: number;
    searchType?: string;
    searchKeyword?: string;
    fromDate?: string;
    toDate?: string;
    status?: null | number | any;
    settlementIds?: Array<string>;
};

export type SettlementUnListParamsType = {
    pageNo: number;
    pageSize: number;
    partnerId: string;
};
export type SettleListDtoType = {
    code: string;
    count: number;
    data: SettleListResType;
    success: boolean;
};

export type SettleUnListDtoType = {
    code: string;
    count: number;
    data: SettleUnListResType;
    success: boolean;
};

export type SettleUnListResType = {
    orderAmount: number;
    paymentAmount: number;
    serviceChargeAmount: number;
    paymentChargeAmount: number;
    discountChargeAmount: number;
    discountSettlementAmount: number;
    settlementAmount: number;
    count: number;
    totalCount: number;
    pageCount: number;
    pageNo: number;
    pageSize: number;
    items: Array<SettleUnListItemDtoType>;
};

//
export type SettleUnListItemDtoType = {
    type: number;
    typeName: string;
    payMethod: string;
    payMethodName: string;
    orderId: string;
    metchantUid: string;
    impUid: string;
    pgTid: string;
    orderAmount: number;
    paymentAmount: number;
    serviceChargePercent: number;
    serviceChargeAmount: number;
    paymentChargePercent: number;
    paymentChargeAmount: number;
    discountChargeAmount: number;
    discountSettlementAmount: number;
    settlementAmount: number;
};

// 정산내역 리스트
export type SettleListResType = {
    count: number;
    totalCount: number;
    pageCount: number;
    pageNo: number;
    pageSize: number;
    settlements: Array<SettleListItemType>;
};

export type SettleListItemType = {
    settlementId: number;
    settlementNumber: string;
    year: number;
    month: number;
    status: number;
    statusName: string;
    partner: {
        partnerId: string;
        title: string;
        businessRegistrationNumber: null | string;
    };
    orderAmount: number;
    paymentAmount: number;
    serviceChargeAmount: number;
    paymentChargeAmount: number;
    discountChargeAmount: number;
    discountSettlementAmount: number;
    settlementAmount: number;
    actualSettlementAmount: number;
    fromDate: string;
    toDate: string;
    settlementDate: null | string;
    processId: null | string | number;
    bank: null | string;
    accountNumber: null | string | number;
    accountHolder: null | string | number;
    adminMemo: null | string;
    createdId: null | string | number;
    createDate: null | string;
    modifiedId: null | string | number;
    modifiedDate: null | string;
};

export type SettleDetailItemType = {
    settlementId: number;
    settlementNumber: string;
    year: number;
    month: number;
    status: number;
    statusName: string;
    partner: {
        partnerId: string;
        title: string;
        businessRegistrationNumber: null | string;
        bank: null | string;
        accountNumber: null | string;
        accountHolder: null | string;
    };
    orderAmount: number;
    paymentAmount: number;
    serviceChargeAmount: number;
    paymentChargeAmount: number;
    discountChargeAmount: number;
    discountSettlementAmount: number;
    settlementAmount: number;
    actualSettlementAmount: number;
    fromDate: string;
    toDate: string;
    settlementDate: null | string;
    processId: null | string | number;
    bank: null | string;
    accountNumber: null | string | number;
    accountHolder: null | string | number;
    adminMemo: null | string;
    createdId: null | string | number;
    createDate: null | string;
    modifiedId: null | string | number;
    modifiedDate: null | string;
    items: Array<SettleItemDtoType>;
};

export type SettleItemDtoType = {
    itemId: number;
    type: number;
    typeName: string;
    payMethod: string;
    payMethodName: string;
    orderId: string;
    merchantUid: string;
    impUid: string;
    pgTid: string;
    orderAmount: number;
    paymentAmount: number;
    serviceChargeAmount: number;
    paymentChargeAmount: number;
    discountChargeAmount: number;
    discountSettlementAmount: number;
    settlementAmount: number;
    serviceChargePercent: number;
    paymentChargePercent: number;
    adminMemo: string;
    title: string;
};

//리뷰상세 request type
export type SettleDetailDtoType = {
    code: string;
    count: number;
    data: SettleDetailItemType;
    success: boolean;
    message: string;
};

export type SettlementDetailParamsType = {
    settleId: number;
    searchKeyword?: string;
};

//주문 메모
export type SettleMemoParamsType = {
    settlementId: string;
    body: {
        adminMemo: string;
    };
};
export type SettleMemoResType = {
    code: string;
    message: string;
    count: number;
    success: boolean;
};

export type SettleEctParamsType = {
    settlementId: number;
    title: string;
    amount: number;
};

export type SettleUnsetParamsType = {
    pageNo: number;
};

export type SettleEtcRemoveType = {
    settleId: number;
    itemId: number;
};
export type SettleEtcEditType = {
    settleId: number;
    itemId: number;
    title: string;
    amount: number;
};
