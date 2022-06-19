import React, { useState, useMemo } from 'react';
import { router } from 'umi';

import S from './index.less';

const Index = () => {
  const imgData = ['well', '330', '380', '430', '480', '', '', ''];
  return (
    <div className={S.wrapper}>
      <div className={S.title}>吴庄铁矿通风图主页</div>
      <div className={S.list}>
        {imgData.map(item => (
          <div className={S.box}>
            {item ? (
              <img
                src={`images/${item}.png`}
                alt={item}
                onClick={() => {
                  router.push(`/detail?type=${item}`);
                }}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
