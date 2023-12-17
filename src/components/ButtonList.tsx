import React from 'react';

export interface ListItem {
  id: string;
  text: string;
}

interface ButtonListProps {
  items: ListItem[];
  onItemClick: (item: ListItem) => void;
}

export const ButtonList: React.FC<ButtonListProps> = ({ items, onItemClick }) => {
  return (
    <>
      {items.map((item) => {
        return (
          <div key={item.id} className="m-2 border rounded flex items-center ">
            <button className="bg-red-900 p-2 m-1 rounded w-full" onClick={() => onItemClick(item)}>
              {item.text}
            </button>
          </div>
        )
      })}
    </>
  );
};