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
import {  } from "@material-ui/core/List";
import firebase from './firebase'
class Admin extends Component{
    constructor(props){
        super(props)
        this.state={
            default:true,
            name:'',
            pass:'',
            arr:[]
        }
    }
    componentDidMount(){
        const db=firebase.firestore();
        db.collection('request').get().then(
            (query)=>{
                let a=[],b=''
                query.forEach(
                    (doc)=>{
                        a=a.concat(doc);
                    }
                )
                this.setState({arr:a})
                console.log(a)
            }
        )
    }
    create=()=>{
        this.setState({default:false})
    }
    request=()=>{
        this.setState({default:true})
    }
    changeName=(event)=>{
        this.setState({name:event.target.value})
    }
    changePass=(event)=>{
        this.setState({pass:event.target.value})
    }
    clickCreate=()=>{
        const db=firebase.firestore();
        if(this.state.name!=='' && this.state.pass!=='')
        {db.collection('database').add({admin:false,name:this.state.name,password:this.state.pass})
        }
    }
    accepted=(doc)=>{
        const db=firebase.firestore();
        console.log(doc.id)
        db.collection('request').doc(`${doc.id}`).set({accepted:true,pending:false},{merge:true})
    }
    rejected=(doc)=>{
        const db=firebase.firestore();
        db.collection('request').doc(`${doc.id}`).set({accepted:false,pending:false},{merge:true})
    }
    render(){
        
        const create=(
            <div style={{marginLeft:'10%'}}>
                <div className='box'>
                    <div className='subbox'>
                        <p>Employee Name :&nbsp; </p>
                        <input style={{height:'30px',alignSelf:'center'}} type='text' onChange={this.changeName} />
                    </div>
                    <div className='subbox'>
                        <p>Password :&nbsp; </p>
                        <input style={{height:'30px',alignSelf:'center'}} type='password' onChange={this.changePass}/>
                    </div>
                    <div className='subbox'>
                        <button style={{width:'70px',height:'30px',justifyContent:'center'}} onClick={this.clickCreate}>Create</button>
                    </div>
                    
                </div>
            </div>
        )
        const requests=(
            <div style={{marginLeft:'20%'}}>
                <List>
                    {
                        this.state.arr.map((doc)=>{
                            return(
                                <div>
                                    <ListItem  >
                                        <p style={{width:'50%'}}>Name : {doc.data().name}<br/>Description : {doc.data().description}</p>
                                        <button onClick={()=>this.accepted(doc)} >&#10003;</button><button onClick={()=>this.rejected(doc)} >&#10005;</button>
                                    </ListItem>
                                    <Divider/>
                                </div>
                            )
                        })
                    }
                </List>
            </div>
        )
        return(
            <div >
                <div>
                    <Drawer anchor="left" variant="permanent" >
                        <List>
                            <ListItem button onClick={this.request}><p>Requests</p></ListItem>
                            <Divider/>
                            <ListItem button onClick={this.create}><p>Create</p></ListItem>
                        </List>
                    </Drawer>
                </div>
                {
                    this.state.default ? requests:create
                }

            </div>
        )
    }
}
export default Admin;