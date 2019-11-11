import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Tree from './Tree'

const SimpleContainer: React.FC = () => 
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='sm' style={{margin: '100px', padding: '25px', border: 'solid'}}>
        <Typography component={Tree} variant={'button'} />
      </Container>
    </React.Fragment>

export default SimpleContainer
