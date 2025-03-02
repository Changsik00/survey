import React from 'react';

const ResponsiveTest: React.FC = () => {
  return (
    <div className="p-4 border border-dashed border-gray-400">
      {/* 모바일: 기본적으로 보이고, 태블릿 이상에서는 숨김 */}
      <div className="block tablet:hidden">
        <p className="text-lg">Mobile View</p>
      </div>
      {/* 태블릿: 태블릿 이상부터 보이고, 데스크탑에서는 숨김 */}
      <div className="hidden tablet:block desktop:hidden">
        <p className="text-xl">Tablet View</p>
      </div>
      {/* 데스크탑: 데스크탑 이상에서만 보임 */}
      <div className="hidden desktop:block">
        <p className="text-2xl">Desktop View</p>
      </div>
    </div>
  );
};

export default ResponsiveTest;
