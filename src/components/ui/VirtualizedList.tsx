import React from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  renderItem: ({ index, style, data }: { index: number; style: React.CSSProperties; data: T[] }) => React.ReactElement;
  className?: string;
  overscanCount?: number;
}

const VirtualizedList = <T,>({
  items,
  itemHeight,
  renderItem,
  className = '',
  overscanCount = 5
}: VirtualizedListProps<T>) => {
  return (
    <div className={`h-full ${className}`}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            itemCount={items.length}
            itemSize={itemHeight}
            itemData={items}
            overscanCount={overscanCount}
          >
            {renderItem}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default VirtualizedList;