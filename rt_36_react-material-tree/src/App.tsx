import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Tree, { TreeData } from './Tree'
import { ExampleCheckbox } from './Checkbox'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import Label from '@material-ui/icons/Label'
import MailIcon from '@material-ui/icons/Mail'
import DeleteIcon from '@material-ui/icons/Delete'
import InfoIcon from '@material-ui/icons/Info'
import ForumIcon from '@material-ui/icons/Forum'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'

const treeData: TreeData = [
  {labelText: 'All Mail', labelIcon: MailIcon},
  {labelText: 'Trash', labelIcon: DeleteIcon, defaultChecked: true, children: [
    {labelText: 'New My', labelIcon: SupervisorAccountIcon, labelInfo: 'My Info', color: '#1a73e8', bgColor: '#e8f0fe'}
  ]},
  {labelText: 'Categories', labelIcon: Label, color: '#1a73e8', bgColor: '#e8f0fe', children: [
    {labelText: 'Social', labelIcon: SupervisorAccountIcon, labelInfo: '90', color: '#1a73e8', bgColor: '#e8f0fe', defaultChecked: true, disabled: true},
    {labelText: 'Updates', labelIcon: InfoIcon, labelInfo: '2,2000', color: '#e3742f', bgColor: '#e8f0fe'},
    {labelText: 'Forums', labelIcon: ForumIcon, labelInfo: '3,330', color: '#a250f5', bgColor: '#f3e8fd'},
    {labelText: 'Promotions', labelIcon: LocalOfferIcon, labelInfo: '733', color: '#3c8039', bgColor: '#e6f4ea'}
  ]},
  {labelText: 'History', labelIcon: Label, defaultChecked: true, children: [
    {labelText: 'New My2', labelIcon: SupervisorAccountIcon, labelInfo: 'My Info2', color: '#1a73e8', bgColor: '#e8f0fe'}
  ]},
]

const SimpleContainer: React.FC = () => 
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='sm' style={{margin: '100px', padding: '25px'}} >
        <Typography component='div' variant={'button'}>
          {<Tree treeData={treeData} />}
        </Typography>
      </Container>
      <Container maxWidth='sm' style={{margin: '100px', padding: '25px'}} >
        <Typography component={ExampleCheckbox} variant={'h1'}  />
      </Container>
    </React.Fragment>

export default SimpleContainer
