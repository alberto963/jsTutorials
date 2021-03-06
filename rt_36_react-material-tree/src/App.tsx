import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import CheckboxTree, { CheckboxTreeData } from './CheckboxTree'
import { ExampleCheckbox } from './CheckboxInsideTree'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import Label from '@material-ui/icons/Label'
import MailIcon from '@material-ui/icons/Mail'
import DeleteIcon from '@material-ui/icons/Delete'
import InfoIcon from '@material-ui/icons/Info'
import ForumIcon from '@material-ui/icons/Forum'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'

const treeData: CheckboxTreeData = { struct: [
  {labelText: 'All Mail', labelIcon: MailIcon, id: "0"},
  {labelText: 'Trash', labelIcon: DeleteIcon, defaultChecked: false, id: "1", defaultExpanded: true, items: [
    {labelText: 'New My', labelIcon: SupervisorAccountIcon, labelInfo: 'My Info', color: '#1a73e8', bgColor: '#e8f0fe', defaultChecked: false, id: "2"}
  ]},
  {labelText: 'Categories', labelIcon: Label, color: '#1a73e8', bgColor: '#e8f0fe', id: "3", defaultExpanded: true, items: [
    {labelText: 'Social', labelIcon: SupervisorAccountIcon, labelInfo: '90', color: '#1a73e8', bgColor: '#e8f0fe', defaultChecked: false, disabled: false, id: "4"},
    {labelText: 'Updates', labelIcon: InfoIcon, labelInfo: '2,2000', color: '#e3742f', bgColor: '#e8f0fe', id: "5"},
    {labelText: 'Forums', labelIcon: ForumIcon, labelInfo: '3,330', color: '#a250f5', bgColor: '#f3e8fd', defaultChecked: false, id: "6"},
    {labelText: 'Promotions', labelIcon: LocalOfferIcon, labelInfo: '733', color: '#3c8039', bgColor: '#e6f4ea', id: "7"}
  ]},
  {labelText: 'History', labelIcon: Label, defaultChecked: false, id: "8", items: [
    {labelText: 'New My2', labelIcon: SupervisorAccountIcon, labelInfo: 'My Info2', color: '#1a73e8', bgColor: '#e8f0fe', id: "9"}
  ]},
]}

const SimpleContainer: React.FC = () => 
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='sm' style={{margin: '100px', padding: '25px'}} >
        <Typography component='div' variant={'button'}>
          {<CheckboxTree struct={treeData.struct} />}
        </Typography>
      </Container>
      <Container maxWidth='sm' style={{margin: '100px', padding: '25px'}} >
        <Typography component={ExampleCheckbox} variant={'h1'}  />
      </Container>
    </React.Fragment>

export default SimpleContainer
