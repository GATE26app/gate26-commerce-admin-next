import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import PreviewComponent from './PreviewComponent';
import DetailHeader from './DetailHeader';

interface ReportModal extends DrawerProps {
  data: any;
}
function PreviewDrawerComponent(props: Omit<ReportModal, 'children'>) {
  return (
    <>
      <Drawer placement="right" {...props} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DetailHeader />
          <DrawerBody>
            <PreviewComponent info={props.data} />
          </DrawerBody>
        </DrawerContent>
        {/* <DrawerBody></DrawerBody> */}
      </Drawer>
    </>
  );
}

export default PreviewDrawerComponent;
