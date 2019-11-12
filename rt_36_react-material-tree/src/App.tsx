import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Tree from './Tree'
import { ExampleCheckbox } from './Checkbox'

const SimpleContainer: React.FC = () => 
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='sm' style={{margin: '100px', padding: '25px'}} >
        <Typography component={Tree} variant={'button'}  />
      </Container>
      <Container maxWidth='sm' style={{margin: '100px', padding: '25px'}} >
        <Typography component={ExampleCheckbox} variant={'h1'}  />
      </Container>
    </React.Fragment>

export default SimpleContainer
