import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import { TreeItemProps } from '@material-ui/lab/TreeItem/TreeItem'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import Checkbox  from './Checkbox'

declare module 'csstype' {
  interface Properties {
    '--tree-view-color'?: string
    '--tree-view-bg-color'?: string
  }
}

type StyledTreeItemDataProps = {
  bgColor?: string
  color?: string
  labelIcon: React.ElementType<SvgIconProps>
  labelInfo?: string
  labelText?: string
  defaultChecked?: boolean
  disabled?: boolean
  items?: Array<StyledTreeItemDataProps>
 }

 type TreeViewState = {
  nodeId: string
 }

 type StyledTreeItemInnerProps = {
  checkState: Array<TreeViewState>
  checkBoxClicked: Function
 }

type StyledTreeItemProps = TreeItemProps & StyledTreeItemDataProps & StyledTreeItemInnerProps

export type TreeData = Array<StyledTreeItemDataProps>

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
  const { nodeId, labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, defaultChecked, disabled, checkBoxClicked, checkState, ...other } = props

  // className={classes.globalFilterCheckbox}

  const label = <div className={classes.labelRoot}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox
        id={`checkbox-${nodeId}`}
        onChange={(event: any, checked: boolean) => checkBoxClicked(event, checked, nodeId)}
        onClick={(e: any) => e.stopPropagation()}
        color='primary'
        defaultChecked={defaultChecked}
        disabled={disabled}
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

interface IDictionary<T> {
  [key: string]: T
}

const Tree: React.FC<{ treeData: TreeData }> = ({treeData}) => {

  const defaultChecked: Array<TreeViewState> = []
  const [checkState, setCheckState] = React.useState(defaultChecked)
  const checkBoxClicked = (event: any, checked: boolean, nodeId: string): void => {
    setCheckState(checked ? [...checkState, {nodeId}] : checkState.filter(e => e.nodeId !== nodeId))
    // console.info('checkBoxClicked ', checkState, checked, nodeId)
  }

  const handleExpanded = (nodeId: string, nodeExpanded: boolean) => {
    console.info('Node expanded ', nodeId, nodeExpanded, checkState)
  }

  const classes = useStyles()

  const treeData2Data = (it: StyledTreeItemDataProps, i: number): JSX.Element =>
      <StyledTreeItem
        nodeId={i as unknown as string}
        checkState={checkState}
        checkBoxClicked={checkBoxClicked}
        labelText={it.labelText}
        labelIcon={it.labelIcon}
        labelInfo= {it.labelInfo}
        color={it.color}
        bgColor={it.bgColor}
        disabled={it.disabled}
        defaultChecked={it.defaultChecked}
        children={(it.items) ? it.items.map(treeData2Data) : undefined}
      />
       
  return (
    <TreeView
      className={classes.root}
      defaultExpanded={['0']}
      onNodeToggle={(nodeId: string, nodeExpanded: boolean) => handleExpanded(nodeId, nodeExpanded)}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      {treeData.map(treeData2Data)}
    </TreeView>
  )
}

export default Tree
