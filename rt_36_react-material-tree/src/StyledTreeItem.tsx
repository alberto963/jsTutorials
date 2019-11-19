import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import TreeItem from '@material-ui/lab/TreeItem'
import { TreeItemProps } from '@material-ui/lab/TreeItem/TreeItem'
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import { TreeViewState }  from './Tree'
import Checkbox  from './Checkbox'

declare module 'csstype' {
  interface Properties {
    '--tree-view-color'?: string
    '--tree-view-bg-color'?: string
  }
}

export type StyledTreeItemDataProps = {
  id: string
  bgColor?: string
  color?: string
  labelIcon: React.ElementType<SvgIconProps>
  labelInfo?: string
  labelText?: string
  defaultChecked?: boolean
  disabled?: boolean
  defaultExpanded? : boolean
  items?: Array<StyledTreeItemDataProps>
 }

 export type StyledTreeItemInnerProps = {
  checkState: TreeViewState
  checkBoxClicked: Function
 }

export type StyledTreeItemProps = TreeItemProps & StyledTreeItemDataProps & StyledTreeItemInnerProps

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

const StyledTreeItem: React.FC<StyledTreeItemProps> =
  ({nodeId, labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, defaultChecked, disabled, checkBoxClicked, checkState, ...other}) => {
  const classes = useTreeItemStyles()

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

export default StyledTreeItem