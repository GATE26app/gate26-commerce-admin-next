// components/MapModal.tsx
import React, { useState } from 'react';

import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Text,
} from '@chakra-ui/react';

import CustomButton from '@/components/common/CustomButton';
import InputBox from '@/components/common/Input';

import styled from '@emotion/styled';
import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from '@react-google-maps/api';
import { ColorRed, ColorWhite } from '@/utils/_Palette';

interface MapModalProps extends Omit<ModalProps, 'children'> {
  onClose: () => void;
  onComplete: (location: { lat: string; lng: string; address: string }) => void;
}
const containerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 37.5,
  lng: 127,
};

const GoogleMapModal: React.FC<MapModalProps> = ({
  onClose,
  onComplete,
  ...props
}: MapModalProps) => {
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);

  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
    name: string;
  }>({ lat: 0, lng: 0, address: '', name: '' });

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  // const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
  //   useGoogle({
  //     apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  //   });

  // console.log('placePredictions', placePredictions);

  const handleComplete = () => {
    const newLoaction = {
      lat: String(location.lat),
      lng: String(location.lng),
      address: String(location.address),
      name: String(location.name),
    };
    onComplete(newLoaction);
    onClose();
  };
  const onLoad = (ref: google.maps.places.Autocomplete) => {
    setAutocomplete(ref);
  };
  const onPlaceChanged = () => {
    const place = autocomplete?.getPlace();
    if (place && place.geometry) {
      const lat = place.geometry.location?.lat() || 0;
      const lng = place.geometry.location?.lng() || 0;
      const address = place.formatted_address || '';
      const name = place.name || '';
      setLocation({ lat, lng, address, name });
    }
  };
  return (
    <ModalWrap>
      <ModalBox>
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
          libraries={['places']}
        >
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <InputBox
              // defaultValue={list[index].location}
              placeholder="주소를 입력해주세요."
              // disabled={goodsInfo.LogItemDisable}
              // onBlur={(e) => (list[index].location = e.target.value)}
              // onChange={(event) => {
              //   getPlacePredictions({ input: event.target.value });
              //   // setPlace(event.target.value);
              // }}
            />
          </Autocomplete>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location.lat !== 0 ? location : center}
            zoom={13}
          >
            {location.lat !== 0 && (
              <Marker position={{ lat: location.lat, lng: location.lng }} />
            )}
          </GoogleMap>
        </LoadScript>
        <Flex justifyContent={'center'} alignItems={'center'} mt={'20px'}>
          <CustomButton
            text="완료"
            borderColor={ColorRed}
            color={ColorWhite}
            px="31px"
            py="13px"
            bgColor={ColorRed}
            fontSize="15px"
            onClick={() => {
              handleComplete();
            }}
          />
        </Flex>
      </ModalBox>
    </ModalWrap>
  );
};

const ModalWrap = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalBox = styled('div')`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 700px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;
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
export default GoogleMapModal;
