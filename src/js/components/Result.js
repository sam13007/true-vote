import React,{Component} from 'react';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import Voting from '../../../build/contracts/Voting.json';

class Result extends Component{
	constructor(props){
		super(props);
		this.state={
			max:null,
		}
		if (typeof web3 != 'undefined'){
			this.web3Provider = web3.currentProvider
            console.log("metamask is injecting web3");
        }
		
		else {
            this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
            console.log("localhost is injecting web3");
        }
		
		this.web3 = new Web3(this.web3Provider)
		
	}
	
	
	


	
	render(){
		return(
			<div>
				{
					this.props.winner.map((winner)=>{
						return(
					<React.Fragment>
							<h3>name:{this.web3.utils.toAscii(winner.name)}</h3>
							<h3>party:{this.web3.utils.toAscii(winner.party)}</h3>
							<img src={"https://ipfs.io/ipfs/"+winner.img} style={{height:"300px",width:"500px"}}/>
					</React.Fragment>
				
						)
					})
				}
			</div>
		)
	}
}

export default Result;