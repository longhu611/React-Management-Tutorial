import React from 'react'
import Customer from './components/Customer'
import CustomerAdd from './components/CustomerAdd'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = (theme) => ({})

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			customers: '',
			completed: 0,
		}
	}

	stateRefresh = () => {
		this.setState({
			customers: '',
			completed: 0,
		})
		this.callApi()
			.then((res) => this.setState({ customers: res }))
			.catch((err) => console.log(err))
	}

	componentDidMount() {
		this.timer = setInterval(this.progress, 20)
		this.callApi()
			.then((res) => this.setState({ customers: res }))
			.catch((err) => console.log(err))
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
		const cellList = ['번호', '이미지', '이름', '생년월일', '성별', '직업']
		// const { classes } = this.props
		const { customers, completed } = this.state
		return (
			<div>
				<Paper>
					<Table>
						<TableHead>
							<TableRow>
								{cellList.map((c, index) => (
									<TableCell key={index}>{c}</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{customers ? (
								customers.map((c, index) => (
									<Customer key={index} customer={c} />
								))
							) : (
								<TableRow>
									<TableCell colSpan="6" align="center">
										<CircularProgress
											variant="determinate"
											value={completed}
										/>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</Paper>
				<CustomerAdd stateRefresh={this.stateRefresh} />
			</div>
		)
	}
}

export default withStyles(styles)(App)
