import React,{useState,useEffect} from 'react';
import { Grid,DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import "./Activity.css";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Dialog from '@material-ui/core/Dialog';
import InputBase from '@material-ui/core/InputBase';
import Kanaban from "./Kanban";
import {Link} from "react-router-dom"


const useStyles = makeStyles({
    Card: {    
        color: "white",
        position: "absolute",
        marginTop: "5%"
    },
    item:{
        backgroundColor:"#202328",
        margin:"2%",
        marginLeft:"20px",
        padding:"30px",
        borderRadius:"7px",
        textAlign:"center",
        cursor:'pointer'
    },
    buttonGrid:{
        textAlign:"center"
    },
    createButton : {
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        height: "54px",
        width:"300px",
        background: "#5561D0",
        borderRadius: "4px",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "150%",
        color: "#FAFAFA",
        cursor: 'pointer'
    },
    input: {
        fontFamily: 'Inter',
        color: 'white',
        backgroundColor: '#3D3D3D',
        fontWeight: '500',
        fontSize: '16px',
        width: '100%',
        marginLeft: "12px",
        borderRadius: "4px",
        backgroundColor: '#373B3D'
    }
});


function Activity({handleClose }) {
    let activityid = localStorage.getItem("activity_id")
    console.log(activityid)
    const classes = useStyles();
    const [addDialog,setAddDialog] = useState(false);
    const [activityname,setActivityname] = useState('');
    console.log(activityname)
    const handleClosing = () => {
        setAddDialog(false);
    }


  const [activities, setActivities] = useState([])

  useEffect(() => {
   fetch(`/activity/fetch`, {
        credentials: 'include',
        method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        console.log("pfegt", response)
        response.json().then((result) => {
          console.log(result)
          setActivities(result)
        })
      })
  }, []);

      const [supervisor, setSuperVisor] = useState({});
  const [activityTitle, setTitle] = useState("");

      async function addActivity() {
console.log("sc")
    const requestOptions = {
      Credential: 'include',
      method: 'POST',
     headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activityname })
    }
    const response = await fetch(`/activity/create`, requestOptions);
    console.log(response)
    if (response.status === 201) {
      
      window.location.reload()
    }

  }
  const array=[1,2,3,4,5]

    return (
        <Grid
            container
            spacing={2}
            direction="row"
            className={classes.Card}
            xs={12}
        >
            <AppBar position="fixed" >
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <b style={{alignContent:"center"}}> Daily Trello </b>
            </Typography>
            </Toolbar>
            </AppBar>
        
               {activities.map((a)=>(
                <Link to ="/navbar" onClick={() => { localStorage.setItem("taskID", a.activity_id); }}>
                  <Grid    className={classes.item} >
                  
                <p>{a.activityname} </p>
              
                </Grid>
                </Link>  
               ))}
            <Grid item xs={12} 
                className={classes.buttonGrid}
            >
               <button onClick={()=>{setAddDialog(true)}} className={classes.createButton}>Create Activity</button>
            </Grid>
            <Dialog
                open={addDialog}
                keepMounted
                aria-labelledby="simple-dialog-title"
                onClose={handleClosing}
            >
                <DialogContent className="pop-content" style={{background:'#1D1E1F'}}>
                    <br />
                    <div className="ahead" style={{color:'#DFDFE0'}}>Add Activity</div><br />
                    <div className="add-input" style={{ background: '#3D3D3D', marginBottom: '36px' }}>
                        <InputBase
                            className={classes.input}
                            value={activityname}
                            placeholder="Enter the activity name"
                            inputProps={{ 'aria-label': 'Enter the activity name' }}
                            onChange={(e) => {setActivityname(e.target.value)}}
                            style={{ background: '#3D3D3D'}}
                        />
                    </div>
                    <div>
                        <button onClick={handleClosing} className="cancel-btn" style={{background:'#2A2B2B',color:'#98969B'}}>
                            Cancel
                        </button>
                        <button className="deletebtn-dialog" style={{background:'#5561D0',color:'#FFFFFF'}} onClick={addActivity}>
                            Add
                        </button>
                    </div>

                </DialogContent>

            </Dialog>
        </Grid>

    )
}

export default Activity

