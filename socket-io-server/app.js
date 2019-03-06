const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);
const contractAdd = 'TRkUGYSyKp2NUsHGZUvSEWTc63Atbv8i7G';
const TronWeb = require("tronweb") ;
const Utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb, contractAddress) {
        console.log('contractAddress', contractAddress)
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(contractAddress)
    },

};
/*  TRXED:
    (base58) TRkUGYSyKp2NUsHGZUvSEWTc63Atbv8i7G
    (hex) 41ad195969012e704db0485e5e69683773af86b7a9
*/


let timer = 10;
let randColor ;
let randNumber;
let newArray= [];
const min = 30;
const max = 267;
let availJoin;
let num;
let timerInterval;
let readyClient = 0
const TRONGRID_API = "https://api.shasta.trongrid.io";


//  function getNum(){
//     io.sockets.emit('FromAPI', 'Preparing')
//     return Utils.contract.generateRandNum().send({
//         shouldPollResponse: true,
//         callValue:0
//     })
// }
async function getNum(){
    const min = 30;
    const max = 267;

    await await Utils.contract.generateRandNum().send({
        shouldPollResponse: true,
        callValue:0
    }).then(res => {
        randColor = res[1].toString();
        console.log(randColor);
        if(randColor === "Grey"){
            randNumber = 1;
        }else if (randColor === "Red"){
            randNumber = 2;
        }else if (randColor === "Blue"){
            randNumber = 3;
        } else if (randColor === "Gold"){
            randNumber = 4;
        }

        if(randNumber === 1){
            newArray[0]=267;
            newArray[1]=min + Math.random() * (max - min);
            newArray[2]=min + Math.random() * (max - min);
            newArray[3]=min + Math.random() * (max - min);
        } else if (randNumber === 2){
            newArray[0]=min + Math.random() * (max - min);
            newArray[1]=267;
            newArray[2]=min + Math.random() * (max - min);
            newArray[3]=min + Math.random() * (max - min);
        }else if (randNumber === 3){
            newArray[0]=min + Math.random() * (max - min);
            newArray[1]=min + Math.random() * (max - min);
            newArray[2]=267;
            newArray[3]=min + Math.random() * (max - min);
        }else if (randNumber === 4){
            newArray[0]=min + Math.random() * (max - min);
            newArray[1]=min + Math.random() * (max - min);
            newArray[2]=min + Math.random() * (max - min);
            newArray[3]=267;
        }
    })
}
async function payWinners(){
    await Utils.contract.payWinners().send({
        shouldPollResponse:true,
        callValue:0
    }).then(res =>{
        console.log(res)
    } )
}
async function start(){
    availJoin = false
    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider(TRONGRID_API); // Full node http endpoint
    const solidityNode = new HttpProvider(TRONGRID_API); // Solidity node http endpoint
    const eventServer = new HttpProvider(TRONGRID_API); // Contract events http endpoint
    const privateKey = '0bed40c9021ded4ac8ab1e42b36aa203df2fa0738b6da6afe6efdee5f57978be';
    const tronWeb = new TronWeb(
        fullNode,
        solidityNode,
        eventServer,
        privateKey
    );

    await Utils.setTronWeb(tronWeb, contractAdd).then(() => {
        getNum().then(async () => {
            timerInterval = setInterval(
                async() => {
                    await timerGo()
                },20);
        });
    });
    io.on("connection", socket => {
        console.log("connection")
        socket.on('done', async() => {
            console.log(readyClient)
            readyClient++;
            if(readyClient === 1){
                await payWinners().then(() =>{
                    io.sockets.emit('Reset');
                    getNum().then(() =>{
                        timer = 10
                        timerInterval = setInterval(
                            async() => {
                                await timerGo()
                            },20);
                    });
                })


            }
        })
    })

    //.then(res =>(console.log(res)));



    //  io.on("connection",async socket => {
    //
    //
    //
    //
    //
    //
    //
    //      let luckyNum = await getLuckyNum();
    //     await luckyNum.then((result) => {
    //         console.log(result);
    //
    //     });
    //
    //     console.log('connected')
    //     const timerT =  setInterval(
    //         () =>
    //              timerGo(socket),
    //         10
    //     );
    //     socket.on("Go",()=> { LetsDoIt(socket)});
    //
    //        io.emit('broadcast', newArray,true)});
    //     Utils.tronWeb.getEventResult(contractAdd, {
    //         eventName:'RandResult',
    //         page: 2
    //     }).then(result => {
    //         socket.emit("FromAPI", result);
    //     })
    //     socket.on("disconnect", () => console.log("Client disconnected"));
    // });
}

const timerStopTronGo = async () => {
    clearInterval(timerInterval);
    io.sockets.emit('GotNums', newArray, true);

    // socket.on("done", () => {
    //     timer = 10;
    //     timerInterval = setInterval(
    //         async() => {
    //             await timerGo()
    //         },20);
    // })
    //console.log(num);

};

const timerGo =  async() => {

    try {

        if  (timer === 0 || timer < 0) {
            io.sockets.emit('FromAPI',true);
            timerStopTronGo();


        }

        else {
            readyClient = 0
            timer = timer - 0.01;
            console.log(timer.toFixed(2))
            io.sockets.emit('FromAPI', timer.toFixed(2),true)

        }
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};
const LetsGo = async() => {

    await Utils.contract.generateRandNum().send({
        shouldPollResponse: true,
        callValue:0
    }).then(res=>{
        // let complete = res[0].toNumber() + ' '+res[1].toString();
        randColor = res[1].toString();
        if(randColor === "Grey"){
            randNumber = 1;
        }else if (randColor === "Red"){
            randNumber = 2;
        }else if (randColor === "Blue"){
            randNumber = 3;
        } else if (randColor === "Gold"){
            randNumber = 4;
        }

        if(randNumber === 1){
            newArray[0]=267;
            newArray[1]=min + Math.random() * (max - min);
            newArray[2]=min + Math.random() * (max - min);
            newArray[3]=min + Math.random() * (max - min);
        } else if (randNumber === 2){
            newArray[0]=min + Math.random() * (max - min);
            newArray[1]=267;
            newArray[2]=min + Math.random() * (max - min);
            newArray[3]=min + Math.random() * (max - min);
        }else if (randNumber === 3){
            newArray[0]=min + Math.random() * (max - min);
            newArray[1]=min + Math.random() * (max - min);
            newArray[2]=267;
            newArray[3]=min + Math.random() * (max - min);
        }else if (randNumber === 4){
            newArray[0]=min + Math.random() * (max - min);
            newArray[1]=min + Math.random() * (max - min);
            newArray[2]=min + Math.random() * (max - min);
            newArray[3]=267;
        }

        //socket.emit("LuckyWinner", newArray, true);

    }).catch(err =>{
        console.log(err)
    });

}

start();
server.listen(port,'0.0.0.0', () => console.log(`Listening on port ${port}`));

