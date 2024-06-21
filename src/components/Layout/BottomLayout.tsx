import { usePathname } from 'next/navigation';

import Footer from '@/components/common/Footer/Footer';
import { Box, Flex } from '@chakra-ui/react';
import { ColorGray50 } from '@/utils/_Palette';

export default function BottomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex
      minH={'100vh'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      bgColor={ColorGray50}
    >
      {children}
      <Footer />
    </Flex>
  );
}
