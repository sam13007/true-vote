/********************import statements**********************/

import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import Voting from '../../build/contracts/Voting.json';
import AppDrawer from './components/AppDrawer';
import Account from './components/Account';
import Form from './components/Form';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route'
import {Typography} from '@material-ui/core'
import Candidates from './components/Candidates';
import ipfs from './ipfs'
import '../css/styles.css';
import Result from './components/Result';
import Report from './components/Report';
import Load from '../img/add.gif';
import Files from './components/Files';


class App extends React.Component{
	constructor(props) {
		super(props)
		this.state={
			
			account:'',
			owner:'',
			candidates: [],
			name:'',
			party:'',
			valid:false,
			voteCount:[],
			buffer:null,
			ipfsHash:'',
			winner:[],
			hasVoted:false,
			loading:false,
			loader:false,
			desc:'',
			files :[],
			votedload:false

		}
		
		if (typeof web3 != 'undefined'){
			this.web3Provider = web3.currentProvider
			
            console.log("metamask is injecting web3");
        }
		
		else {
            this.web3Provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/487c6e327d0347798c201f4b458113e9')
            console.log("localhost is injecting web3");
			
        }
		
		
		this.web3 = new Web3(this.web3Provider)
		this.election = TruffleContract(Voting)
    	this.election.setProvider(this.web3Provider)
		this.handleChange = this.handleChange.bind(this)
		this.handleVote=this.handleVote.bind(this)
		this.captureFile = this.captureFile.bind(this)
		this.file = this.file.bind(this)
		
	}
	
	
 componentDidMount(){
		this.web3.eth.getCoinbase((Error,account)=>{
			this.setState({account});
			
			console.log("account",this.state.account)
			
			if(this.state.account==null){
				
				this.setState({loading:true})
			}
			
			
			
			this.election.deployed().then((electionInstance)=>{
				this.electionInstance=electionInstance;
				
/***********get Owner function***************/
				console.log("instanceof",electionInstance);
				this.electionInstance.getOwner().then((owner)=>{
					this.setState({owner})
				}).then(()=>{
					
					
					
					
					
					if(this.state.owner == this.state.account){
						
						this.setState({valid:true})
					}
				})
				
/***********get candidate******************/				
				
				this.electionInstance.getNumOfCandidates().then((candidatesCount)=>{
					
					for (var i = 0; i < candidatesCount; i++){
						
						this.electionInstance.getCandidate(i).then((candidate)=>{
							
							const candidates = [...this.state.candidates]
							candidates.push({
								id:candidate[0],
								name:candidate[1],
								party:candidate[2],
								img:candidate[3],
								voteCount:candidate[4]
								
							})
							this.setState({ candidates: candidates })
						})	
					}
				})
				
/***********get Files*************/
				
				this.electionInstance.getNumOfFiles().then((FilesCount)=>{
					console.log("Count of files",FilesCount);
					for(var i=0;i<FilesCount;i++){
						this.electionInstance.getFile(i).then((file)=>{
							console.log("file in inst",file)
							const files = [...this.state.files]
							files.push({
								id:file[0],
								file:file[2],
								desc:file[1],
								author:file[3]
							})
							this.setState({files:files})
						})
					}
				})
				
/**********get winner************/	
				this.electionInstance.getWinner().then((winner)=>{
					console.log("winner name",winner[0])
					const winnerState=[]
					winnerState.push({
						name:winner[0],
						party:winner[1],
						img:winner[2],
						voteCount:winner[3]
					})
					
					this.setState({winner:winnerState})
				})
				
				this.electionInstance.hasVoted(this.state.account).then((hasVoted)=>{
					console.log("Voted",hasVoted);
					this.setState({hasVoted})
				})
				
				
				
				
				
			})
		})
		
				
	}
	
	handleChange(e){
		
		this.setState({
			[e.target.id]:e.target.value
		})
		this.handleSubmit = this.handleSubmit.bind(this)
	}


	handleSubmit(e){
		
		e.preventDefault()
		this.setState({loader:true})
		
		ipfs.files.add(this.state.buffer, (error, result) => {
      		if(error) {
        		console.error(error)
        		return
      		}
			console.log("hash",result[0].hash)
			this.setState({ipfsHash:result[0].hash})
			this.electionInstance.addCandidate(this.web3.utils.fromAscii(this.state.name),this.web3.utils.fromAscii(this.state.party),result[0].hash,{from: this.state.account}).then((r)=>{
				this.setState({loader:false})
				console.log("result",r)
				
			})	
      		
		})
					
	}
	
	handleVote(e,Cid){
		
		console.log("Cid",Cid)
		this.setState({votedload:true})
		this.electionInstance.vote(Cid,{from: this.state.account}).then((result)=>{
			this.setState({votedload:false})
			console.log("result",result)

		})				
	}
	
	captureFile(e){
		 event.preventDefault()
		
		
    	const file = event.target.files[0]
    	const reader = new window.FileReader()
    	reader.readAsArrayBuffer(file)
    	reader.onloadend = () => {
			this.setState({ buffer: Buffer(reader.result) })
			console.log('buffer', this.state.buffer)
			
    	}
	}
	
	file(e){
		e.preventDefault()
		this.setState({loader:true})
		ipfs.files.add(this.state.buffer,(error,result)=>{
			if(error){
				console.log("error in file",error);
				return
			}
			console.log("hash",result[0].hash)
			this.setState({ipfsHash:result[0].hash})
			this.electionInstance.addFile(this.state.desc,result[0].hash,{from: this.state.account}).then(result=>{
				console.log("files result ",result)
				this.setState({loader:false})
			})
		})
	}
	
	 render(){
	 	
       
		return (
			<BrowserRouter>
				<div>
					<AppDrawer valid={this.state.valid}>
						{this.state.loader?(
											<div id="content">
											<img src={Load} id="loading inner-content"/></div>
			
											):
						

						 (this.state.loading?
							(
								<div>
									<Typography variant="h6" gutterBottom textAlign="center">
										Please login into your metamask account
									</Typography>
								</div>
							):
		
		
							(
							<div>
								<Route exact path="/" component={()=><Account account={this.state.account}/>} /> 

								{this.state.valid?(
									<Route path="/addCandidate" render={()=><Form submit={this.handleSubmit} change={this.handleChange} captureFile={this.captureFile}/>} />
								):null}
						
							<Route path="/candidates" render={()=><Candidates candidate={this.state.candidates} Vote={this.handleVote} votedload={this.state.votedload} hasVoted={this.state.hasVoted}/>}/>
								
							<Route path="/report" render={()=><Report candidate={this.state.candidates}/>}/>
							
							<Route path="/files" render={()=><Files captureFile={this.captureFile} file={this.file} change={this.handleChange} files={this.state.files}/>}/>	
								
							<Route path="/result" render={()=><Result winner={this.state.winner}/>}/>
								
						</div>
						))
					}
						
						
					</AppDrawer>
				</div>
			</BrowserRouter>
		)
    }	
}

ReactDOM.render( <App / > ,document.querySelector('#root'))