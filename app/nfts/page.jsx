"use client"

import React, { useEffect, useState } from 'react'
import Cards from '@/components/Cards'
import PlayerCard from '@/components/PlayerCard';
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";
import {VideoNft} from '@/compileCode/videoNft.ts'
import { useTonConnectUI } from "@tonconnect/ui-react";


// import { toast } from 'react-toastify';

function NFTs({ setNFTitem }) {

  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [processing, setProcessing] = useState(false)
  const [tonConnector] = useTonConnectUI();

  const loadMarketplaceItems = async () => {
    // console.log("contract in nfts", marketplace);
    setLoading(true)
    const endpoint = await getHttpEndpoint({
      network: "testnet",
    });
    const client = new TonClient({ endpoint });
    const contract = await VideoNft.fromInit();
    const VideoNftContract = client.open(contract);
    const itemCount = Number(await VideoNftContract.getGetFileCount())
    console.log("count: " + itemCount);
    // let itemCount;

    const items = await VideoNftContract.getGetFiles();
    console.log("items: ", items);

    let itemsArray = Array.from(items).map(([key, value]) => ({
      ipfsHash: value.ipfsHash,
      price: Number(value.price),
      owner: value.owner.toString()
    }))
    console.log("itemsArray: ", itemsArray);

    let displayItems = [];
    // console.log("items: ", typeof(items));
    // console.log(itemCount);
    for (let i = 0; i < itemCount; i++) {
      const item = itemsArray[i]
      const uri = item.ipfsHash

      const response = await fetch(uri)
      const metadata = await response.json()
      displayItems.push(metadata)
      // displayItems.push(item)
    }
    setLoading(false)
    setItems(displayItems)
    // console.log("type: ", typeof (items));
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, [])

  let [currNft, setCurrNft] = useState(null);
  let [player, setPlayer] = useState(false);

  if (loading) {
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2 className='text-white font-bold pt-24 text-2xl text-center'>Loading...</h2>
      </main>
    )
  }

  return (
    <>
      <div className='flex flex-wrap gradient-bg-welcome   gap-10 justify-center pt-24 pb-5 px-16'>
        {player && (
          // <div className='flex flex-wrap gradient-bg-welcome   gap-10 justify-center pt-24 pb-5 px-16'>

          // </div>
          <div style={{
            width: '650px',
            height: 'auto',
            // backgroundColor: "#ddd",
            margin: '0 auto',
            display: 'block',
            // justifyContent:'center'
          }}>
            {/* <PlayerCard item={currNft} player={player}/> */}
            <div className='audio-outer'>
              <div className='audio-inner'>
                <PlayerCard item={currNft} player={player} setPlayer={setPlayer} setCurrNft={setCurrNft} currNft={currNft} />
              </div>
            </div>
          </div>
        )}
        {
          (items.length > 0 ?
            items.map((item, idx) => (
              <Cards 
                item={item} 
                currNft={currNft} 
                player={player} 
                setPlayer={setPlayer} 
                setCurrNft={setCurrNft} 
                idx={idx} 
                processing={processing} 
                setProcessing={setProcessing}
                tonConnector={tonConnector}
              />
            ))

            : (
              <main style={{ padding: "1rem 0" }}>
                <h2 className='text-white'>No listed assets</h2>
              </main>
            ))}
      </div>
    </>
  )
}

export default NFTs