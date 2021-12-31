import React from 'react';
import { Paper, Typography, CssBaseline } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Title from './Title';
import Card from './Card';
import InputContainer from '../Input/Input';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const useStyle = makeStyles((theme) => ({
  root: {
    minWidth: '300px',
 
    
    marginLeft: theme.spacing(1),
  },
  
  cardContainer: {
    marginTop: theme.spacing(4),
  },
}));
export default function List({ list, index,mode }) {
    console.log(mode)
  const classes = useStyle();
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <Paper className={classes.root}
          style={{
              backgroundColor:mode.mode.mode==='light'?'#EBECF0':"#0f0f0f",
          }} {...provided.dragHandleProps}>
            <CssBaseline />
            <Title title={list.title} listId={list.id}mode={mode}/>
            <Droppable droppableId={list.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={classes.cardContainer}
                >
                  {list.cards.map((card, index) => (
                    <Card key={card.id} card={card} index={index} mode={mode}/>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <InputContainer listId={list.id} type="card" mode={mode} />
          </Paper>
        </div>
      )}
    </Draggable>
  );
}
