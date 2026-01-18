import React from 'react';

const CardSkeleton = () => {
  return (
    <div className="aspect-square bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col animate-pulse">
      <div className="flex-1 bg-slate-200" />
      <div className="p-3 md:p-4 flex flex-col shrink-0">
        <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-slate-200 rounded w-1/2 mb-4" />
        <div className="mt-auto space-y-2">
          <div className="h-8 bg-slate-200 rounded-md" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-8 bg-slate-200 rounded-md" />
            <div className="h-8 bg-slate-200 rounded-md" />
          </div>
          <div className="h-8 bg-slate-200 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;