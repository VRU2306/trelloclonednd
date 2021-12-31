import React from 'react';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Draggable } from 'react-beautiful-dnd';
const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
        borderLeft:"6px solid magenta",
  },
}));
export default function Card({ card, index,mode }) {
  const classes = useStyle();
console.log(mode)
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Paper className={classes.card}
          style={{backgroundColor:mode.mode.mode==='light'?"#ffffff":"#202328"}}>{card.title}</Paper>
        </div>
      )}
    </Draggable>
  );
}
