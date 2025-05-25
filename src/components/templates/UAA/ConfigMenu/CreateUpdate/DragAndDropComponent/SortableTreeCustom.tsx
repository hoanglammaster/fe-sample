/* eslint-disable @next/next/no-img-element */
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree'
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

interface Props {
  listCurrenMenu: any[]
  onChange: (val: any[]) => void
  readOnly?: boolean
}

const SortableTreeCustom = (props: Props) => {
  const { listCurrenMenu, onChange, readOnly } = props
  const handleChangeExpanded = (list: any[], id: number, expanded: boolean) => {
    const isContainId = list.find((v) => v.id === id)
    if (isContainId) {
      return list.map((v) => {
        return { ...v, expanded: v.id === id ? expanded : v.expanded }
      })
    } else
      return list.map((v) => {
        return {
          ...v,
          children: !!v.children
            ? handleChangeExpanded(v.children, id, expanded)
            : v.children,
        }
      })
  }
  return (
    <SortableTree
      treeData={listCurrenMenu}
      onChange={(treeData) => {
        console.log('ttrrrrr0', treeData)
        onChange(treeData)
      }}
      isVirtualized={false}
      theme={FileExplorerTheme}
      maxDepth={2}
      rowHeight={44}
      canDrag={!readOnly}
      generateNodeProps={({ node, path, treeIndex }) => ({
        title: () => {
          const nodeItem = node as any
          return (
            <Box
              className='flex items-center w-full h-22'
              // sx={{ marginLeft: '-18px' }}
            >
              {nodeItem.type !== 'ITEM' && (
                <IconButton
                  sx={{ marginLeft: '-6px' }}
                  onClick={() => {
                    const newValue = handleChangeExpanded(
                      listCurrenMenu,
                      node.id,
                      !node?.expanded
                    )

                    console.log('newValue', newValue)
                    onChange(newValue)
                  }}
                >
                  {node?.expanded ? (
                    <KeyboardArrowUpIcon
                      style={{ width: '16px', height: '16px' }}
                      fontSize='small'
                    />
                  ) : (
                    <KeyboardArrowDownIcon
                      style={{ width: '16px', height: '16px' }}
                      fontSize='small'
                    />
                  )}
                </IconButton>
              )}

              {node?.icon && (
                <img
                  alt=''
                  src={node?.icon}
                  style={{ width: '24px', height: '24px' }}
                />
              )}
              <Typography
                variant='body2'
                className='line-clamp-1'
                title={node.name}
              >
                {node.name?.length > 40
                  ? `${node.name.slice(0, 40)}...`
                  : node.name}
              </Typography>
            </Box>
          )
        },
      })}
      canNodeHaveChildren={(node) => {
        const nodeItem = node as any
        return nodeItem?.type !== 'ITEM'
      }}
      canDrop={(node) => (node as any)?.type !== 'GROUP'}
    />
  )
}

export default SortableTreeCustom
