import React, {Component} from 'react';
import {Grid,Divider} from "@material-ui/core";
import MainGrid from '../components/MainGrid';
import DownArrowSVG from '../components/DownArrowSVG'
import People from '@material-ui/icons/People';
import AppBarCustom from "../components/AppBarCustom";
import TrxIcon from '../components/TrxIcon';
import Typography from "@material-ui/core/Typography";
import BetAmountField from '../components/BetAmountField';
import socketIOClient from "socket.io-client";
import Utils from '../utils/index';
import AnimatedNumber from "animated-number-react";

const styles = {
    Paper: {padding:20, marginTop: 10, marginBottom:10, marginLeft:10},
    GridCon: { height:'52vh', width: '100%'},
    imgStyle:{display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            width:160,
            height:160
}
};


const FOUNDATION_ADDRESS = 'TLYw2bgCDqHrMFVAcv6GnYMXPwfwcbhxLs';

const socket = socketIOClient("http://192.168.0.138:4001");
const dimStyle = {
    width: '100%',
    pointerEvents: 'none',
    filter: 'brightness(50%)',
    transition: '0.3s'
};
const normStyle = {
    width: '100%',
    transition: '0.3s'
}
const contractAddress = 'TRkUGYSyKp2NUsHGZUvSEWTc63Atbv8i7G';
const constColor = 'rgb(152, 152, 152)';
const winColor = 'lime';
const looseColor = '#ff5d5d';

let balanceBefore;
let balacnceAfter;
let didPlay;
class Index extends Component{

    constructor(props) {
        super(props);
        this.state= {
            buttonStyle:normStyle,
            betAmount: '',
                whiteArrow:0,
                redArrow:0,
                blueArrow:0,
                yellowArrow: 0,
                arrowColor1: 'lime',
                arrowColor2: 'lime',
                arrowColor3: 'lime',
                arrowColor4: 'lime',
                arrayData:[0,0,0,0],
                response: false,
                endpoint: "http://127.0.0.1:4001",
                functionRun:false,
                randWinner: '',
                payWinners: false,
            tronwebaddress:'',
            tronWeb: {
                installed: false,
                loggedIn: false,
                trxBalance: 0,
                contractValue:0,
                balanceColor:constColor
            }
        };
        this.ArrowCallback = this.ArrowCallback.bind(this);
        this.PlaceBet = this.PlaceBet.bind(this);
    }

    async componentDidMount() {
        //TRONLINK TRX
        //-------------------------------------------------------------------------------------------------------------

        let TRX_BAL = 0;
        this.setState({loading:true})
        await new Promise(resolve => {
            const tronWebState = {
                installed: !!window.tronWeb,
                loggedIn: window.tronWeb && window.tronWeb.ready
            };

            if(tronWebState.installed) {
                this.setState({
                    tronWeb:
                    tronWebState
                });

                return resolve();
            }

            let tries = 0;

            const timer = setInterval(() => {
                if(tries >= 10) {
                    const TRONGRID_API = "https://api.shasta.trongrid.io";

                    window.tronWeb =  TronWeb(
                        TRONGRID_API,
                        TRONGRID_API,
                        TRONGRID_API
                    );

                    this.setState({
                        tronWeb: {
                            installed: false,
                            loggedIn: false
                        }
                    });

                    clearInterval(timer);
                    return resolve();
                }

                tronWebState.installed = !!window.tronWeb;
                tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

                if(!tronWebState.installed)
                    return tries++;

                this.setState({
                    tronWeb: tronWebState
                });

                resolve();
            }, 100);
        });

        if(!this.state.tronWeb.loggedIn) {
            // Set default address (foundation address) used for contract calls
            // Directly overwrites the address object as TronLink disabled the
            // function call
            window.tronWeb.defaultAddress = {
                hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
                base58: FOUNDATION_ADDRESS
            };

            window.tronWeb.on('addressChanged', async() => {
                const tmp_tronwebaddress = Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString())
                await this.setState({tronwebaddress : tmp_tronwebaddress});

                // console.log("tmp_tronwebaddress", tmp_tronwebaddress);
                TRX_BAL =await Utils.tronWeb.trx.getBalance(tmp_tronwebaddress);
                await this.setState({trxBalance: TRX_BAL});
                if(this.state.tronWeb.loggedIn)
                    return;

                this.setState({
                    tronWeb: {
                        installed: true,
                        loggedIn: true
                    }
                });
            });
        }

        await Utils.setTronWeb(window.tronWeb, contractAddress);
        const tmp_tronwebaddress = Utils.tronWeb.address.fromHex(((await Utils.tronWeb.trx.getAccount()).address).toString())
        await this.setState({tronwebaddress : tmp_tronwebaddress});

        console.log("tmp_tronwebaddress", tmp_tronwebaddress);
//  --------------------------------------------------------------------------------------------------------------------
        TRX_BAL =await Utils.tronWeb.trx.getBalance(tmp_tronwebaddress);
        await this.setState({trxBalance: TRX_BAL});
        console.log(TRX_BAL);

        let CONTRACT_BAL = await tronWeb.trx.getBalance("TRkUGYSyKp2NUsHGZUvSEWTc63Atbv8i7G");
        await this.setState({contractValue: CONTRACT_BAL});
        console.log(CONTRACT_BAL);

        // const { endpoint } = this.state;
        // const socket = socketIOClient(endpoint);
        socket.on("FromAPI", (data,dim) =>{
            this.setState({ response: data });

            if(dim === true){
                this.setState({buttonStyle : normStyle});
                this.setState({balanceColor: constColor});
            }
             if (this.state.response=== true ){
                 this.setState({response: "Lets Race!"})
                 this.setState({buttonStyle : dimStyle});
             }
        });

        // socket.on("GotNums", data => this.setState({ arrayData: data }));
        // socket.on("FromAPI", (data) => {console.log(data)})
        socket.on("GotNums", (data,bool) => {
            this.setState({ arrayData: data, functionRun: bool });
            console.log(data, bool)
             if(bool){
                this.ArrowCallback(socket);
             }
        });
        socket.on('Reset',  async () => {
            // TRX_BAL = Utils.tronWeb.trx.getBalance(tmp_tronwebaddress);
            // this.setState({trxBalance: TRX_BAL});
            console.log('reset')
            TRX_BAL =await Utils.tronWeb.trx.getBalance(tmp_tronwebaddress);
            console.log(balanceBefore)
            console.log(TRX_BAL);
            if(didPlay){
                if(balanceBefore> TRX_BAL){
                    this.setState({balanceColor: looseColor});
                } else{
                    this.setState({balanceColor:winColor });
                }
            }
            await this.setState({trxBalance: TRX_BAL});
            CONTRACT_BAL = await tronWeb.trx.getBalance("TRkUGYSyKp2NUsHGZUvSEWTc63Atbv8i7G");
            await this.setState({contractValue: CONTRACT_BAL});
            console.log(CONTRACT_BAL)
            this.setState({response: "Preparing"});
            balanceBefore=0;
             balacnceAfter=0;
             didPlay=false;
            clearInterval(this.intervalW);clearInterval(this.intervalR);clearInterval(this.intervalB);clearInterval(this.intervalY);
            this.setState({arrowColor1:'lime',arrowColor2:'lime',arrowColor3:'lime',arrowColor4:'lime'});
            this.setState({whiteArrow:0,redArrow:0,blueArrow:0,yellowArrow:0});
        })



    }

    randNum(socket){
        // let newArray=[];
        // const min = 30;
        // const max = 267;
        // let randWinner;
        // console.log(this.state.randWinner);
        // if(this.state.randWinner === "Grey"){
        //     randWinner = 1;
        // }else if (this.state.randWinner === "Red"){
        //     randWinner = 2;
        // }else if (this.state.randWinner === "Blue"){
        //     randWinner = 3;
        // } else if (this.state.randWinner === "Gold"){
        //     randWinner = 4;
        // }
        //
        // if(randWinner === 1){
        //     newArray[0]=267;
        //     newArray[1]=min + Math.random() * (max - min);
        //     newArray[2]=min + Math.random() * (max - min);
        //     newArray[3]=min + Math.random() * (max - min);
        // } else if (randWinner === 2){
        //     newArray[0]=min + Math.random() * (max - min);
        //     newArray[1]=267;
        //     newArray[2]=min + Math.random() * (max - min);
        //     newArray[3]=min + Math.random() * (max - min);
        // }else if (randWinner === 3){
        //     newArray[0]=min + Math.random() * (max - min);
        //     newArray[1]=min + Math.random() * (max - min);
        //     newArray[2]=267;
        //     newArray[3]=min + Math.random() * (max - min);
        // }else if (randWinner === 4){
        //     newArray[0]=min + Math.random() * (max - min);
        //     newArray[1]=min + Math.random() * (max - min);
        //     newArray[2]=min + Math.random() * (max - min);
        //     newArray[3]=267;
        // }


        //this.setState({arrayData:newArray});
        this.intervalW = setInterval(() =>this.tickWhite(this.state.whiteArrow, 265,'whiteArrow', socket),50);
        this.intervalR = setInterval(() =>this.tickRed(this.state.redArrow, 115,'redArrow', socket),50);
        this.intervalB = setInterval(() =>this.tickBlue(this.state.blueArrow, 180,'blueArrow', socket),50);
        this.intervalY = setInterval(() =>this.tickYellow(this.state.yellowArrow, 245,'yellowArrow', socket),50)
    }

    tickWhite(arrow,data,name, socket){
     if (this.state.arrayData[0]>arrow){
         this.setState({[name]:arrow+2});
     }else{
         if(this.state.arrayData[0] !== 267){
            this.setState({arrowColor1:'#ff5d5d'})
         }
         if(this.state.arrayData[0] === 267){

                 socket.emit('done')
                 this.setState({payWinners: false})
                 console.log('done done')

             console.log("done")
         }
         clearInterval(this.intervalW);

     }
    }
    tickRed(arrow,data,name, socket){
        if (this.state.arrayData[1]>arrow){
            this.setState({[name]:arrow+2});
        }else{
            if(this.state.arrayData[1] !== 267){
                this.setState({arrowColor2:'#ff5d5d'})
            }
            if(this.state.arrayData[1] === 267){

                    socket.emit('done')
                    this.setState({payWinners: false})
                    console.log('done done')


                console.log("done")
            }
            clearInterval(this.intervalR);

        }
    }
    tickBlue(arrow,data,name, socket){
        if (this.state.arrayData[2]>arrow){
            this.setState({[name]:arrow+2});
        }else{
            if(this.state.arrayData[2] !== 267){
                this.setState({arrowColor3:'#ff5d5d'})
            }
            if(this.state.arrayData[2] === 267){
                    socket.emit('done')
                    this.setState({payWinners: false})
                    console.log('done done')


                console.log("done")
            }
            clearInterval(this.intervalB);

        }
    }
    tickYellow(arrow,data,name, socket){
        if (this.state.arrayData[3]>arrow){
            this.setState({[name]:arrow+2});

        }else{
            if(this.state.arrayData[3] !== 267){
                this.setState({arrowColor4:'#ff5d5d'})
            }
            if(this.state.arrayData[3] === 267){
                    socket.emit('done')
                    this.setState({payWinners: false})
                    console.log('done done')


                console.log("done")
            }
            clearInterval(this.intervalY);

        }
    }

    ArrowCallback(socket){
        this.setState({arrowColor1:'lime',arrowColor2:'lime',arrowColor3:'lime',arrowColor4:'lime'});
        clearInterval(this.intervalW);
        clearInterval(this.intervalR);
        clearInterval(this.intervalB);
        clearInterval(this.intervalY);
        this.setState({whiteArrow:0,redArrow:0,blueArrow:0,yellowArrow:0});
        this.randNum(socket);
        this.setState({functionRun: false})
    }
    handleOnChange = event => {
        console.log(event.target.value);
        let value = event.target.value;
        this.setState({betAmount: value })
    };

    async PlaceBet(value){
        try {
            balanceBefore = this.state.trxBalance;
            didPlay = true;
            await Utils.contract.PlaceBet(this.state.betAmount * 1000000,value).send({
                shouldPollResponse:true,
                callValue:this.state.betAmount * 1000000
            }).then(res => {console.log("Bet Complete")});
        }catch (e) {
            didPlay = false;
            console.log("Error while placing BET")
        }

        //this.setState({buttonStyle : normStyle});
    }
    formatValue = value => `${Number(value/1000000).toFixed(2)} TRX`
    render(){
        const { response } = this.state;

        return(
            <AppBarCustom contractValue = {this.state.contractValue}>

                <style jsx global>{`
      body{
        background-image: url('../static/images/back.jpeg')
      }
    `}</style>

                <div style={{height:'calc(100vh - 70px)',  paddingTop: '3.89%', width:'71%', margin: '0 auto'}}>
                    <Grid  container style={styles.GridCon}>
                        <Grid item style={{width:'25%' }}>
                            <div style={{
                                backgroundImage:"url('../static/images/road.png')",
                                margin:'0 auto',
                                height: '100%',
                                width: '100%',
                                backgroundSize:     'contain',
                                backgroundRepeat:   'no-repeat',
                                backgroundPosition: 'center center'

                            }}>
                                <DownArrowSVG arrowSize={this.state.whiteArrow} arrowColor={this.state.arrowColor1} style={{margin:'0 auto'}}/>
                                <div><img src={'../static/images/WhiteCar.png'} style={styles.imgStyle} /></div>
                            </div>
                        </Grid>
                        <Grid item style={{width:'25%'}}>
                            <div style={{
                                backgroundImage:"url('../static/images/road.png')",
                                margin:'0 auto',
                                height: '100%',
                                width: '100%',
                                backgroundSize:     'contain',
                                backgroundRepeat:   'no-repeat',
                                backgroundPosition: 'center center'

                            }}><DownArrowSVG arrowSize={this.state.redArrow} arrowColor={this.state.arrowColor2}/>
                                <img src={'../static/images/RedCar.png'} style={styles.imgStyle} />
                            </div>

                        </Grid>
                        <Grid item style={{width:'25%'}}>
                            <div style={{
                                backgroundImage:"url('../static/images/road.png')",
                                margin:'0 auto',
                                height: '100%',
                                width: '100%',
                                backgroundSize:     'contain',
                                backgroundRepeat:   'no-repeat',
                                backgroundPosition: 'center center'

                            }}><DownArrowSVG arrowSize={this.state.blueArrow} arrowColor={this.state.arrowColor3}/>
                                <img src={'../static/images/BlueCar.png'} style={styles.imgStyle} />
                            </div>
                        </Grid>
                        <Grid item style={{width:'25%'}}>
                            <div style={{
                                backgroundImage:"url('../static/images/road.png')",
                                margin:'0 auto',
                                height: '100%',
                                width: '100%',
                                backgroundSize:     'contain',
                                backgroundRepeat:   'no-repeat',
                                backgroundPosition: 'center center'

                            }}><DownArrowSVG arrowSize={this.state.yellowArrow} arrowColor={this.state.arrowColor4}/>
                                <img src={'../static/images/YellowCar.png'} style={styles.imgStyle}/>
                            </div>
                        </Grid>
                    </Grid>
                    <div style={{height:'100px', marginTop:'1%'}}>
                        <Typography style={{color:this.state.balanceColor ,fontSize:25}}>
                            <TrxIcon width={25}/>
                            <AnimatedNumber
                                value={this.state.trxBalance}
                                formatValue={this.formatValue}
                                duration={200}
                            />

                        </Typography>
                        <BetAmountField onChange = {this.handleOnChange}/>
                        <div style={{ float:'right', width: 700   ,  fontFamily: 'serif',
                            fontSize: 'x-large',
                            color: 'aquamarine'}}>
                        {response
                            ? <h3 >
                                {response}
                            </h3>
                            : <p>Loading...</p>}
                    </div>
                    </div>
                    <Grid style={this.state.buttonStyle} container >
                        <Grid item style={{width:'25%', margin:'0 auto' }}>
                            <MainGrid mainColor={'white'} value={'2'} callbackFromParent={this.PlaceBet}
                            />
                            <People nativeColor= {'white'} style={{marginLeft:'16%', fontSize:'150%'}}/>
                            <Divider style={{ height: '2.62%',
                                width: '71.13%',
                                margin: '0 auto',
                                backgroundColor:'white',
                                marginLeft: '15.29%'}
                            }/>
                        </Grid>
                        <Grid item style={{width:'25%', margin:'0 auto' }}>
                            <MainGrid mainColor={'#ff5d5d'} value={'3'} callbackFromParent={this.PlaceBet}
                            />
                            <People nativeColor= {'#ff5d5d'} style={{marginLeft:'16%', fontSize:'150%'}} />
                            <Divider style={{ height: '2.62%',
                                width: '71.13%',
                                margin: '0 auto',
                                backgroundColor:'#ff5d5d',
                                marginLeft: '15.29%'}
                            }/>
                        </Grid>
                        <Grid item style={{width:'25%',margin:'0 auto' }}>
                            <MainGrid mainColor={'#9b9bf3'} value={'5'} callbackFromParent={this.PlaceBet}
                            />
                            <People nativeColor= {'#9b9bf3'} style={{marginLeft:'16%', fontSize:'150%'}} />
                            <Divider style={{ height: '2.62%',
                                width: '71.13%',
                                margin: '0 auto',
                                backgroundColor:'#9b9bf3',
                                marginLeft: '15.29%'}
                            }/>
                        </Grid>
                        <Grid item style={{width:'25%' ,margin:'0 auto' }}>
                            <MainGrid mainColor={'yellow'} value={'50'} callbackFromParent={this.PlaceBet}
                            />
                            <People nativeColor= {'yellow'} style={{marginLeft:'16%', fontSize:'150%'}} />
                            <Divider style={{ height: '2.62%',
                                width: '71.13%',
                                margin: '0 auto',
                                backgroundColor:'yellow',
                                marginLeft: '15.29%'}
                            }/>
                        </Grid>
                    </Grid>
                </div>

            </AppBarCustom>


        )
    }
}


export default Index;

