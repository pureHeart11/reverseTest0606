import React, { useState, useMemo, useRef } from 'react';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { router } from 'umi';
import cx from 'classnames';
import { LEFT_OPTIONS } from '../constants';
import Arrow from '../Arrow';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import S from './index.less';
const elementSize = 1000;

const ICON_330 = ['icon_330_1', 'icon_330_2', 'icon_330_3', 'icon_330_4', 'icon_330_5'];
const ICON_380 = ['icon_380_1', 'icon_380_2', 'icon_380_3', 'icon_380_4', 'icon_380_5'];
const ICON_430 = ['icon_430_1', 'icon_430_2'];
const initCoord = {
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
};
const initSwitch = {
  icon_330_1: true,
  icon_330_2: true,
  icon_330_3: true,
  icon_330_4: true,
  icon_330_5: true,
  icon_380_1: true,
  icon_380_2: true,
  icon_380_3: true,
  icon_380_4: true,
  icon_380_5: true,
  icon_430_1: true,
  icon_430_2: true,
  well: true,
};

const Detail = props => {
  const scroll = useRef();
  const {
    location: {
      query: { type },
    },
  } = props;
  const [switchState, setSwitchState] = useState({
    positive: false,
    negative: false,
  });
  const [options, setOptions] = useState(LEFT_OPTIONS);
  const [switchArr, setSwitchArr] = useState(initSwitch);

  const isActive = useMemo(() => {
    return options.find(item => item.text === type);
  }, [options, type]);

  const handleSwitch = type => {
    setSwitchArr(initSwitch);
    setOptions(LEFT_OPTIONS);
    setSwitchState(pre => ({ positive: false, negative: false, [type]: true }));
  };

  const handleClick = (iconType, index) => {
    console.log('options: ', options);
    console.log('----');
    const originalOption = LEFT_OPTIONS[index].arrowOption;
    const newData = JSON.parse(JSON.stringify(options));
    //330
    if (iconType === 'icon_330_1') {
      if (switchArr[iconType]) {
        newData[0].arrowOption[2] = initCoord;
        newData[0].arrowOption[3] = initCoord;
      } else {
        newData[0].arrowOption[2] = originalOption[2];
        newData[0].arrowOption[3] = originalOption[3];
      }
    }
    if (iconType === 'icon_330_2') {
      if (switchArr[iconType]) {
        if (switchState.positive) {
          newData[0].arrowOption[originalOption.length - 1] = initCoord;
          newData[0].arrowOption[originalOption.length - 2] = initCoord;
          newData[0].arrowOption[originalOption.length - 3] = initCoord;
        } else {
          newData[0].arrowOption = newData[0].arrowOption.map((item, index) => {
            if ([2, 3, 10, 11, 12, 13].includes(index)) {
              return item;
            }
            return initCoord;
          });
        }
      } else {
        if (switchState.positive) {
          if (switchArr['icon_330_3']) {
            newData[0].arrowOption[originalOption.length - 3] = originalOption[10];
          }
          if (switchArr['icon_330_3'] && switchArr['icon_330_4']) {
            newData[0].arrowOption[originalOption.length - 2] = originalOption[11];
            newData[0].arrowOption[originalOption.length - 3] = originalOption[10];
          }
          if (switchArr['icon_330_3'] && switchArr['icon_330_4'] && switchArr['icon_330_5']) {
            newData[0].arrowOption[originalOption.length - 1] = originalOption[12];
            newData[0].arrowOption[originalOption.length - 2] = originalOption[11];
            newData[0].arrowOption[originalOption.length - 3] = originalOption[10];
          }
        } else {
          if (switchArr['icon_330_3'] && switchArr['icon_330_4'] && switchArr['icon_330_5']) {
            newData[0].arrowOption = originalOption;
          }
          if (switchArr['icon_330_3'] && switchArr['icon_330_4']) {
            // newData[0].arrowOption[originalOption.length - 1] = originalOption[12];
          }
        }
      }
    }
    if (iconType === 'icon_330_3') {
      if (switchArr[iconType]) {
        if (switchState.positive) {
          newData[0].arrowOption[originalOption.length - 1] = initCoord;
          newData[0].arrowOption[originalOption.length - 2] = initCoord;
        } else {
          newData[0].arrowOption = newData[0].arrowOption.map((item, index) => {
            if ([2, 3, 11, 12, 13].includes(index)) {
              return item;
            }
            return initCoord;
          });
        }
      } else {
        if (switchState.positive) {
          if (switchArr['icon_330_2']) {
            newData[index].arrowOption[11] = originalOption[11];
          }
          if (switchArr['icon_330_2'] && switchArr['icon_330_4']) {
            newData[0].arrowOption[originalOption.length - 2] = originalOption[11];
            newData[0].arrowOption[originalOption.length - 3] = originalOption[10];
          }
          if (switchArr['icon_330_2'] && switchArr['icon_330_4'] && switchArr['icon_330_5']) {
            newData[0].arrowOption[originalOption.length - 1] = originalOption[12];
            newData[0].arrowOption[originalOption.length - 2] = originalOption[11];
            newData[0].arrowOption[originalOption.length - 3] = originalOption[10];
          }
        } else {
          if (switchArr['icon_330_2'] && switchArr['icon_330_4'] && switchArr['icon_330_5']) {
            newData[0].arrowOption = originalOption;
          }
        }
      }
    }
    if (iconType === 'icon_330_4') {
      if (switchArr[iconType]) {
        if (switchState.positive) {
          newData[0].arrowOption[originalOption.length - 1] = initCoord;
        } else {
          newData[0].arrowOption = newData[0].arrowOption.map((item, index) => {
            console.log('index: ', index);
            if ([2, 3, 12, 13].includes(index)) {
              return item;
            }
            return initCoord;
          });
        }
        // newData[0].arrowOption[originalOption.length - 1] = initCoord;
      } else {
        if (switchState.positive) {
          if (switchArr['icon_330_2'] && switchArr['icon_330_3']) {
            newData[0].arrowOption[originalOption.length - 2] = originalOption[11];
            newData[0].arrowOption[originalOption.length - 3] = originalOption[10];
          }
          if (switchArr['icon_330_2'] && switchArr['icon_330_3'] && switchArr['icon_330_5']) {
            newData[0].arrowOption[originalOption.length - 1] = originalOption[12];
            newData[0].arrowOption[originalOption.length - 2] = originalOption[11];
            newData[0].arrowOption[originalOption.length - 3] = originalOption[10];
          }
        } else {
          if (switchArr['icon_330_3'] && switchArr['icon_330_5']) {
            newData[0].arrowOption[originalOption.length - 1] = originalOption[12];
            newData[0].arrowOption[originalOption.length - 2] = originalOption[11];
            newData[0].arrowOption[originalOption.length - 3] = originalOption[10];
          }
          if (switchArr['icon_330_2'] && switchArr['icon_330_3'] && switchArr['icon_330_5']) {
            newData[0].arrowOption = originalOption;
          }
        }
      }
    }
    if (iconType === 'icon_330_5') {
      if (switchArr[iconType]) {
        newData[0].arrowOption[originalOption.length - 1] = initCoord;
      } else {
        if (switchState.positive) {
          if (switchArr['icon_330_2'] && switchArr['icon_330_3']) {
            newData[0].arrowOption[originalOption.length - 2] = originalOption[11];
            newData[0].arrowOption[originalOption.length - 3] = originalOption[10];
          }
          if (switchArr['icon_330_2'] && switchArr['icon_330_3'] && switchArr['icon_330_4']) {
            newData[0].arrowOption[originalOption.length - 1] = originalOption[12];
            newData[0].arrowOption[originalOption.length - 2] = originalOption[11];
            newData[0].arrowOption[originalOption.length - 3] = originalOption[10];
          }
        } else {
          // if (switchArr['icon_330_5']) {
          //   newData[0].arrowOption[originalOption.length - 1] = originalOption[12];
          // }
          if (switchArr['icon_330_4']) {
            newData[0].arrowOption[originalOption.length - 1] = originalOption[12];
            newData[0].arrowOption[originalOption.length - 2] = originalOption[11];
          }
          if (switchArr['icon_330_2'] && switchArr['icon_330_3'] && switchArr['icon_330_4']) {
            newData[0].arrowOption = originalOption;
          }
        }
      }
    }
    // 430
    if (iconType === 'icon_430_1') {
      if (switchArr[iconType]) {
        if (switchState.positive) {
          newData[index].arrowOption[3] = initCoord;
          newData[index].arrowOption[4] = initCoord;
        } else {
          newData[index].arrowOption[0] = initCoord;
          newData[index].arrowOption[1] = initCoord;
          newData[index].arrowOption[2] = initCoord;
        }
      } else {
        if (switchArr['icon_430_2']) {
          newData[index].arrowOption = originalOption;
        }
      }
    }
    if (iconType === 'icon_430_2') {
      if (switchArr[iconType]) {
        if (switchState.positive) {
          newData[index].arrowOption[4] = initCoord;
        } else {
          newData[index].arrowOption[0] = initCoord;
          newData[index].arrowOption[1] = initCoord;
          newData[index].arrowOption[2] = initCoord;
          newData[index].arrowOption[3] = initCoord;
        }
      } else {
        if (switchArr['icon_430_1']) {
          newData[index].arrowOption = originalOption;
        }
      }
    }

    //380
    if (iconType === 'icon_380_1') {
      if (switchArr[iconType]) {
        if (switchState.positive) {
          newData[index].arrowOption[3] = initCoord;
          newData[index].arrowOption[4] = initCoord;
        } else {
          newData[index].arrowOption[2] = initCoord;
        }
      } else {
        if (switchState.positive) {
          newData[index].arrowOption[3] = originalOption[3];
          newData[index].arrowOption[4] = originalOption[4];
        } else {
          newData[index].arrowOption[2] = originalOption[2];
        }
      }
    }

    if (iconType === 'icon_380_2') {
      if (switchArr[iconType]) {
        if (switchState.positive) {
          newData[index].arrowOption[8] = initCoord;
          newData[index].arrowOption[9] = initCoord;
          newData[index].arrowOption[10] = initCoord;
        } else {
          newData[index].arrowOption[5] = initCoord;
          newData[index].arrowOption[19] = initCoord;
          newData[index].arrowOption[20] = initCoord;
        }
      } else {
        if (switchState.positive) {
          newData[index].arrowOption[8] = originalOption[8];
          newData[index].arrowOption[9] = originalOption[9];
          newData[index].arrowOption[10] = originalOption[10];
        } else {
          if (switchArr['icon_380_4'] && switchArr['icon_380_5']) {
            newData[index].arrowOption[5] = originalOption[5];
            newData[index].arrowOption[19] = originalOption[19];
            newData[index].arrowOption[20] = originalOption[20];
          }
        }
      }
    }

    if (iconType === 'icon_380_3') {
      if (switchArr[iconType]) {
        if (switchState.positive) {
        } else {
          newData[index].arrowOption[8] = initCoord;
          newData[index].arrowOption[9] = initCoord;
          newData[index].arrowOption[10] = initCoord;
        }
      } else {
        if (switchState.positive) {
        } else {
          if (switchArr['icon_380_4'] && switchArr['icon_380_5']) {
            newData[index].arrowOption[8] = originalOption[8];
            newData[index].arrowOption[9] = originalOption[9];
            newData[index].arrowOption[10] = originalOption[10];
          }
        }
      }
    }

    if (iconType === 'icon_380_4') {
      if (switchArr[iconType]) {
        if (switchState.positive) {
          newData[index].arrowOption[16] = initCoord;
          newData[index].arrowOption[17] = initCoord;
        } else {
          newData[index].arrowOption = newData[index].arrowOption.map((item, index, arr) => {
            if (![0, 1, 2, 3, 16, 17].includes(index)) {
              return initCoord;
            }
            return item;
          });
        }
      } else {
        if (switchState.positive) {
          if (switchArr['icon_380_5']) {
            newData[index].arrowOption[16] = originalOption[16];
            newData[index].arrowOption[17] = originalOption[17];
          } else {
            newData[index].arrowOption[16] = originalOption[16];
          }
        } else {
          if (switchArr['icon_380_2'] && switchArr['icon_380_3'] && switchArr['icon_380_5']) {
            newData[index].arrowOption = originalOption;
          }
        }
      }
    }

    if (iconType === 'icon_380_5') {
      if (switchArr[iconType]) {
        if (switchState.positive) {
          newData[index].arrowOption[17] = initCoord;
        } else {
          newData[index].arrowOption = newData[index].arrowOption.map((item, index, arr) => {
            // if (index === arr.length - 1) {
            //   return item;
            // }
            return initCoord;
          });
        }
      } else {
        if (switchState.positive) {
          if (switchArr['icon_380_4']) {
            newData[index].arrowOption[16] = originalOption[16];
            newData[index].arrowOption[17] = originalOption[17];
          }
        } else {
          if (switchArr['icon_380_2'] && switchArr['icon_380_3'] && switchArr['icon_380_4']) {
            newData[index].arrowOption = originalOption;
          }
        }
      }
    }

    console.log('newData: ', newData);
    setOptions(newData);
    setSwitchArr(pre => ({ ...pre, [iconType]: !pre[iconType] }));
    return false;
  };

  const switchItem = () => {
    return (
      <div className={S.switch}>
        {type === '330' && (
          <>
            {ICON_330.map(item => (
              <PoweroffOutlined
                className={cx(S.icon, S[item], !switchArr[item] && S.close)}
                onClick={() => handleClick(item, 0)}
              />
            ))}
          </>
        )}
        {type === '380' && (
          <>
            {ICON_380.map(item => (
              <PoweroffOutlined
                className={cx(S.icon, S[item], !switchArr[item] && S.close)}
                onClick={() => handleClick(item, 1)}
              />
            ))}
          </>
        )}
        {type === '430' && (
          <>
            {ICON_430.map(item => (
              <PoweroffOutlined
                className={cx(S.icon, S[item], !switchArr[item] && S.close)}
                onClick={() => handleClick(item, 2)}
              />
            ))}
          </>
        )}
      </div>
    );
  };
  const renderItem = canvas => {
    return (
      <div>
        <img ref={scroll} src={`images/${type}.png`} alt={type} style={{ width: 1150 }} />
        <Arrow arrowOption={isActive.arrowOption} switchState={switchState} id={canvas} />
      </div>
    );
  };
  return (
    <div className={S.wrapper}>
      <div className={S.center}>
        <div>
          {isActive && (
            <PhotoProvider>
              <PhotoView
                width={elementSize}
                height={elementSize}
                style={{ display: 'flex', alignItem: 'center' }}
                render={({ scale, attrs }) => {
                  const width = attrs.style.width;
                  const offset = (width - elementSize) / elementSize;
                  const childScale = scale === 1 ? scale + offset : 1 + offset;
                  return (
                    <div {...attrs}>
                      <div
                        style={{
                          transform: `scale(${childScale})`,
                          width: elementSize,
                          transformOrigin: '0 0',
                        }}
                      >
                        {renderItem('inCanvas')}
                        {switchItem()}
                      </div>
                    </div>
                  );
                }}
              >
                {renderItem('outCanvas')}
              </PhotoView>
            </PhotoProvider>
          )}
          {switchItem()}
        </div>

        <div className={S.btn}>
          <Button onClick={() => handleSwitch('positive')} size="large">
            正常通风
          </Button>
          <Button onClick={() => handleSwitch('negative')} size="large">
            反向通风
          </Button>
        </div>
        <Button size="large" className={S.goBack} onClick={() => router.push('/')}>
          返回目录
        </Button>
        {/* <div className={S.arrow}>
          <Arrow arrowOption={isActive.arrowOption} switchState={switchState} id="outCanvas" />
        </div> */}
      </div>
    </div>
  );
};

export default Detail;
