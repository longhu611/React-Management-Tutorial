import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import CustomerDelete from './CustomerDelete'

class Customer extends React.Component {
	render() {
		const { customer } = this.props

		return (
			<TableRow>
				<TableCell>{customer.id}</TableCell>
				<TableCell>
					<img
						src={customer.image}
						alt="profile"
						width={64}
						height={64}
					/>
				</TableCell>
				<TableCell>{customer.name}</TableCell>
				<TableCell>{customer.birthday}</TableCell>
				<TableCell>{customer.gender}</TableCell>
				<TableCell>{customer.job}</TableCell>
				<TableCell>
					<CustomerDelete
						id={customer.id}
						stateRefresh={this.props.stateRefresh}
					/>
				</TableCell>
			</TableRow>
		)
	}
}

export default Customer
