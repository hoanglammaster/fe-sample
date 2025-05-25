import { useEffect, useState } from 'react'
import Tree, { mutateTree } from '@atlaskit/tree'
import { DragDropContext } from 'react-beautiful-dnd'

const treeData = {
  rootId: '1',
  items: {
    '1': {
      id: '1',
      children: ['2', '3'],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: 'Root',
      },
    },
    '2': {
      id: '2',
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: 'Child 1',
      },
    },
    '3': {
      id: '3',
      children: ['4'],
      hasChildren: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: 'Child 2',
      },
    },
    '4': {
      id: '4',
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: 'Child 2.1',
      },
    },
  },
}

export default function TreePage() {
  const [tree, setTree] = useState<any>(treeData)
  const [isClient, setIsClient] = useState(false)

  const onExpand = (itemId) => {
    const newTree = mutateTree(tree, itemId, { isExpanded: true })
    setTree(newTree)
  }

  const onCollapse = (itemId) => {
    const newTree = mutateTree(tree, itemId, { isExpanded: false })
    setTree(newTree)
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    const newTree = mutateTree(tree, result.source.droppableId, {
      children: [...tree.items[result.source.droppableId].children],
    })
    setTree(newTree)
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Tree
        tree={tree}
        renderItem={({ item, depth, onExpand, onCollapse }) => (
          <div style={{ paddingLeft: depth * 20 }}>
            {item.isExpanded ? (
              <button onClick={() => onCollapse(item.id)}>-</button>
            ) : (
              <button onClick={() => onExpand(item.id)}>+</button>
            )}
            {item.data.title}
          </div>
        )}
        onExpand={onExpand}
        onCollapse={onCollapse}
        isDragEnabled
        isNestingEnabled
      />
    </DragDropContext>
  )
}
