import React,{Component} from 'react';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import Voting from '../../../build/contracts/Voting.json';

import {Card,CardActionArea,CardActions,CardContent,CardMedia,Button,Typography} from '@material-ui/core';


import Voted from '../../img/googlecheck.gif'

class Candidates extends Component{
	constructor(props){
		super(props)
		
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
			
			<React.Fragment>
				{
					console.log("object",this.props.candidate)}
			{
					this.props.candidate.map((candid)=>{
					console.log(candid)
						return(
							
							<React.Fragment>{this.props.votedload?(
							 		<div id="content">
										<img src={Voted} id="loading inner-content"/>
									</div>
							 
							 ):(
						<Card className="Card">
									 <CardActionArea>
										 <CardMedia
											component="img"
											alt="Contemplative Reptile"
											height="140"
											image={"https://ipfs.io/ipfs/"+candid.img}
												title="Contemplative Reptile"
											/>
										<CardContent>
			
											  <Typography gutterBottom variant="h5" component="h2">
												Candidate name: {this.web3.utils.toAscii(candid.name)}
											  </Typography>
          									<Typography component="p">
												Party: {this.web3.utils.toAscii(candid.party)}
          									</Typography>
	
        								</CardContent>
									</CardActionArea>
			
									 <CardActions>
										{
											!this.props.hasVoted?
											(
<Button size="small" color="primary" variant="contained" onClick={(e)=>this.props.Vote(e,candid.id.toNumber()) }> Vote </Button>	
											):null
										}

									
									  </CardActions>
									
								</Card>
						)
							}</React.Fragment>
								
							)
					
					})
				}
			</React.Fragment>
			
		
		)
	}
	
	
}
export default Candidates;




