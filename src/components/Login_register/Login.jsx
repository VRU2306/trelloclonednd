import React, { useState} from 'react'
import './Auth.css'
import { Grid, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Navigate } from "react-router-dom";

const useStyles = makeStyles({
    loginCard: {    
        color: "white",
        position: "absolute",
        marginTop: "10%",
    },
    loginheading: {
        height: "48px",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "32px",
        lineHeight: "150 %",
        color: "#DFDFE0",
        textAlign:"center"
    },
    sideheading: {
        alignItems: "flex-start",
        display: "flex",
        marginTop: "50px",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "150%",
        display: "flex",
        alignItems: "center",
        color: "#DFDFE0"
    },
    loginButton: {
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
        height: "54px",
        background: "#5561D0",
        borderRadius: "4px",
        fontFamily: "Inter",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "150%",
        color: "#FAFAFA",
        width: "100%",
        cursor: 'pointer'
    }
});

function Login() {
    const classes = useStyles();

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

 
    async function login() {
        console.log("logged", email, pass)

        const requestOptions = {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: pass })
        }

        const response = await fetch(`/auth/login`, requestOptions);
        console.log(response.status)
        if(response.status===200){
        //   
        window.location.href="/activity"
    }
        else{
            alert("Invalid details")
        }

    }
       async function register() {
        console.log("registered", email, pass)

        const requestOptions = {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: pass })
        }

        const response = await fetch(`/auth/signup`, requestOptions);
        console.log(response)
        alert("Registration Done")

    }
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className={classes.loginCard}
            xs={12}
        >
            <AppBar position="fixed" >
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <b style={{alignContent:"center"}}> Daily Trello </b>
                </Typography>
                </Toolbar>
            </AppBar>
            <Grid item xs={12} md={12} className={classes.loginheading}>Log in</Grid>


            <ValidatorForm
                
            >
                <Grid container xs={12} justifyContent="center">
                    
                    <Grid container xs={12} justifyContent="center">
                        <Grid item xs={9}  md={7} className={classes.sideheading}>Email</Grid>
                    </Grid>
                    <Grid container xs={12} justifyContent="center">

                        <Grid item xs={9} md={7} >
                            <div style={{ width: "100%" }}>
                                <TextValidator
                                    inputProps={{
                                        style: {
                                            fontFamily: "Inter",
                                            fontStyle: "normal",
                                            fontWeight: "500",
                                            fontSize: "16px",
                                            color: "#98969B",
                                            background: "#2A2B2B",
                                            borderRadius: "4px",
                                            width: "100%"
                                        }
                                    }}
                                    name="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    type="text"
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    fullWidth
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container xs={12} justifyContent="center">
                        <Grid item  xs={9}  md={7}  className={classes.sideheading}>Password</Grid>
                    </Grid>
                    <Grid container xs={12} justifyContent="center">
                        <Grid item  xs={9}  md={7}  >
                            <div style={{ width: "100%" }}>
                                <TextValidator
                                    inputProps={{
                                        style: {
                                            width:"50px",
                                            height:"54px",
                                            fontFamily: "Inter",
                                            fontStyle: "normal",
                                            fontWeight: "500",
                                            fontSize: "16px",
                                            color: "#98969B",
                                            background: "#2A2B2B",
                                            borderRadius: "4px",
                                            width: "100%"
                                        }
                                    }}
                                    name="password"
                                    type="password"
                                    value={pass}
                                    onChange={(e) => { setPass(e.target.value) }}
                                    validators={['required', 'minStringLength:6', 'matchRegexp:[A-Z ]', 'matchRegexp:[0-9]', 'matchRegexp:[!@#$%^&*(),.?":{}|<>~`/|+_-]']}
                                    errorMessages={['This field is required', 'Password Must be atleast 6 characters long', 'Must include Capital letter', 'Must Include a number', 'Must include a Special Character']}
                                    fullWidth
                                    errorMessages={['this field is required']}
                                    size="small"
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container xs={12} spacing={2} justifyContent="center">
                        <Grid item  xs={3}><button onClick={login} className={classes.loginButton}>Login</button></Grid>
                        <Grid item  xs={3}><button onClick={register} className={classes.loginButton}>Register</button></Grid>
                    </Grid>
                </Grid>
            </ValidatorForm>

            
        </Grid>
   
    )
}

export default Login
