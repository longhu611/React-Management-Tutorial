import React from 'react'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
	table: {
		marginTop: theme.spacing(5),
		minWidth: 1080,
	},
	progress: {
		margin: theme.spacing(5),
	},
})

class Customer extends React.Component {
	state = {
		customers: [],
		completed: 0,
	}

	componentDidMount() {
		this.timer = setInterval(this.progress, 20)
		this.callApi()
			.then((res) => this.setState({ customers: res }))
			.catch((err) => console.log)
	}

	callApi = async () => {
		const response = await fetch('/api/customers')
		const body = await response.json()
		return body
	}

	progress = () => {
		const { completed } = this.state
		this.setState(
			{ completed: completed >= 100 ? 0 : completed + 1 },
			() => {
				if (completed >= 100) {
					clearInterval(this.timer)
				}
			}
		)
	}

	render() {
		const { classes } = this.props
		const { customers, completed } = this.state

		return (
			<Paper>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>번호</TableCell>
							<TableCell>이름</TableCell>
							<TableCell>성별</TableCell>
							<TableCell>생년월일</TableCell>
							<TableCell>직업</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{customers.length ? (
							customers.map((c) => (
								<TableRow key={c.id}>
									<TableCell>{c.id}</TableCell>
									<TableCell>{c.name}</TableCell>
									<TableCell>{c.sex}</TableCell>
									<TableCell>{c.birth}</TableCell>
									<TableCell>{c.job}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan="6" align="center">
									<CircularProgress
										className={classes.progress}
										variant="determinate"
										value={completed}
									/>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</Paper>
		)
	}
}

export default withStyles(styles)(Customer)
