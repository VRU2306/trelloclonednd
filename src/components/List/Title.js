import React, { useState, useContext } from 'react';
import { Typography, InputBase, TextField, Input } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import storeApi from '../utils/storeApi';

const useStyle = makeStyles((theme) => ({
  editableTitleContainer: {
    margin: theme.spacing(1),
    display: 'flex',
  },
  editableTitle: {
    flexGrow: 1,
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  input: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: theme.spacing(1),
   
  },
}));
export default function Title({ title, listId ,mode}) {
  // console.log(mode)
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const { updateListTitle } = useContext(storeApi);
  const classes = useStyle();
  const handleOnChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleOnBlur = () => {
    updateListTitle(newTitle, listId);
    setOpen(false);
  };
  return (
    <div>
      {open ? (
        <div>
            <ValidatorForm   >
          <TextValidator
          aria-required
          variant="standard"
            onChange={handleOnChange}
            autoFocus
            value={newTitle}
            inputProps={{
              className: classes.input,
            }}
            style={{  
               fontSize: '1.2rem',
               fontWeight: 'bold',
             '&:focus': {
      background: mode.mode.mode==='light'? '#ddd':"#67737a",
    },}}
            fullWidth
            required
            onBlur={handleOnBlur}
          />
        </ValidatorForm>
        </div>
      ) : (
        <div className={classes.editableTitleContainer}>
          <Typography
            onClick={() => setOpen(!open)}
            className={classes.editableTitle}
            style={{textAlign:"center",marginTop:'10px'}}
          >
            {title}
          </Typography>
          <MoreHorizIcon />
        </div>
      )}
    </div>
  );
}
