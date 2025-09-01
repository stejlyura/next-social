"use client"
import AutoSizer from "react-virtualized-auto-sizer"
import { VariableSizeList as List, ListChildComponentProps } from "react-window"
import { forwardRef, memo, useEffect, useLayoutEffect, useRef, useState } from "react"
import PostElement from "./PostElement"
import type { Post } from "@/interfaces/postInterface"

const GAP_Y = 16

const Outer = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref) => (
    <div {...props} ref={ref} className={`no-scrollbar ${props.className ?? ""}`} />
  )
)

type Props = { data: Post[] }

export default function PostsVirtual({ data }: Props) {
  const listRef = useRef<List>(null)
  const sizeMap = useRef<Record<number, number>>({})

  const setSize = (index: number, size: number) => {
    if (sizeMap.current[index] !== size) {
      sizeMap.current = { ...sizeMap.current, [index]: size }
      listRef.current?.resetAfterIndex(index)
    }
  }

  const getItemSize = (index: number) => {
    return (sizeMap.current[index] ?? 100) + GAP_Y // минимум 100px если ещё не посчитано
  }

  const Row = memo(function Row({
    index,
    style,
    data,
  }: ListChildComponentProps<Post[]>) {
    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
      if (ref.current) {
        setSize(index, ref.current.getBoundingClientRect().height)
      }
    }, [index])

    const p = data[index]
    return (
      <div style={style}>
        <div ref={ref} className="px-4">
          <PostElement {...p} />
        </div>
      </div>
    )
  })

  return (
  <div className="h-full w-full">
    <AutoSizer>
      {({ height, width }) => (
        <List
          ref={listRef}
          height={height}
          width={width}
          itemCount={data.length}
          itemSize={getItemSize}
          itemData={data}
          itemKey={(i, d) => d[i].id}
          outerElementType={Outer}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  </div>
)
}
