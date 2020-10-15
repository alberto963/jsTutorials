import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDateTimePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const styles = {
  container: {
    background: 'linear-gradient(45deg, white 30%, blue 90%)',
    border: 1,
    borderRadius: 3,
    padding: '0 30px',
    display: 'flex',
    flexWrap: 'wrap'
  },
  spacious: {
    margin: 5,
    padding: 10
  },
  larger: {
    margin: 5,
    padding: 22
 },
}

const DatePickerDialog = ({ onClose, open, onDateChange, selectedDate, classes }) => {

  const handleClose = () => onClose()

  return (
    <Dialog onClose={handleClose} aria-labelledby='simple-dialog-title' open={open}>
      <DialogTitle id='mui-pickers-chooser'>MUI date pickers chooser</DialogTitle>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form className={classes.container} noValidate>
          <TextField
            id='time'
            label='TextField'
            type='datetime-local'
            defaultValue='07:30'
            className={classes.larger}
            InputLabelProps={{shrink: true,}}
            inputProps={{step: 300,}} // 5 min 
          />
          <KeyboardTimePicker
              margin='normal'
              id='time-picker'
              className={classes.spacious}
              label='KeyboardTimePicker'
              value={selectedDate}
              onChange={onDateChange}
              KeyboardButtonProps={{'aria-label': 'change time',}}
          />
          <KeyboardDateTimePicker
              margin='normal'
              id='date-time-picker'
              className={classes.spacious}
              label='KeyboardDateTimePicker'
              value={selectedDate}
              onChange={onDateChange}
              KeyboardButtonProps={{'aria-label': 'change time',}}
          />
      </form>
    </MuiPickersUtilsProvider>
    </Dialog>
  )
}

const StyledDatePickerDialog = withStyles(styles)(DatePickerDialog)

const DatePickerDialogDemo = () => {
  const [open, setOpen] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState(new Date())

  const handleDateChange = date => setSelectedDate(date)
  const handleClickOpen = () => setOpen(true) 

  const handleClose = () => setOpen(false)

  return (
    <div > 
      <Typography variant='subtitle1'>Selected date: {selectedDate.toString()}</Typography>
      <br />
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Open date pickers chooser dialog
      </Button>
      <StyledDatePickerDialog open={open} selectedDate={selectedDate} onClose={handleClose} onDateChange={handleDateChange} />
    </div>
  )
}

export default DatePickerDialogDemo
