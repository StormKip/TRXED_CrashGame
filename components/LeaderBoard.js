import React from 'react';

const styles={
    tableContainer:{},
    table:{},
    tableHover:{},
    tableStriped:{}

}


function LeaderBoard() {
     return(
         <div className="table-container">
             <style jsx global>{`
      table {
  background-color: @table-bg;
}

    `}</style>
            <h3> Global Leaderboard </h3>
            <table className="table table-striped table-hover ">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Player Name</th>
                    <th>Wagered</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>StormTRX</td>
                    <td>1500 TRX</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>JessieTRX</td>
                    <td>1400 TRX</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>BobbyTRX</td>
                    <td>1250 TRX</td>
                </tr>

                </tbody>
            </table>
        </div>
     )

}

export default LeaderBoard;