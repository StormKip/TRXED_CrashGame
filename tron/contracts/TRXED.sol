pragma solidity ^0.4.20;
contract TRXED {
    uint public lastBlock;
    uint winningNum;
    address[] accounts;
    mapping(string => uint) luckyNum;
    mapping(address => uint) balances;
    address[] twoMultiplyer;
    address[] threeMultiplyer;
    address[] fiveMultiplyer;
    address[] fiftyMultiplyer;
    address[] allBets;

    struct betType{
        uint betChosen;
        uint256 value;
    }
    mapping (uint => bool) twoMultiplyerValue;
    mapping (uint => bool) threeMultiplyerValue;
    mapping (uint => bool) fiveMultiplyerValue;
    mapping (uint => bool) fiftyMultiplyerValue;
    mapping(address => betType[]) userBets;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event RandResult(uint256 value, string color);

    constructor()public{ //Runs only at creation
        for (uint i = 1;i<52;i++){
            if(i % 2 ==0){
                twoMultiplyerValue[i] = true;
            }
        }

        fiftyMultiplyerValue[0] =true;
        fiftyMultiplyerValue[52] =true;
        for ( i = 1;i<52;i+=10){
            fiveMultiplyerValue[i] = true;
        }
        for ( i = 7;i<52;i+=10){
            fiveMultiplyerValue[i] = true;
        }
        for (i = 1;i<52;i++){
            if(!((twoMultiplyerValue[i]==true) || (fiveMultiplyerValue[i]==true) || (fiftyMultiplyerValue[i]==true))){
                threeMultiplyerValue[i] =true;
            }

        }


        lastBlock = block.number;
    }

    function PlaceBet(uint256 _betAmount,uint _betChosen) public payable{
        require(msg.value == _betAmount);
        betType memory placeBet = betType({
            betChosen: _betChosen,
            value: _betAmount
            });
        if(_betChosen == 2){
            twoMultiplyer.push(msg.sender);

        } else if(_betChosen == 3){
            threeMultiplyer.push(msg.sender);

        } else if(_betChosen == 5){
            fiveMultiplyer.push(msg.sender);

        } else if(_betChosen == 50){
            fiftyMultiplyer.push(msg.sender);

        }
        allBets.push(msg.sender);
        userBets[msg.sender].push(placeBet);

    }
    //3000000000000000000
    function _generateRandNum()private returns (uint){
        uint randomnumber = uint(sha256(abi.encodePacked(now, msg.sender, lastBlock))) % 76;
        lastBlock++;
        if(randomnumber >52){
            lastBlock++;
            uint randomnumber2 = uint(sha256(abi.encodePacked(now, msg.sender, lastBlock))) % 76;

            if(randomnumber2>52){
                if(randomnumber>randomnumber2){
                    randomnumber = randomnumber - randomnumber2;
                } else{
                    randomnumber = randomnumber2 - randomnumber;
                }
                return(randomnumber);
            } else{
                return(randomnumber2);
            }
        }

        return(randomnumber);
    }

    function generateRandNum() public returns(uint, string){
        winningNum = _generateRandNum();
        string memory color;
        if(twoMultiplyerValue[winningNum]){
            color = "Grey";
        }else if(threeMultiplyerValue[winningNum]){
            color = "Red";
        } else if(fiveMultiplyerValue[winningNum]){
            color = "Blue";
        }else if(fiftyMultiplyerValue[winningNum]){
            color = "Gold";
        }
        return (winningNum, color) ;
    }

    function payWinners() public returns (uint){
        uint i;
        uint j;
        if (twoMultiplyerValue[winningNum]){
            for( i = 0; i<twoMultiplyer.length;i++){
                for(  j = 0;j<userBets[twoMultiplyer[i]].length;j++){
                    if(userBets[twoMultiplyer[i]][j].betChosen == 2){
                        twoMultiplyer[i].transfer((userBets[twoMultiplyer[i]][j].value*2));
                    }
                }
            }
        } else if (threeMultiplyerValue[winningNum]){
            for( i = 0; i<threeMultiplyer.length;i++){
                for(  j = 0;j<userBets[threeMultiplyer[i]].length;j++){
                    if(userBets[threeMultiplyer[i]][j].betChosen == 3){
                        threeMultiplyer[i].transfer((userBets[threeMultiplyer[i]][j].value*3));
                    }
                }
            }
        }else if (fiveMultiplyerValue[winningNum]){
            for( i = 0; i<fiveMultiplyer.length;i++){
                for(  j = 0;j<userBets[fiveMultiplyer[i]].length;j++){
                    if(userBets[fiveMultiplyer[i]][j].betChosen == 5){
                        fiveMultiplyer[i].transfer((userBets[fiveMultiplyer[i]][j].value*5));
                    }
                }
            }
        }else if (fiftyMultiplyerValue[winningNum]){
            for( i = 0; i<fiftyMultiplyer.length;i++){
                for(  j = 0;j<userBets[fiftyMultiplyer[i]].length;j++){
                    if(userBets[fiftyMultiplyer[i]][j].betChosen == 50){
                        fiftyMultiplyer[i].transfer((userBets[fiftyMultiplyer[i]][j].value*50));
                    }
                }
            }
        }
        delete userBets[msg.sender];
        for(i = 0; i <allBets.length;i++){
            delete userBets[allBets[i]];
        }
        delete twoMultiplyer;
        delete threeMultiplyer;
        delete fiveMultiplyer;
        delete fiftyMultiplyer;

        return winningNum;
    }

    function paySmartContract() public payable{
        require(msg.value>0);
    }

    function returnContractBalance () public view returns(uint256){
        return  address(this).balance;
    }


}