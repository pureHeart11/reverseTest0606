import React, { useState, useMemo } from 'react';
import { Button } from 'antd';
import { LEFT_OPTIONS } from './constants';
import Arrow from './Arrow';
import LeftArrow from './LeftArrow';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import S from './index.less';
const elementSize = 600;

const Index = () => {
  const [btn, setBtn] = useState(LEFT_OPTIONS);
  const [switchState, setSwitchState] = useState({
    positive: true,
    negative: false,
  });

  const isActive = useMemo(() => {
    return btn.find(({ active }) => active);
  }, [btn]);

  const handleLeftBtn = index => {
    setSwitchState({
      positive: false,
      negative: false,
    });
    const newBtn = btn.map((item, bIndex) => {
      if (index === bIndex) {
        return {
          ...item,
          active: true,
        };
      }
      return {
        ...item,
        active: false,
      };
    });
    setBtn(newBtn);
  };

  const handleSwitch = type => {
    setSwitchState(pre => ({ positive: false, negative: false, [type]: true }));
  };

  return (
    <div className={S.wrapper}>
      <div className={S.left}>
        <div className={S.btns}>
          {btn.map(({ text, active }, index) => (
            <Button ghost={!active} type="primary" key={text} onClick={() => handleLeftBtn(index)}>
              {text}
            </Button>
          ))}
        </div>
        <div className={S.leftImgs}>
          <img src={'images/leftBg.png'} alt="" className={S.leftImgs} />
          {isActive && <LeftArrow leftOption={isActive.leftOption} switchState={switchState} />}
        </div>
      </div>
      <div className={S.title}>{isActive?.text}</div>
      {isActive && (
        <div className={S.right}>
          <div className={S.rightBtn}>
            <Button
              onClick={() => handleSwitch('positive')}
              ghost
              type="success"
              className={switchState.positive && S.positive}
            >
              新风控制
            </Button>
            <Button
              onClick={() => handleSwitch('negative')}
              ghost
              type="warn"
              className={switchState.negative && S.negative}
            >
              反向吹风
            </Button>
          </div>
          <div>
            {isActive && (
              <PhotoProvider>
                <PhotoView
                  width={elementSize}
                  height={elementSize}
                  render={({ scale, attrs }) => {
                    const width = attrs.style.width;
                    const offset = (width - elementSize) / elementSize;
                    const childScale = scale === 1 ? scale + offset : 1 + offset;
                    return (
                      <div {...attrs}>
                      <div style={{ transform: `scale(${childScale})`, width: elementSize, transformOrigin: '0 0' }}>
                          <img
                            src={`images/${isActive.text}.png`}
                            alt="287"
                            style={{ height: isActive.height || 550, width: isActive.width }}
                          />
                          <Arrow
                            arrowOption={isActive.arrowOption}
                            switchState={switchState}
                            id="inCanvas"
                          />
                        </div>
                      </div>
                    );
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      src={`images/${isActive.text}.png`}
                      alt="287"
                      style={{ height: isActive.height || 550, width: isActive.width }}
                    />
                    <Arrow
                      arrowOption={isActive.arrowOption}
                      switchState={switchState}
                      id="outCanvas"
                    />
                  </div>
                </PhotoView>
              </PhotoProvider>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
