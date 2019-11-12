import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import { TreeItemProps } from '@material-ui/lab/TreeItem/TreeItem'
import MailIcon from '@material-ui/icons/Mail'
import DeleteIcon from '@material-ui/icons/Delete'
import Label from '@material-ui/icons/Label'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import InfoIcon from '@material-ui/icons/Info'
import ForumIcon from '@material-ui/icons/Forum'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'

declare module 'csstype' {
  interface Properties {
    '--tree-view-color'?: string
    '--tree-view-bg-color'?: string
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string
  color?: string
  labelIcon: React.ElementType<SvgIconProps>
  labelInfo?: string
  labelText: string
}

const useTreeItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.secondary,
      '&:focus > $content': {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
        color: 'var(--tree-view-color)',
      },
    },
    content: {
      color: theme.palette.text.secondary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      '$expanded > &': {
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
    group: {
      marginLeft: 0,
      '& $content': {
        paddingLeft: theme.spacing(2),
      },
    },
    expanded: {},
    label: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1,
    },
  }),
)

const StyledTreeItem = (props: StyledTreeItemProps) => {
  const classes = useTreeItemStyles()
  const { nodeId, labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props

  const checkBoxClicked = (event: any, checked: boolean, id: any) => {
    // setOrgStructureElement(checked, id, selected, orgStructure)
    console.info(checked, id)
  }

  // className={classes.globalFilterCheckbox}

  const label = <div className={classes.labelRoot}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox
        id={`checkbox-${nodeId}`}
        checked={true}
        onChange={(event: any, checked: boolean) => checkBoxClicked(event, checked, nodeId)}
        onClick={e => e.stopPropagation()}
        color='primary'
      />
      <Typography variant='caption'>{nodeId}</Typography>
    </div>
    <LabelIcon color='inherit' className={classes.labelIcon} />
    <Typography variant='body2' className={classes.labelText}>
      {labelText}
    </Typography>
    <Typography variant='caption' color='inherit'>
      {labelInfo}
    </Typography>
  </div>

  return (
    <TreeItem
      label={label}
      nodeId={nodeId}
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  )
}

const useStyles = makeStyles(
  createStyles({
    root: {
      height: 264,
      flexGrow: 1,
      maxWidth: 400,
    },
  }),
)

const Tree: React.FC = () => {
  const classes = useStyles()

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={['0']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      <StyledTreeItem nodeId='1' labelText='All Mail' labelIcon={MailIcon} />
      <StyledTreeItem nodeId='2' labelText='Trash' labelIcon={DeleteIcon} >
        <StyledTreeItem
            nodeId='9'
            labelText='New my'
            labelIcon={SupervisorAccountIcon}
            labelInfo='My Info'
            color='#1a73e8'
            bgColor='#e8f0fe'
          />
      </StyledTreeItem>
      <StyledTreeItem nodeId='3' labelText='Categories' labelIcon={Label}>
        <StyledTreeItem
          nodeId='5'
          labelText='Social'
          labelIcon={SupervisorAccountIcon}
          labelInfo='90'
          color='#1a73e8'
          bgColor='#e8f0fe'
        />
        <StyledTreeItem
          nodeId='6'
          labelText='Updates'
          labelIcon={InfoIcon}
          labelInfo='2,294'
          color='#e3742f'
          bgColor='#fcefe3'
        />
        <StyledTreeItem
          nodeId='7'
          labelText='Forums'
          labelIcon={ForumIcon}
          labelInfo='3,566'
          color='#a250f5'
          bgColor='#f3e8fd'
        />
        <StyledTreeItem
          nodeId='8'
          labelText='Promotions'
          labelIcon={LocalOfferIcon}
          labelInfo='733'
          color='#3c8039'
          bgColor='#e6f4ea'
        />
      </StyledTreeItem>
      <StyledTreeItem nodeId='4' labelText='History' labelIcon={Label} >
      <StyledTreeItem
            nodeId='10'
            labelText='New my2'
            labelIcon={SupervisorAccountIcon}
            labelInfo='My Info2'
            color='#1a73e8'
            bgColor='#e8f0fe'
          />
      </StyledTreeItem>
    </TreeView>
  )
}

export default Tree
