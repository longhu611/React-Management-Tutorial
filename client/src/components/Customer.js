import React from "react"
import Table from "@material-ui/core/Table"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import Paper from "@material-ui/core/Paper"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
    table: {
        marginTop: theme.spacing.unit * 10,
        minWidth: 1080
    }
})

class Customer extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <Paper>
             <Table className={classes.table}>
                 <TableHead>
                 <TableRow>
                     <TableCell>
                         이름
                     </TableCell>
                     <TableCell>
                         성별
                     </TableCell>
                     <TableCell>
                         생년월일
                     </TableCell>
                     <TableCell>
                         직업
                     </TableCell>
                 </TableRow>
                 </TableHead>
                 <TableBody>
                 <TableRow>
                     <TableCell>
                         홍길동
                     </TableCell>
                     <TableCell>
                         남
                     </TableCell>
                     <TableCell>
                         19900116
                     </TableCell>
                     <TableCell>
                         학생
                     </TableCell>
                 </TableRow>
                 </TableBody>
            </Table>
            </Paper>
        )
    }
}

export default withStyles(styles)(Customer);