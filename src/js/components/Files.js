import React,{Component} from 'react';
import {TextField} from '@material-ui/core';
import Cloud from '@material-ui/icons/CloudUploadOutlined';
import {Card,CardActionArea,CardActions,CardContent,CardMedia,Button,Typography} from '@material-ui/core';

class Files extends Component{
	render(){
		return(
			
			<React.Fragment>
			<div id="content">
			
			
			<form onSubmit={this.props.file} id="inner-content"  >
			
			< Typography variant = "title" gutterBottom >Add Files to share </Typography><br/>
			
			< TextField required id = "desc" label = "Description" margin = "normal"  onChange={this.props.change}/><br/><br/>
			
			<Button variant="extendedFab" component="label" color="primary"  ><Cloud/><input type="file" accept="*" style={{ display: "none" }} name = "img" onChange={this.props.captureFile} required/>
			</Button>  Upload <br/><br/>
			
			< Button variant = "contained" color = "primary" type = "submit"  > Add Files </Button>
			
			</form>
			</div>
			<br/>
			
			<div>
			
			{
				this.props.files.map((file)=>{
					console.log("file",file)
					return(
						
						<Card className="Card">
									 <CardActionArea>
										 
										<CardContent>
			
											  <Typography gutterBottom variant="p" component="p">
												Description: {file.desc}
											  </Typography>
						
											<Typography gutterBottom variant="p" component="p">
												Author: {file.author}
											  </Typography>
						
											
          									
	
        								</CardContent>
									</CardActionArea>
						
									<a href={"https://ipfs.io/ipfs/"+file.file} target="_blank" className="Link">< Button variant = "outlined" color = "primary" type = "submit" >Link</Button></a>
			
						
								</Card>
						
					)
				})
			
			}
			
			</div>
			</React.Fragment>
			)
	}
}

export default Files;