'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {} from 'next/font/google';

export default function Home() {
  const router = useRouter();
  // useEffect(() => {
  //   if (sessionStorage.getItem('mt_id') == null) {
  //     router.replace('/login');
  //   }
  // }, []);
  useEffect(() => {
    router.push('/goodsSetting');
  }, []);
  return <main className={styles.main}></main>;
}
