import type { CSSProperties } from 'react';
import type {
  Active,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState, useMemo } from 'react';

export type Index = number;

type Props<T> = {
  items: { id: UniqueIdentifier; data: T }[];
  onSwitch: (from: Index, to: Index) => void;
  renderSortableItem: (data: T, index: number) => JSX.Element;
  renderActiveItem?: (data: T, index: number) => JSX.Element;
};

export function SortableContainer<T>({
  items,
  onSwitch,
  renderSortableItem,
  renderActiveItem,
}: Props<T>) {
  const [active, setActive] = useState<Active | null>(null);
  const activeIndex = useMemo(
    () => (active ? items.findIndex((item) => item.id === active?.id) : -1),
    [active, items]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragStart = ({ active }: DragStartEvent) => setActive(active);

  const clearActive = () => setActive(null);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over?.id) {
      const activeIndex = items.findIndex((item) => item.id === active.id);
      const overIndex = items.findIndex((item) => item.id === over.id);
      onSwitch(activeIndex, overIndex);
    }
    clearActive();
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={clearActive}
    >
      <SortableContext items={items}>
        {items.map((item, index) => renderSortableItem(item.data, index))}
      </SortableContext>
      <DragOverlay
        dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.4',
              },
            },
          }),
        }}
      >
        {activeIndex !== -1
          ? (renderActiveItem || renderSortableItem)(
              items[activeIndex].data,
              -1 * activeIndex
            )
          : null}
      </DragOverlay>
    </DndContext>
  );
}

export function useSortableItem({ id }: { id: UniqueIdentifier }) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style: CSSProperties = useMemo(
    () => ({
      opacity: isDragging ? 0.4 : undefined,
      transform: CSS.Translate.toString(transform),
      transition,
    }),
    [isDragging, transform, transition]
  );

  const activatorProps = useMemo(
    () => ({
      ref: setActivatorNodeRef,
      ...listeners,
      ...attributes,
    }),
    [setActivatorNodeRef, listeners, attributes]
  );

  return {
    setNodeRef,
    activatorProps,
    style,
  };
}
