import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { ethers } from "ethers";
const app = express();

const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "verifyString",
    outputs: [
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

dotenv.config();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.get("/", async (req, res) => {
  const data = {
    name: "Irfan Ullah",
    email: "irfanullahatozi@gmail.com",
  };
  const provider = new ethers.providers.JsonRpcProvider(
    "https://goerli.infura.io/v3/66a2b7adce3843779d53110e9b32d536"
  );
  const privateKey = process.env.PRIVATEKEY;
  const wallet = new ethers.Wallet(privateKey, provider);
  const signedhash = await wallet.signMessage(ethers.utils.toUtf8Bytes(data));

  const sigcomponents = ethers.utils.splitSignature(signedhash);

  const contract = new ethers.Contract(
    process.env.CONTRACTADDRESS,
    abi,
    provider
  );

  const addresss = await contract.verifyString(
    data,
    sigcomponents.v,
    sigcomponents.r,
    sigcomponents.s
  );

  // console.log(addresss);

  // const tut = ethers.utils.verifyMessage("irfan", signedhash);
  // console.log(tut);
  // console.log(sigcomponents);
  // console.log("publickey", wallet.address);
  // console.log("signedhash", signedhash);

  if (addresss === wallet.address) {
    return res.send("Signature is matched");
  } else {
    return res.send("Signature is not matched");
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Running on Port: http://localhost:${PORT}`);
});
