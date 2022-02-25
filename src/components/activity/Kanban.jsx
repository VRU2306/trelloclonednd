import React,{useState,useEffect} from 'react';
import { Grid,DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import "./Kanban.css";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Dialog from '@material-ui/core/Dialog';
import InputBase from '@material-ui/core/InputBase';
// import{Add,DeleteIcon,EditIcon}from "@mui/icons-material"
import Add from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import{  useParams} from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {Button } from "@mui/material"
import {Link} from "react-router-dom"
import {
    TextValidator,
    ValidatorForm,
    SelectValidator
} from "react-material-ui-form-validator";
// import {
//     MuiPickersUtilsProvider,
//     KeyboardTimePicker,
//     KeyboardDatePicker,
// } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import { useStoreState, useStoreActions } from "easy-peasy";
import moment from 'moment';

import { ToastContainer, toast } from 'material-react-toastify';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles({
    Card: {    
        color: "white",
        position: "absolute",
        marginTop: "5%"
    },
    item:{
        backgroundColor:"#ffffff",
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


function Activity({ }) {
    const classes = useStyles();

    const [addDialog,setAddDialog] = useState(false);
      const [openaddgroup, setopenaddgroup] = useState(false)
    const handleclosedialogaddgroup = () => {
        setopenaddgroup(false)
    }
        const [opennewstatuscard, setopennewstatuscard] = useState(false)
    const [newstatusnamecolumn, setnewstatusnamecolumn] = useState('')

       const [opendeletecolumn, setopendeletecolumn] = useState(false)

     const [opennewcard, setopennewcard] = useState(false)
        const [opendeletecard, setopendeletecard] = useState(false)

    const [newstatusname, setnewstatusname] = useState()
    const [activityname,setActivityname] = useState('');
    console.log(activityname)
    const handleClosing = () => {
        setAddDialog(false);
    }
const [columns, setColumns] = useState({})
    let activityid = localStorage.getItem("taskID")
    console.log(activityid)

console.log(columns)
  const [task, setATask] = useState([])
    useEffect(() => {
   fetch(`/task/fetch?activity_id=${activityid}`, {
        credentials: 'include',
        method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        console.log("pfegt", response)
        response.json().then((result) => {
          console.log(result)
          setATask(result)
        })
      })
  }, []);
    // console.log(task)
    async function updatestatus(taskid, status) {
        const requestOptions = {
            Credential: 'include',
            method: 'POST',
            headers: { "x-auth-token": localStorage.getItem("token"), 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })

        }
        const response = await fetch(`/task/statusupdate?taskid=${taskid}`, requestOptions);
        console.log(response)
    }
    const onDragEnd = (result, task, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = task[source.droppableId];
            const destColumn =task[destination.droppableId];
            const sourceItems = [...sourceColumn.task];
            const destItems = [...destColumn.task];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...task,
                [source.droppableId]: {
                    ...sourceColumn,
                    task: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    task: destItems
                }
            });
        } else {
            const column = task[source.droppableId];
            const copiedItems = [...column.task];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...task,
                [source.droppableId]: {
                    ...column,
                    task: copiedItems
                }
            });
        }


        updatestatus(result.draggableId, task[destination.droppableId].status);

    };
    const [tasktitle, settasktitle] = useState('')
    const [taskdesc, settaskdesc] = useState('')



    const handleclosedialognewcard = () => {
        setopennewcard(false)
        settaskdesc('')
        settasktitle('')
     

    }

    async function columncard() {
   
        const requestOptions = {
            credentials: 'include',
            method: 'POST',
            headers: {
                "x-auth-token": localStorage.getItem("token"),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task_title: tasktitle, 
                task_description: taskdesc,
                activity_id: activityid,
                status: opennewcard[0], 
            })
        }
        const response = await fetch(`/task/create`, requestOptions)
        console.log(response)
        const res = await response.json()
        console.log(res)
        if (response.status == 201) {

            setColumns({ ...columns })

            window.location.reload();
        }

    }
        const [statusavailable, setstatusavailable] = useState([])
        async function deletecolumn(taskid) {


        const requestOptions = {
            credentials: 'include',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            }
        }
        const response = await fetch(`/task/delete?taskid=${taskid}`,requestOptions);
        console.log(response)
        if (response.status == 200) {
       
            delete columns[opendeletecolumn[1]]
 
            statusavailable.splice(statusavailable.indexOf(opendeletecolumn[0]), 1)
            setstatusavailable([...statusavailable])
           window.location.reload();  
     
        }
    }
    return (
        <div style={{ display: "flex", height: "100%", overflowX: "scroll" }}>
     <DragDropContext
                onDragEnd={result => onDragEnd(result,task, setColumns)}
            >
                {Object.entries(task).map(([columnId, column], index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                            key={columnId}
                        >
                            <div className="heading">
                                <div style={{ width: "140px", overflowWrap: "break-word" }}>
                                    <h2 className="Status">{column.status}</h2>
                                </div>
                                <div>
                                  
                                </div>
                            </div>
                            <div style={{ margin: 8 }}>
                                <Droppable droppableId={columnId.toString()} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (<>
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                            
                                                    padding: 4,
                                                    width: 250,
                                                    minHeight: 500
                                                }}
                                            >
                                                {column.task.map((item, index) => {
                                                    return (<div style={{ display: "flex" }} >
                                                    

                                                            <Draggable
                                                                key={item.taskid}
                                                                draggableId={item.taskid.toString()}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    return (<div >
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                userSelect: "none",
                                                                                padding: 8,
                                                                                marginBottom: 10,
                                                                                margin: "0 0 8px 0",
                                                                                minHeight: "50px",
                                                                                border: "0.5px solid",
                                                                                color: "white",
                                                                                width: '220px',
                                                                                borderRadius: "9px",
                                                                                ...provided.draggableProps.style
                                                                            }}
                                                                        >
                                                                            <div style={{ backgroundColor: "rgb(50 49 49)", padding: 8, borderRadius: "9px", display: "flex" }}>
                                                                                <div style={{    width: "300px"}}>
                                                                                    <div style={{ fontWeight: "bold", fontSize: "16px" }}>  {item?.task_title}</div>
                                                                                    <div>{item?.user_id?.map((u, i) => {
                                                                                        return (<>
                                                                                            <span>
                                                                                                <div>
                                                                                                    <span className="para2">
                                                                                            
                                                                                                    </span>
                                                                                                    <span >{"Nmae:"|| 'Name'}</span>
                                                                                                </div>
                                                                                            </span>
                                                                                        </>)
                                                                                    })}</div>
                                                                                </div>
                                                                                <div>
                                                                                <DeleteIcon className="deleteiconkanban" onClick={(e) => { deletecolumn(item.taskid); }} />
                                                                            </div>
                                                                            </div>


                                                                        </div>


                                                                    </div>);
                                                                }}
                                                            </Draggable>

                                                    </div>);
                                                })}
                                                {provided.placeholder}
                                                <div style={{ backgroundColor: "rgb(50 49 49)", width: "220px", borderRadius: "9px" }}>
                                                    <Button style={{ width: "100%", textTransform: "none" }} onClick={() => { setopennewcard([column.status, columnId]) }}><Add className="addiconkanban" /><p style={{ width: "max-content", color: "white" }}>New</p></Button>
                                                </div>
                                            </div>
                                        </>);
                                    }}
                                </Droppable>
                            </div>

                        </div>
                    );
                })}
            </DragDropContext>
               <Dialog
            open={opennewcard}
            // keepMounted
            // aria-labelledby="simple-dialog-title"
            onClose={() => { setopennewcard(false);}}
            classes={{ paper: classes.dialogPaper }}

        >
            <DialogContent className="pop-content-new">
                <br />
                <ValidatorForm onSubmit={() => { columncard() }}>
                    <div style={{ height: "200px" }}>
                        <p className="addnewgroup">Enter New Task Details</p>
                        <Grid container xs={12}>
                            <Grid item xs={6} style={{ color: "black", marginTop: "30px", fontSize: "20px" }}>Enter Task Title:</Grid>
                            <Grid item xs={6} style={{ marginTop: "20px" }}>
               
                                    <TextValidator
                                        autoFocus
                                        size="small"
                                        variant="standard"
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        margin="dense"
                                        value={tasktitle}
                                        onChange={e => settasktitle(e.target.value)}
                                        placeholder="Task Title"
                                        fullWidth
                                        InputProps={{
                                            classes: {
                                                input: classes.resize
                                            }
                                        }}
                                    />
                     
                            </Grid>
                            <Grid item xs={6} style={{ color: "black", marginTop: "30px", fontSize: "20px" }}>Enter Task Description:</Grid>
                            <Grid item xs={6} style={{ marginTop: "20px" }}>
                     
                                    <TextValidator
                                        autoFocus
                                        size="small"
                                        variant="standard"
                                        margin="dense"
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        value={taskdesc}
                                        onChange={e => settaskdesc(e.target.value)}
                                        placeholder="Task description"
                                        fullWidth
                                        InputProps={{
                                            classes: {
                                                input: classes.resize
                                            }
                                        }}
                                    />
                            </Grid>
                            <Grid item xs={6}>
                                <Button onClick={handleclosedialognewcard}
                                    style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "30px", background: "#202328", border: "1px solid #d4dce1" }}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button type="submit"
                                    style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "30px", marginLeft: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>

                    </div>
                </ValidatorForm>
            </DialogContent>

        </Dialog>
            </div>
    )
}

export default Activity

