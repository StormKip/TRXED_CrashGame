import React, {Component} from 'react';
import * as Colors from 'material-ui/styles/colors';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme  from '@material-ui/core/styles/createMuiTheme';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography'
import TrxIcon from '../components/TrxIcon';
import CarIcon from '../components/CarIcon';
import FistIcon from '../components/FistIcon';
import FacebookIcon from '../components/FacebookSVG';
import TwitterIcon from '../components/TwitterSVG';
import TelegramIcon from '../components/TelegramSVG';
import KenoIcon from '../components/KenoIcon';
const muiTheme = createMuiTheme ({
    palette: {
        textColor: Colors.darkBlack,
        primary1Color: Colors.white,
        primary2Color: Colors.yellow50,
        accent1Color: Colors.redA200,
        pickerHeaderColor: Colors.darkBlack,
        alternateTextColor: Colors.redA200
    },
    appBar: {
        height: 60,
    },
    typography: {
        useNextVariants: true,
    },
});

export default (props) =>{
    return(
        <MuiThemeProvider theme={muiTheme}>
            <AppBar position='fixed' style={{ backgroundColor: 'rgba(43, 31, 31, 0.54)', display: 'inline-block'}}>
                <CarIcon/>
                <FistIcon/>
                <KenoIcon/>
                <Typography  color="inherit" style={{fontFamily: 'serif', display: 'inline-block' ,marginLeft:50}} >
                    <img src={"../static/images/trx.png"}/>
                    <TrxIcon width={40} fill={Colors.yellow50}/></Typography>
                <Typography variant="h6" color="inherit" style={{fontFamily: 'serif', display: 'inline-block' ,marginLeft:150, width: 340}} >
                    Contract Balance = {Math.round(props.contractValue/1000000)} TRX</Typography>
                <TelegramIcon/>
                <TwitterIcon/>
                <FacebookIcon/>

            </AppBar>
            {props.children}
        </MuiThemeProvider>
    );
};