/********import statement*************/

import React,{Component} from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {Drawer,CssBaseline,AppBar,Toolbar,List,Typography,Divider,IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


/*icons*/
import Result from '@material-ui/icons/PresentToAllOutlined';
import Add from '@material-ui/icons/AddBoxOutlined';
import Home from '@material-ui/icons/HomeOutlined';
import Group from '@material-ui/icons/GroupOutlined';
import Cloud from '@material-ui/icons/CloudUploadOutlined';
import File from '@material-ui/icons/FileCopyOutlined';

import { Link } from 'react-router-dom';


import '../../css/styles.css';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});


class AppDrawer extends Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
             	True-Vote
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          
          <List>
				
				
				
				
            <a href="/" className="Link">
              <ListItem button key="Account">
                <ListItemIcon><Home/></ListItemIcon>
                <ListItemText primary="Account" />
              </ListItem>
			</a>
				
		{this.props.valid?	(<a href="/addCandidate" className="Link">
              <ListItem button key="addCandidate">
                <ListItemIcon><Add/></ListItemIcon>  
                <ListItemText primary="Add Candidate" />
              </ListItem>
			</a>): null}
				
			<a href="/candidates" className="Link">
              <ListItem button key="Candidate">
                <ListItemIcon><Group/></ListItemIcon>  
                <ListItemText primary="List of candidates" />
              </ListItem>
			</a>
			
			<a href="/result" className="Link">
              <ListItem button key="Result">
                <ListItemIcon><Result/></ListItemIcon>  
                <ListItemText primary="Result" />
              </ListItem>
			</a>
							 
			<a href="/report" className="Link">
              <ListItem button key="Report">
                <ListItemIcon><File/></ListItemIcon>  
                <ListItemText primary="Report" />
              </ListItem>
			</a>
           
							 
			<a href="/files" className="Link">
              <ListItem button key="Files">
                <ListItemIcon><Cloud/></ListItemIcon>  
                <ListItemText primary="Files" />
              </ListItem>
			</a>
							 
							 
							 
          </List>
       
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Typography paragraph>
     		{this.props.children}
          </Typography>
        </main>
      </div>
    );
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AppDrawer);


		 
		 
		 

