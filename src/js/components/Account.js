import React,{Component} from 'react';

class Account extends Component{
	render(){
		return(
		<div>
			<h3>Logged in account:{this.props.account}</h3>
		</div>
		)
	}
}
export default Account;