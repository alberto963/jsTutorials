import React from 'react'
import Typography from '@material-ui/core/Typography'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'


const checkBoxClicked = (event, checked, id) => {
  setOrgStructureElement(checked, id, selected, orgStructure)
}

const createOrgStructureLevel = orgStructureElement => {
  const elements = []

   orgStructureElement.forEach((v, k) => {
     const { id, children } = v

     if (k.length !== 0) {
       const label = (
         <div style={{ display: 'flex', alignItems: 'center' }}>
           <Checkbox
             id={`checkbox-${k}`}
             className={classes.globalFilterCheckbox}
             checked={selected.has(id)}
             onChange={(event, checked) => checkBoxClicked(event, checked, id)}
             color='primary'
           />
           <Typography variant='caption'>{k}</Typography>
         </div>
       )

       elements.push(
         children && children.length > 0 ? (
           <TreeItem key={id} nodeId={id} label={label}>
             {createOrgStructureLevel(children)}
           </TreeItem>
         ) : (
           <TreeItem key={id} nodeId={id} label={label} />
         ),
       )

     } else if (children) {
       elements.push(createOrgStructureLevel(children))
     }
   })
   
   return elements
  }

 const handleExpanded = (nodeId, nodeExpanded) => {
   // cache expanded nodes
   if (nodeExpanded) {
     addOpenOrgStructurePanel(nodeId)
   } else {
     removeOpenOrgStructurePanel(nodeId)
   }
 }

 return (
   <TreeView
     defaultExpanded={openOrgStructurePanels}
     onNodeToggle={(nodeId, nodeExpanded) => handleExpanded(nodeId, nodeExpanded)}
     defaultCollapseIcon={<ExpandMoreIcon />}
     defaultExpandIcon={<ChevronRightIcon />}>
     {orgStructure.length !== 0 ? createOrgStructureLevel(orgStructure) : null}
   </TreeView>
  )

export default createOrgStructureLevel
