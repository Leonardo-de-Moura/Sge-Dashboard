import React from 'react';

export const IfceBadge: React.FC<{ campusName?: string }> = ({ campusName = 'Campus Cedro' }) => {
  return (
    <a href="" className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-100 transition-colors group text-left" title="IFCE">
      {/* 9-dot IFCE stylized grid mark */}
      <div className="grid grid-cols-3 gap-0.5 w-6 h-7 flex-shrink-0" aria-hidden="true">
        <span className="w-1.5 h-1.5 rounded-[2px] bg-[#A62B26]"></span>
        <span className="w-1.5 h-1.5 rounded-[2px] bg-[#006A38]"></span>
        <span className="w-1.5 h-1.5 rounded-[2px] bg-[#006A38]"></span>
        
        <span className="w-1.5 h-1.5 rounded-[2px] bg-[#006A38]"></span>
        <span className="w-1.5 h-1.5 rounded-[2px] bg-[#006A38]"></span>
        <span className="w-1.5 h-1.5 rounded-[2px] bg-[#006A38]"></span>

        <span className="w-1.5 h-1.5 rounded-[2px] bg-[#006A38]"></span>
        <span className="w-1.5 h-1.5 rounded-[2px] bg-[#006A38]"></span>
        <span className="w-1.5 h-1.5 rounded-[2px] bg-[#006A38]"></span>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] font-bold text-gray-800 tracking-tight">INSTITUTO FEDERAL</span>
        <span className="text-[10px] text-[#006A38] font-semibold">Ceará</span>
        <span className="text-[9px] text-gray-500 font-medium">{campusName}</span>
      </div>
    </a>
  );
};
