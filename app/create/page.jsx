"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import pinata from '../key.json'
import { useTonConnectUI } from "@tonconnect/ui-react";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";
import { Sender, toNano, Address } from "@ton/core";
import {VideoNft} from '@/compileCode/videoNft'
import {TonConnectSender} from '../../hooks/TonConnectSender.ts'
function Create() {

    const [tonConnector] = useTonConnectUI();
    const [nftFile, setNFTFile] = useState();
    const [isMinting, setIsMinting] = useState(false);
    const [forminfo, setFormInfo] = useState({
        title: "",
        file: "",
        price: 0,
        owner: ""
    });

    useEffect(() => {
        document.title = "Create"
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "price") {
            if (value <= 0) return
        }
        setFormInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    const changeHandler = (event) => {
        const file = event.target.files[0];
        try {
            // console.log("file.type in changehandler: ", file.type);
        } catch (error) {
            console.log(error);
        }
        if (file.type.startsWith('video/')) {
            setNFTFile(file);
        } else {
            alert('Please select a video file.');
            return; // Prevent further processing if not audio/video
        }

    };

    const handleEvent = async (e) => {
        setIsMinting(true)
        e.preventDefault();
        // console.log(nftFile);
        // console.log(forminfo);

        toast.info("Uploading NFT file", {
            position: "top-center",
        })
        console.log("uploading nft file");

        const nftFileData = new FormData();
        nftFileData.append('file', nftFile);
        try {

            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: nftFileData,
                headers: {
                    pinata_api_key: pinata.API_Key,
                    pinata_secret_api_key: pinata.API_Secret,
                    "Content-Type": "multipart/form-data",
                },
            });

            // console.log(resFile.data);
            toast.success("NFT file uploaded!", {
                position: "top-center",
            })
            toast.info("Pinning metadata now", {
                position: "top-center",
            })

            const fileHash = `https://ipfs.io/ipfs/${resFile.data.IpfsHash}`;
            // let fileType;
            // let sender = new TonConnectSender(tonConnector.connector);
            console.log(tonConnector.account.address);
            
            const info = {
                name: forminfo.title,
                file: fileHash,
                price: forminfo.price,
                owner: tonConnector.account.address
            }
            console.log("info", info);

            async function pinJSONToPinata(info) {
                const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
                const headers = {
                    'Content-Type': 'application/json',
                    'pinata_api_key': pinata.API_Key,
                    'pinata_secret_api_key': pinata.API_Secret,
                };

                try {
                    const res = await axios.post(url, info, { headers });
                    const meta = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`
                    toast.success("Metadata pinned successfully!", {
                        position: "top-center",
                    })
                    toast.info("Minting NFT on the blockchain", {
                        position: "top-center",
                    })
                    // console.log(meta);
                    mintThenList(meta);
                } catch (error) {
                    console.error(error);
                }

            }
            pinJSONToPinata(info)


        } catch (error) {
            console.log(error);
        }
        setIsMinting(false)
    };


    const mintThenList = async (uri) => {
        // console.log(marketplace);
        const listingPrice = toNano(forminfo.price)

        toast.info("Confirm to Mint the NFT", {
            position: "top-center"
        })
        try {
            // console.log("inside try");
            //   console.log(Number(listingPrice));
            const endpoint = await getHttpEndpoint({
                network: "testnet",
            });
            const client = new TonClient({ endpoint });

            // Open the contract
            console.log("VideoNft", VideoNft);
            const contract = await VideoNft.fromInit();
            const VideoNftContract = client.open(contract);
            console.log("TonConnectSender", TonConnectSender);
            let sender = new TonConnectSender(tonConnector.connector);
            console.log("sender", sender);
            console.log("listingPrice", listingPrice);
            (await VideoNftContract.send(
                sender,
                {value: toNano("0.01")},
                // {value: listingPrice},
                {
                    $$type: "AddFileParams",
                    ipfsHash: uri,
                    price: listingPrice
                }
            ))

            // toast.info("Wait till transaction Confirms....", {
            //     position: "top-center"
            // })

            // await tx1.wait()
            toast.success("NFT added to marketplace successfully", { position: "top-center" })
        } catch (error) {
            toast.error("Error adding NFT to Marketplace")
            console.log(error);
        }

    }



    return (
        <div className='h-screen pt-24'>
            <div className="container-fluid mt-5 text-left">
                <div className="content mx-auto">

                    <form class="max-w-sm mx-auto">
                        <div className='max-w-lg mx-auto'>
                            <label class="block mb-2 text-sm font-medium text-white" for="nftfile">Upload NFT File</label>
                            <input onChange={changeHandler} name="nftfile" class="block w-full mb-4 h-8 text-m  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" accept="video/*" />
                        </div>


                        <div class="mb-4">
                            <label for="title" class="block mb-2 text-sm font-medium text-white">NFT Name</label>
                            <input onChange={handleChange} type="text" id="title" name='title' class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter NFT name" required />
                        </div>

                        <div class="mb-4">
                            <label for="price" class="block mb-2 text-sm font-medium text-white">NFT Price</label>
                            <input onChange={handleChange} type="number" id="price" name='price' value={forminfo.price} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="0.0001 XRP" />
                        </div>

                        <div className='text-center'>
                            <button onClick={handleEvent} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" disabled={isMinting}>
                                {isMinting ? "Minting..." : "Mint NFT"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create