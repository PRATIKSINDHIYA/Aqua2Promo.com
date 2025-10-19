import React from 'react'
import { useSnapshot } from 'valtio'
import { Button } from '@/components/ui/button';
import state from '../../store';

interface TabProps {
  tab: {
    name: string;
    icon: string;
  };
  isFilterTab?: boolean;
  isActiveTab?: boolean;
  handleClick: () => void;
}

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }: TabProps) => {
  const snap = useSnapshot(state);

  const activeStyles = isFilterTab && isActiveTab 
    ? { backgroundColor: snap.color, opacity: 0.5 }
    : { backgroundColor: "transparent", opacity: 1 }

  return (
    <Button
      variant={isFilterTab ? "outline" : "ghost"}
      size={isFilterTab ? "sm" : "lg"}
      className={`${isFilterTab ? 'rounded-full' : 'rounded-lg'} p-2`}
      onClick={handleClick}
      style={activeStyles}
    >
      <img 
        src={tab.icon}
        alt={tab.name}
        className={`${isFilterTab ? 'w-4 h-4' : 'w-6 h-6 object-contain'}`}
      />
    </Button>
  )
}

export default Tab