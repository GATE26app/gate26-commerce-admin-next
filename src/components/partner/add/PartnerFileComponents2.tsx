import Image from 'next/image';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Box, CircularProgress, Flex, Text, useToast } from '@chakra-ui/react';
import {
  ColorBlack,
  ColorGray50,
  ColorGray400,
  ColorGray700,
  ColorInputBorder,
  ColorBlue,
  ColorRequireRed,
} from '@/utils/_Palette';
import axios from 'axios';
import { filePath, imgPath } from '@/utils/format';

import { EntriesResType } from '@/app/apis/entries/EntriesApi.type';
import { usePostEntriesImageMutation } from '@/app/apis/entries/EntriesApi.mutation';
import {
  usePostPartnersFileMutation,
  usePostPartnersImageMutation,
} from '@/app/apis/partners/PartnersApi.mutation';
import {
  FileListType,
  ImageListType,
} from '@/app/apis/partners/PartnersApi.type';
import { getToken } from '@/utils/localStorage/token/index';

interface Props {
  EntriesData: Array<FileListType>;
  setEntriesData: React.Dispatch<React.SetStateAction<Array<ImageListType>>>;
  idx?: number;
}

function PartnerFileComponent2({
  EntriesData,
  setEntriesData,
  idx = 0,
}: Props) {
  const toast = useToast();
  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/Page/no_data.png';
  };

  useEffect(() => {
    if (EntriesData?.length > 0 && EntriesData[0] !== undefined) {
      imgAxios();
    }
  }, [EntriesData]);

  const imgAxios = async () => {
    const res = await axios.get(
      filePath() + EntriesData[0].thumbnailImagePath,
      {
        responseType: 'blob',
        headers: {
          'X-AUTH-TOKEN': `${getToken().access}`,
        },
      },
    );
    const imageURL = window.URL.createObjectURL(res.data);
    document.getElementById('target-img-3').src = imageURL;
  };

  // 파일 다운
  const downloadFile = async () => {
    const url = filePath() + EntriesData[0].filePath; // 파일을 다운로드할 URL

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/octet-stream',
          'X-AUTH-TOKEN': `${getToken().access}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;

      const contentDisposition = response.headers.get('Content-Disposition');
      let fileName = '첨부파일';

      if (contentDisposition && contentDisposition.includes('filename=')) {
        fileName = contentDisposition
          .split('filename=')[1]
          .split(';')[0]
          .replace(/"/g, '');
      }

      a.download = decodeURIComponent(fileName); // 다운로드할 파일의 이름

      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  const { mutate: ItemFileMutate, isLoading } = usePostPartnersFileMutation({
    options: {
      onSuccess: (resImg) => {
        if (resImg.success == true) {
          handleImageSave(
            resImg.data?.filePath,
            resImg.data?.thumbnailImagePath,
          );
        } else {
          console.log('error 코드 생성 에러', resImg.code);
        }
      },
      onError: (res) => {
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

  const handleImageSave = (filePath: string, thumbnailImagePath: string) => {
    const obj = {
      type: 3,
      filePath: filePath,
      thumbnailImagePath: thumbnailImagePath,
    };
    setEntriesData([obj]);
  };

  const handleUploadImage = (e: any) => {
    //이미지 미리보기 기능
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      ItemFileMutate(formData);
    };
  };

  const onDeleteImg = () => {
    setEntriesData([]);
  };

  return (
    <Flex flexDirection={'column'} position={'relative'}>
      {EntriesData?.length > 0 &&
        EntriesData !== undefined &&
        EntriesData[0] !== undefined && (
          <>
            <Flex
              position={'absolute'}
              top={'10px'}
              right={'10px'}
              onClick={() => onDeleteImg()}
            >
              <Image
                src={'/images/Page/icon_delete_img.png'}
                alt="이미지 삭제"
                width={32}
                height={32}
              />
            </Flex>
          </>
        )}
      {isLoading ? (
        <Flex
          w={'182px'}
          h={'182px'}
          borderWidth={1}
          borderStyle={'dashed'}
          borderColor={ColorInputBorder}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius={'10px'}
          overflow={'hidden'}
        >
          <CircularProgress isIndeterminate color={ColorBlue} />
        </Flex>
      ) : (
        <>
          {EntriesData?.length > 0 &&
          EntriesData !== undefined &&
          EntriesData[0] !== undefined ? (
            <>
              <Flex
                w={'182px'}
                h={'182px'}
                borderWidth={1}
                borderStyle={'dashed'}
                borderColor={ColorInputBorder}
                justifyContent={'center'}
                alignItems={'center'}
                borderRadius={'10px'}
                overflow={'hidden'}
              >
                <img
                  // src={`${imgPath()}${EntriesData[idx-1]?.thumbnailImagePath}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                  id={'target-img-3'}
                  alt="이미지 업로드"
                  onClick={() => downloadFile()}
                  onError={addDefaultImg}
                />
              </Flex>
            </>
          ) : (
            <label htmlFor="file3">
              <Flex
                w={182}
                h={182}
                borderWidth={1}
                borderStyle={'dashed'}
                borderColor={ColorInputBorder}
                justifyContent={'center'}
                alignItems={'center'}
                borderRadius={'10px'}
              >
                <Image
                  src={'/images/Page/ico_plus.png'}
                  width={28}
                  height={28}
                  alt="이미지 추가"
                />
              </Flex>
            </label>
          )}
        </>
      )}
      <input
        type="file"
        id="file3"
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
          * 1300px*1300px 사이즈
        </Text>
        <Text color={ColorGray700} fontSize={'14px'} fontWeight={400}>
          * 이미지는 1장 등록 가능 합니다.
        </Text>
      </Box>
    </Flex>
  );
}

export default PartnerFileComponent2;
