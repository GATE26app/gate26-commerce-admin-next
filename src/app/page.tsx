'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {} from 'next/font/google';
import { useUserZuInfo } from '@/_store/UserZuInfo';
import { getToken } from '@/utils/localStorage/token';

export default function Home() {
  const router = useRouter();
  const { userZuInfo } = useUserZuInfo((state) => state);

  useEffect(() => {
    if (
      getToken().access == '' ||
      getToken().access == undefined ||
      getToken().access == null
    ) {
      router.replace('/login');
    } else {
      router.push('/goodsSetting');
    }
  }, [getToken()]);
  return <main className={styles.main}></main>;
}
