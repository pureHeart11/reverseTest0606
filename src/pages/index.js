import React, { useState, useMemo } from 'react';
import { Button } from 'antd';
import { LEFT_OPTIONS } from './constants';
import { router } from 'umi'
// import Arrow from './Arrow';
// import LeftArrow from './LeftArrow';
// import { PhotoProvider, PhotoView } from 'react-photo-view';
// import 'react-photo-view/dist/react-photo-view.css';

import S from './index.less';

const Index = () => {

  const imgData = ['330', '380', '430', '480', 'well', '', '', '']
  return (
    <div className={S.wrapper}>
      <div className={S.title}>吴庄铁矿通风图主页</div>
      <div className={S.list}>
        {
          imgData.map((item) => <div className={S.box}>
            {item ? <img src={`images/${item}.png`} alt="303" onClick={() => {
              router.push('/detail')
            }} /> : null}
          </div>)
        }
      </div>
    </div>
  );
};

export default Index;
