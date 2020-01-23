import React,{ Component } from "react";
import './main.css';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Dialog,DialogActions,DialogTitle  } from "@material-ui/core";
import firebase from './firebase'
class Employee extends Component{
    constructor(props){
        super(props)
        this.state={
            dialog:false,
            description:'',
            subject:'',
            a:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
            day:0,
            color:'white'
        }
    }
    componentDidMount(){
        const db=firebase.firestore();
        db.collection('request').get().then(
            (query)=>{
                let a=[],b=''
                query.forEach(
                    (doc)=>{
                        if(doc.data().name===this.props.location.state)
                        a=a.concat(doc.data().day);
                    }
                )
                this.setState({arr:a})
                console.log(a)
            }
        )
    }
    changeSubject=(event)=>{
        this.setState({subject:event.target.value})
    }
    changeDescription=(event)=>{
        this.setState({description:event.target.value})
    }
    click=(i,j)=>{
        this.setState({dialog:true,day:i*5+j+1})
    }
    clickSubmit=()=>{
        this.setState({dialog:false});
        const db=firebase.firestore();
        if(this.state.description!=='' && this.state.subject!=='')
        {db.collection('request').add({admin:false,subject:this.state.subject,description:this.state.description,name:this.props.location.state,day:this.state.day,pending:true,accepted:false})
        }
    }
    render(){
        
        const dashboard=(
            <div style={{marginLeft:'40%'}}>
                <h1>Calendar</h1>
                {Array(6).fill(null).map(
                        (item,i)=><p className='sq1'>{
                            Array(5).fill(null).map(
                            (item,j)=><button className='sq2' onClick={()=>this.click(i,j)}>{this.state.a[i*5+j]}</button>
                        )
                        }</p>
                        
                    )}
            </div>
        )
        return(
            <div >
                <div>
                    <Drawer anchor="left" variant="permanent" >
                        <List>
                            <ListItem button onClick={this.dashboard}><p>Dashboard</p></ListItem>
                            <Divider/>
                        </List>
                    </Drawer>
                </div>
                {
                    dashboard
                }
                {
                    <Dialog style={{padding:'50px'}} open={this.state.dialog} >
                        <div className='subbox'>
                        <p>Subject :&nbsp; </p>
                        <input style={{height:'30px',alignSelf:'center'}} type='text' onChange={this.changeSubject} />
                    </div>
                    <div >
                        <p>Description :&nbsp; </p>
                        <textarea onChange={this.changeDescription} style={{height:'300px',alignSelf:'center',width:'500px'}} type='password'/>
                    </div>
                    <div className='subbox'>
                        <button style={{width:'70px',height:'30px',justifyContent:'center'}} onClick={this.clickSubmit}>Submit</button>
                    </div>
                    </Dialog>
                }
            </div>
        )
    }
}
export default Employee;