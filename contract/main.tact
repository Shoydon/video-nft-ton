import "@stdlib/deploy";

struct VideoFile {
    owner: Address;
    ipfsHash: String;
    price: Int;
}

message AddFileParams {
    ipfsHash: String;
    price: Int;
}

message WatchVideoParams {
    id: Int;
}

contract VideoNft with Deployable {

    fileCount: Int = 0;
    videoFiles: map<Int, VideoFile>;

    init() {
        self.videoFiles = emptyMap();
    }

    // addFile
    receive(msg: AddFileParams) {
        let addr: Address = sender();
        let videoFile: VideoFile = VideoFile {
            owner: addr,
            ipfsHash: msg.ipfsHash,
            price: msg.price  
        };
        self.videoFiles.set(self.fileCount, videoFile);
        self.fileCount += 1;
    }

    // get files
    get fun getFiles(): map<Int, VideoFile> {
        return self.videoFiles;
    }

    // get filecount
    get fun getFileCount(): Int {
        return self.fileCount;
    }

    // watch video
    receive(msg: WatchVideoParams) {
        let ctx: Context = context();
        let amount: Int = context().value; // Amount of TON sent with the transaction
        dump(amount);
        require(msg.id >= 0 && msg.id < self.fileCount, "Invalid id");
        let videoFile: VideoFile = self.videoFiles.get(msg.id)!!;
        let owner: Address = videoFile.owner;
        let price: Int = videoFile.price;
        require(amount >= price, "Insufficient funds");
        // let price: Int = videoFile.price;
        send(SendParameters {
            to: owner,
            value: price,
            mode: SendPayGasSeparately
        })
    }
}
