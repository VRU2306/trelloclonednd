import React, { useState, useContext } from 'react';
import { Paper, InputBase, Button, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { makeStyles } from '@mui/styles';
import storeApi from '../utils/storeApi';

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
      addMoreCard(title, listId);
      setTitle('');
      setOpen(false);
    } else {
      addMoreList(title);
      setTitle('');
      setOpen(false);
    }
  };

  return (
    <div>
      <div>
        <Paper className={classes.card}>
          <InputBase
            onChange={handleOnChange}
            multiline
            onBlur={() => setOpen(false)}
            fullWidth
            inputProps={{
              className: classes.input,
            }}
            value={title}
            required={"true"}
            placeholder={
              type === 'card'
                ? 'Enter the title for the card..'
                : 'Enter list title...'
            }
          />
        </Paper>
      </div>
      <div className={classes.confirm}>
        <Button style={{
          borderRadius:"5px",
          // background:mode.mode.mode==="light"?"#5dc9c4":"#5AAC44"
        }} onClick={handleBtnConfirm}>
          {type === 'card' ? 'Add Card' : 'Add List'}
        </Button>
        <IconButton onClick={() => setOpen(false)}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
}
