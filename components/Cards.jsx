import React from 'react'

import { TonConnectSender } from '../hooks/TonConnectSender';
import { toast } from 'react-toastify'
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai"
import { FaRegShareSquare } from "react-icons/fa";

import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";
import { VideoNft } from '@/compileCode/videoNft';
import { toNano } from "@ton/core";

function Cards({ item, player, setPlayer, setCurrNft, idx, processing, setProcessing, tonConnector }) {

  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  // console.log(processing);
  const handleLike = () => {
    if (disliked) {
      setDisliked(false);
    }
    setLiked(!liked);
  }
  const handleDislike = () => {
    if (liked) {
      setLiked(false);
    }
    setDisliked(!disliked);
  }

  // console.log(processing);

  async function handlePayment(item) {
    setProcessing(true);
    console.log(item.id);
    try {
      const endpoint = await getHttpEndpoint({
        network: "testnet",
      });
      const client = new TonClient({ endpoint });

      const contract = await VideoNft.fromInit();
      const VideoNftContract = client.open(contract);
      
      let sender = new TonConnectSender(tonConnector.connector);
      
      await VideoNftContract.send(
        sender,
        {value: toNano(item.price.toString())},
        {
          $$type: "WatchVideoParams",
          id: BigInt(idx),
        }
      );

      toast.success("Transaction successful!", { position: "top-center" });
      setPlayer(true);
      setCurrNft(item);

    } catch (error) {
      console.error(error);
      toast.error("Transaction failed!", { position: "top-center" });
    }
    setProcessing(false);
  }

  return (
    <div className='card-div'>
      <div className='card-inner p-2'>
        {/* <img src={item.image} alt="" className='object-cover w-[230px] h-[230px] rounded overflow-hidden' /> */}
        <video
          className="card-img-top"
          alt="NFT"
          src={item.file}
          controls={false}
          autoPlay={false}
          style={{ height: "auto", width: "230px" }}
        >
        </video>
        <div className='flex flex-col justify-center items-center'>
          <h3 className='text-white text-2xl font-thin mt-3'>{item.name}</h3>
          <h4 className='text-white text-2xl font-thin mt-3'>Price: <span className='text-green-400'><strong>{item.price} </strong></span> TON</h4>
          <div className='flex text-white justify-between items-center mb-3 gap-4 mt-3'>
            {!player &&
              <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded text-sm px-5 py-1.5 text-center me-2 " disabled={processing} onClick={() => { handlePayment(item) }}>Watch Video</button>
            }
          </div>
          <div className='flex justify-center items-center gap-4 mt-2'>
            <button
              type="button"
              className={`flex items-center gap-2 text-white ${liked ? "bg-green-500" : " border border-green-500"} font-medium rounded text-sm px-4 py-1.5 text-center`}
              onClick={() => handleLike(item)}
            >
              <AiOutlineLike />
            </button>
            <button
              type="button"
              className={`flex items-center gap-2 text-white ${disliked ? "bg-red-500" : "border border-red-500"} font-medium rounded text-sm px-4 py-1.5 text-center`}
              onClick={() => handleDislike(item)}
            >
              <AiOutlineDislike />
            </button>
            <button
              type="button"
              className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-4 py-1.5 text-center"
              onClick={() => {
                navigator.clipboard.writeText("https://video-nft-ton.netlify.app/")
                  .then(() => {
                    toast.success("Link copied to clipboard!", {
                      position: "top-center"
                    }); // Optional: Notify the user
                  })
                  .catch(err => {
                    console.error("Failed to copy: ", err); // Handle error
                  });
              }}
            >
              <FaRegShareSquare /> Share
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cards