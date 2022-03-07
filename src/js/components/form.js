import React,{Component} from 'react';
import {Typography,TextField,Button } from '@material-ui/core';
import Cloud from '@material-ui/icons/CloudUploadOutlined';

class Form extends Component{
	
	
	render(){
		return(
		
			
			<div id="content">
			
				<form onSubmit={this.props.submit} id="inner-content">
			
					< Typography variant = "title" gutterBottom >Add Candidate </Typography>
			
					< TextField required id = "name" label = "Name" margin = "normal"  onChange={this.props.change}/><br/>
			
					< TextField required id = "party" label = "Party" margin = "normal"  onChange={this.props.change}/><br/><br/>
			
					<Button variant="extendedFab" component="label" color="primary"  ><Cloud/><input type="file" accept="image/*" style={{ display: "none" }} name = "img" onChange={this.props.captureFile} required/></Button>  Upload<br/><br/>
			
			
					< Button variant = "contained" color = "primary" type = "submit"  > Add Candidate </Button><br/>
				</form>
			</div>
			
		
			
		)
	}
}

export default Form;
