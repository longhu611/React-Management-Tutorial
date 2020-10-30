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
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { fade } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'

const styles = (theme) => ({
	root: {
		width: '100%',
		minWidth: 1080,
	},
	paper: {
		margin: '0 18px',
	},
	menu: {
		margin: '15px 0',
		display: 'flex',
		justifyContent: 'center',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
})

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			customers: '',
			completed: 0,
			searchKeyword: '',
		}
	}

	stateRefresh = () => {
		this.setState({
			customers: '',
			completed: 0,
			searchKeyword: '',
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

	handleValueChange = (e) => {
		let nextState = {}
		nextState[e.target.name] = e.target.value
		this.setState(nextState)
	}

	render() {
		const cellList = [
			'번호',
			'이미지',
			'이름',
			'생년월일',
			'성별',
			'직업',
			'설정',
		]
		const { classes } = this.props
		const { customers, completed } = this.state
		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="open drawer"
						>
							<MenuIcon />
						</IconButton>
						<Typography
							className={classes.title}
							variant="h6"
							noWrap
						>
							고객 관리 시스템
						</Typography>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="검색하기"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ 'aria-label': 'search' }}
								value={this.state.searchKeyword}
								name={'searchKeyword'}
								onChange={this.handleValueChange}
							/>
						</div>
					</Toolbar>
				</AppBar>
				<div className={classes.menu}>
					<CustomerAdd stateRefresh={this.stateRefresh} />
				</div>
				<Paper className={classes.paper}>
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
								customers
									.filter((c) =>
										c.name.includes(
											this.state.searchKeyword
										)
									)
									.map((c, index) => (
										<Customer
											key={index}
											customer={c}
											stateRefresh={this.stateRefresh}
										/>
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
			</div>
		)
	}
}

export default withStyles(styles)(App)
