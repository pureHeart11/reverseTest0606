import React, { useEffect } from 'react';
import { TpWatermark } from '@/utils/tools';
import { router } from 'umi';

import S from './index.less';

const Index = () => {
  const imgData = ['well', '330', '380', '430', '480', '', '', ''];
  useEffect(() => {
    TpWatermark('苏州择智工业设计');
  }, []);
  return (
    <div className={S.wrapper}>
      <div className={S.title}>吴庄铁矿风试验模拟软件</div>
      <div className={S.list}>
        {imgData.map(item => (
          <div className={S.box}>
            {item ? (
              <img
                src={`images/directory/${item}.png`}
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
