import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '70%',
        marginTop: theme.spacing.unit * 3,
        // overflowX: 'auto',
        backgroundColor: 'transparent',
        borderColor:'transparent',
        margin: '0px auto',
        boxShadow: 'none'

    },
    table: {
        minWidth: 50,
        fontFamily: 'cursive',
        fontSize: '100%',
        fontWeight: 'bold',
        color:'yellow'

    },
    LetsTest:{
        display: 'table-cell',
        padding: '0',
        textAlign: 'left',
        borderBottom: '0px',
        verticalAlign: 'inherit',
        color:'yellow'
    },
});
let id = 0;
class SimpleTable extends Component{
    constructor(props){
        super(props);
        this.state ={
            rows:props.values
        }
    }


createData = (name, amount, color) => {
     id += 1;
    return { id, name, amount,color};
}

rowData = ()=>{
        if (this.state.rows === undefined || this.state.rows ===  null){
            return(<TableRow><TableCell/>
                             <TableCell/>
            </TableRow>)
        } else{
            return (this.state.rows.map(row => (
                <TableRow key={row.id}>
                    <TableCell component="th" scope="row" className = {classes.LetsTest}  style={{float:'left'}}>
                        {row.name}
                    </TableCell>
                    <TableCell align="right" className = {classes.LetsTest} style={{float:'right'}}>{row.betValue}</TableCell>
                </TableRow>
            )))

        }
}

// render() {
//
//
// }
    render(){
        const { classes } = this.props;
        const rows = [
            this.createData('StormTRX', 500, 'yellow'),
            this.createData('JoTRX', 1000, 'yellow'),
            this.createData('JessieTRX', 25,'yellow'),
        ];


    return (

        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableBody>
                    {/*{this.state.rows.map(row => (*/}
                        {/*<TableRow key={row.id}>*/}
                            {/*<TableCell component="th" scope="row" className = {classes.LetsTest}  style={{float:'left'}}>*/}
                                {/*{row.name}*/}
                            {/*</TableCell>*/}
                            {/*<TableCell align="right" className = {classes.LetsTest} style={{float:'right'}}>{row.betValue}</TableCell>*/}
                        {/*</TableRow>*/}
                    {/*))}*/}
                    {this.rowData}
                </TableBody>
            </Table>
        </Paper>
    );

}

}









// function SimpleTable(props) {
//     const { classes } = props;
//     {/*<style jsx global>{*/}
//         {/**/}
//     {/*}*/}
//     {/*</style>*/}
//     return (
//
//         <Paper className={classes.root}>
//             <Table className={classes.table}>
//                 <TableBody>
//                     {rows.map(row => (
//                         <TableRow key={row.id}>
//                             <TableCell component="th" scope="row" className = {classes.LetsTest}  style={{float:'left'}}>
//                                 {row.name}
//                             </TableCell>
//                             <TableCell align="right" className = {classes.LetsTest} style={{float:'right'}}>{row.amount}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </Paper>
//     );
// }

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);