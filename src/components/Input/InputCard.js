import React, { useState, useContext } from 'react';
import { Paper, InputBase, Button, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { makeStyles } from '@mui/styles';
import storeApi from '../utils/storeApi';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextValidator from 'react-material-ui-form-validator/lib/TextValidator';

const useStyle = makeStyles((theme) => ({
  card: {
    width: '280px',
    borderLeft:"6px solid red",
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
  },
  input: {
    margin: theme.spacing(1),
  },
  btnConfirm: {
    background: '#5AAC44',
    // color: '#fff',
  },
  confirm: {
    margin: theme.spacing(0, 1, 1, 1),
  },
}));
export default function InputCard({ setOpen, listId, type,mode }) {
  const classes = useStyle();
  // console.log(mode)
  const { addMoreCard, addMoreList } = useContext(storeApi);
  const [title, setTitle] = useState('');

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };
  const handleBtnConfirm = () => {
    if (type === 'card') {
      // generastes new idf for each list
      addMoreCard(title, listId);
      setTitle('');
      // setOpen(false);
      
    } else {
      addMoreList(title);
      setTitle('');
      setOpen(false);
    }
  };
  const handleBlur=()=>{
     setOpen(false);
     setTitle(''); 
  }

  return (
    <div>
      <div>
    <ValidatorForm   
          action=""
      
          noValidate={true}
          onSubmit={()=>{{handleBtnConfirm(title)}}}>
        <Paper className={classes.card}>
       
          <TextValidator
            onChange={handleOnChange}
            variant="standard"
            multiline
            validators={["required"]}
            errorMessages={['This field is required']}
            onBlur={() => setOpen(false)}
            fullWidth
            inputProps={{className: classes.input}}
            value={title}
            placeholder={
              type === 'card'
                ? 'Enter the title for the card..'
                : 'Enter list title...'
            }
          />
        </Paper>
          <div className={classes.confirm}>
        <Button style={{
          borderRadius:"5px",
          background:"#5dc9c4",
          color:"white"}} 
     type="Submit">
          {type === 'card' ? 'Add Card' : 'Add List'}
        </Button>
        <IconButton onClick={() => setOpen(false)}>
          <ClearIcon />
        </IconButton>
      </div>
       </ValidatorForm>
      </div> 
    </div>
  );
}
