import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Title, Main, Logo, Input, CardComponent, Text, Ballance } from '../../styles/home/style'
const axios = require('axios').default;

import Web3 from 'web3'

export default function Home() {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [dollarBalance, setDollarBalance] = useState(null);
  const [addressError, setAddressError] = useState(false);

  const url = process.env.NEXT_PUBLIC_MAINNET_URL;
  const web3 = new Web3(url);

  useEffect(() => {
    if (address) {
      try {
        web3.eth.getBalance(address, (err, balance) => {
          if (err) {
            console.log(err);
            return setAddress(null)
          }
          const result: any = web3.utils.fromWei(balance, 'ether');
          // Get current dollar/Eth value
          axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
            .then((response) => {
              // Create our number formatter.
              const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              });
              // handle success
              setDollarBalance(formatter.format(response.data.USD * result));
              setBalance(result);
            })
            .catch(function (error) {
              console.log(error);
              setAddressError(true);
            })
        });
      } catch (error) {
        setAddressError(true);
        setAddress(null);
      }
    }
    if (address === '') {
      setAddressError(false);
      setDollarBalance(null);
    }
    return () => {
      setBalance(null);
      setDollarBalance(null);
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
            ETH Account Balance Check
          </Title>
          <Input id="outlined-basic" label="Ethereum address" variant="outlined" error={addressError} onChange={(event: any) => setAddress(event.target.value)} />
          <Ballance>
            <Text>{balance ? `ETH ${balance}` : ''}</Text>
            <Text>{dollarBalance}</Text>
          </Ballance>
        </CardComponent>
      </Main>
    </div>
  )
}
