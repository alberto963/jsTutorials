import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import TreeView from '@material-ui/lab/TreeView'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import CheckboxTreeItem, {
  CheckboxTreeItemDataProps
} from './CheckboxTreeItem'

interface IDictionary<T> {
  [key: string]: T
}

export type CheckboxTreeViewState = IDictionary<boolean>

export type CheckboxTreeData = {
  struct: Array<CheckboxTreeItemDataProps>
}

const useStyles = makeStyles(
  createStyles({
    root: {
      height: 264,
      flexGrow: 1,
      maxWidth: 400
    }
  })
)

const CheckboxTree: React.FC<CheckboxTreeData> = ({ struct }) => {
  const treeData2InitialExpand = (
    it: CheckboxTreeItemDataProps
  ): Array<string> => {
    const initial: Array<string> = it.defaultExpanded ? [it.id] : []
    return it.items
      ? it.items
          .map(treeData2InitialExpand)
          .reduce((a: Array<string>, e: Array<string>) => [...a, ...e], initial)
      : initial
  }

  const treeData2InitialState = (
    it: CheckboxTreeItemDataProps
  ): CheckboxTreeViewState => {
    const nodeId = it.id
    const initial: CheckboxTreeViewState = {
      [nodeId]: it.defaultChecked ? it.defaultChecked : false
    }
    return it.items
      ? it.items.map(treeData2InitialState).reduce(
          (a: CheckboxTreeViewState, e: CheckboxTreeViewState) => ({
            ...a,
            ...e
          }),
          initial
        )
      : initial
  }

  const [checkState, setCheckState] = React.useState(() =>
    struct.map(treeData2InitialState).reduce(
      (a: CheckboxTreeViewState, e: CheckboxTreeViewState) => ({
        ...a,
        ...e
      }),
      {}
    )
  )

  const [interState, setInterState] = React.useState(() =>
    struct.map(treeData2InitialState).reduce(
      (a: CheckboxTreeViewState, e: CheckboxTreeViewState) => ({
        ...a,
        ...e
      }),
      {}
    )
  )
  const parentChildCount = struct.map(data => {
    let obj = {
      parentid: data.id,
      childIdArr: data.items
        ? data.items.map(it => {
            let childObj = {
              childId: it.id,
              checked: false
            }
            return childObj
          })
        : []
    }
    return obj
  })

  const checkBoxClicked = (event: any, checked: any, nodeId: string): void => {
    let childArray: Array<any> = []
    let checkedArray: Array<any> = new Array(checkState)
    let interMediateArray: Array<any> = new Array(interState)
    let parentList: Array<any> = parentChildCount
    let checkObj = checkedArray[0]
    let interObj = interMediateArray[0]
    let parentId = ''
    let selectedChildCount = 0
    struct.forEach(item => {
      if (item.id === nodeId) {
        // if parent checkbox is checked childs will also be  checked

        item.items &&
          item.items.forEach(data => {
            childArray.push(data.id.toString())
          })
        checkObj[item.id] = !checkObj[item.id]
        interObj[item.id] = false
        childArray.forEach(childIds => {
          checkObj[childIds] = checkObj[item.id]
        })
      } else {
        /* if child is cliked then make parent to intermediate or if all childrens
                  are checked then make parent also checked */

        item.items &&
          item.items.forEach(data => {
            if (data.id === nodeId) {
              parentId = item.id
              checkObj[nodeId] = checked
            }
          })
      }
    })
    // sets the parent to  either intermediate or checked
    parentList.forEach(parent => {
      if (parent.parentid === parentId) {
        let start = parseInt(parentId) // start of children id
        let end = start + parseInt(parent.childIdArr.length) // end of children id
        // checks the number of children checked for the parent item
        for (let i = start + 1; i <= end; i++) {
          if (checkObj[i]) {
            selectedChildCount += 1
          }
        }
        // all childrens are checked make parent also checked
        if (selectedChildCount === parseInt(parent.childIdArr.length)) {
          checkObj[start] = true
          interObj[start] = false
        } else if (
          // some  childrens are checked make parent intermediate
          selectedChildCount > 0 &&
          selectedChildCount < parent.childIdArr.length
        ) {
          interObj[start] = true
          checkObj[start] = false
        } else {
          // none of  childrens are checked make parent uncheked
          interObj[start] = false
          checkObj[start] = false
        }
      }
    })
    setInterState({ ...interObj })
    setCheckState({ ...checkObj })
  }

  const handleExpanded = (nodeId: string, nodeExpanded: boolean) => {
    console.info('Node expanded ', nodeId, nodeExpanded, checkState)
  }

  const classes = useStyles()

  const treeData2Data = (
    it: CheckboxTreeItemDataProps,
    i: number
  ): JSX.Element => (
    <CheckboxTreeItem
      nodeId={it.id}
      id={it.id}
      key={it.id}
      checkState={checkState}
      interState={interState}
      checkBoxClicked={checkBoxClicked}
      labelText={it.labelText}
      labelIcon={it.labelIcon}
      labelInfo={it.labelInfo}
      color={it.color}
      bgColor={it.bgColor}
      checked={checkState[it.id]}
      disabled={it.disabled}
      indeterminate={interState[it.id]}
      defaultChecked={checkState[it.id]}
      children={it.items ? it.items.map(treeData2Data) : undefined}
    />
  )

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={struct
        .map(treeData2InitialExpand)
        .reduce((a, e) => [...a, ...e], [])}
      onNodeToggle={(nodeId: any, nodeExpanded: any) =>
        handleExpanded(nodeId, nodeExpanded)
      }
      // onNodeToggle={(nodeId: string, nodeExpanded: boolean) => handleExpanded(nodeId, nodeExpanded)}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      {struct.map(treeData2Data)}
    </TreeView>
  )
}

export default CheckboxTree
