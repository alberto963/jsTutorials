import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import TreeView from '@material-ui/lab/TreeView'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import StyledTreeItem  from './StyledTreeItem'
import { StyledTreeItemDataProps }  from './StyledTreeItem'

 interface IDictionary<T> {
  [key: string]: T
}

export type TreeViewState = IDictionary<boolean>

export type TreeData = Array<StyledTreeItemDataProps>

const useStyles = makeStyles(
  createStyles({
    root: {
      height: 264,
      flexGrow: 1,
      maxWidth: 400,
    },
  }),
)

const Tree: React.FC<{ treeData: TreeData }> = ({treeData}) => {

  const treeData2InitialExpand = (it: StyledTreeItemDataProps): Array<string> => {
    const initial: Array<string> = it.defaultExpanded ? [it.id] : []
    return it.items ? it.items.map(treeData2InitialExpand).reduce((a: Array<string>, e: Array<string>) => [...a, ...e], initial) : initial
  }

  const treeData2InitialState = (it: StyledTreeItemDataProps): TreeViewState => {
    const nodeId = it.id
    const initial: TreeViewState = {[nodeId]: it.defaultChecked ? it.defaultChecked : false}
    return it.items ? it.items.map(treeData2InitialState).reduce((a: TreeViewState, e: TreeViewState) => ({...a, ...e}), initial) : initial
  }

  const [checkState, setCheckState] = React.useState(() =>
      treeData.map(treeData2InitialState).reduce((a: TreeViewState, e: TreeViewState) => ({...a, ...e}), {}))
    
  const checkBoxClicked = (event: any, checked: boolean, nodeId: string): void => {
    setCheckState( {...checkState, [nodeId]: checked} )
    // console.info('checkBoxClicked ', checkState, checked, nodeId)
  }

  const handleExpanded = (nodeId: string, nodeExpanded: boolean) => {
    console.info('Node expanded ', nodeId, nodeExpanded, checkState)
  }

  const classes = useStyles()

  const treeData2Data = (it: StyledTreeItemDataProps, i: number): JSX.Element => <StyledTreeItem
        nodeId={it.id}
        id={it.id}
        key={it.id}
        checkState={checkState}
        checkBoxClicked={checkBoxClicked}
        labelText={it.labelText}
        labelIcon={it.labelIcon}
        labelInfo= {it.labelInfo}
        color={it.color}
        bgColor={it.bgColor}
        disabled={it.disabled}
        defaultChecked={checkState[it.id]}
        children={it.items ? it.items.map(treeData2Data) : undefined}
      />
       
  return (
    <TreeView
      className={classes.root}
      defaultExpanded={treeData.map(treeData2InitialExpand).reduce((a, e) => ([...a , ...e]), [])}
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
