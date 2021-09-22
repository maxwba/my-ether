import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Title, Main, Logo, Input, CardComponent, Text } from './style'

import Web3 from 'web3'

export default function Home() {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [addressError, setAddressError] = useState(false);

  const url = process.env.NEXT_PUBLIC_MAINNET_URL;
  const web3 = new Web3(url);
  // const address = '0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c';
  useEffect(() => {
    if (address) {
      console.log(address)
      try {
        web3.eth.getBalance(address, (err, balance) => {
          if (err) {
            console.log(err);
            return setAddress(null)
          }
          const result: any = web3.utils.fromWei(balance, 'ether');
          setBalance(result);
        });
      } catch (error) {
        setAddressError(true)
        setAddress(null)
      }
    }
    if (address === '') {
      setAddressError(false);
    }
    return () => {
      setBalance(null);
      setAddress(null);
    }
  }, [address])

  return (
    <div>
      <Head>
        <title>ETH Account Balance Check</title>
        <link rel="icon" href="/Ethereum-icon-purple.svg" />
      </Head>

      <Main>
        <CardComponent
          sx={{ minWidth: 275 }}
        >
          <Logo src="/Ethereum-icon-purple.svg" alt="The future" />
          <Title>
            Welcome to ETH Account Balance Check
          </Title>
          <Input id="outlined-basic" label="Ethereum account" variant="outlined" error={addressError} onChange={(event: any) => setAddress(event.target.value)} />
          <Text>{balance} Ether</Text>
        </CardComponent>
      </Main>
    </div>
  )
}
