import React from 'react';
import { Button, Container, Popover, Typography } from '@mui/material';
import { DateRange } from '@mui/icons-material';

const FilterOrder = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div >
      <Button onClick={handleClick}>Open Popover</Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Container style={{width:200,height:200}}></Container>
      </Popover>
    </div>
  );
};

export default FilterOrder;
