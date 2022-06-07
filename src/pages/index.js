import React, { useEffect, useState, useMemo } from 'react';
import { Button } from 'antd';
// import { useUpdate } from 'ahooks';
import { LEFT_OPTIONS } from './constants';
import Arrow from './Arrow';
import LeftArrow from './LeftArrow';
// import { PhotoProvider, PhotoView } from 'react-photo-view';
// import 'react-photo-view/dist/react-photo-view.css';

import S from './index.less';

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

  useEffect(() => {
    //给页面绑定滑轮滚动事件
    let scrollFn = function (e) {
      if (window.scrollTimer) return;
      // 如果有需要阻止默认事件或事件冒泡的可以打开
      // e.preventDefault();
      // e.stopPropagation();
      window.scrollTimer = setTimeout(() => {
        e = e || window.event;
        let isGoDown = true;
        if (e.wheelDelta) {
          //第一步：先判断浏览器IE，谷歌滑轮事件
          if (e.wheelDelta > 0) {
            //当滑轮向上滚动时
            isGoDown = false;
          }
        } else if (e.detail) {
          //Firefox滑轮事件
          if (e.detail < 0) {
            //当滑轮向下滚动时
            isGoDown = false;
          }
        }
        if (isGoDown) {
          //向下滚动，执行放大元素
          zoomInFn();
        } else {
          //向上滚动，执行缩小元素
          zoomOutFn();
        }
        clearTimeout(window.scrollTimer);
        window.scrollTimer = null;
      }, 100);
    };
    //设定元素元大小为100；
    let zoom = 100;
    //缩小
    let zoomInFn = function () {
      zoom -= 10;
      if (zoom < 20) {
        zoom = 20;
      }
      setDivScale();
    };
    //放大
    let zoomOutFn = function () {
      zoom += 10;
      if (zoom > 200) {
        zoom = 200;
      }
      setDivScale();
    };
    //设置元素放大倍率样式
    const zoomBox = document.getElementById('zoomBox');
    let setDivScale = function () {
      let scale = zoom / 50;
      zoomBox.setAttribute('style', 'transform : scale(' + scale + ')');
    };

    //给页面绑定鼠标滚动事件
    if (document.addEventListener) {
      //firefox
      zoomBox.addEventListener('DOMMouseScroll', scrollFn, false);
    }
    zoomBox.addEventListener('mousewheel', scrollFn, false);
  }, []);

  return (
    <div className={S.wrapper}>
      {/* <div className={S.title}>反风实验计算机模拟软件</div> */}
      <div className={S.left}>
        <div className={S.btns}>
          {btn.map(({ text, active }, index) => (
            <Button ghost={!active} type="primary" key={text} onClick={() => handleLeftBtn(index)}>
              {text}
            </Button>
          ))}
        </div>
        <div className={S.leftImgs}>
          <img src={require('../assets/leftBg.png')} alt="" />
          {
            isActive &&   <LeftArrow leftOption={isActive.leftOption} switchState={switchState}/>
          }
        </div>

      </div>
      <div className={S.title}>{isActive?.text}</div>
      {isActive && (
        <div className={S.right}>
          <div className={S.rightBtn}>
            <Button
              onClick={() => handleSwitch('positive')}
              // disabled={switchState.positive}
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
              <div id="zoomBox">
                <img
                  src={require(`../assets/${isActive.text}.png`)}
                  alt="287"
                  style={{ height: isActive.height || 550 }}
                />
                <Arrow arrowOption={isActive.arrowOption} switchState={switchState} />
              </div>
              // <PhotoProvider>
              //   {/* <PhotoView src={require(`../assets/${isActive.text}.png`)}>
              //   </PhotoView> */}
              //   <PhotoView
              //     width={elementSize}
              //     height={elementSize}
              //     render={({ scale, attrs }) => {
              //       const width = attrs.style.width;
              //       const offset = (width - elementSize) / elementSize;
              //       const childScale = scale === 1 ? scale + offset : 1 + offset;
              //       return (
              //         <div {...attrs}>
              //           <div style={{ transform: `scale(${childScale})` }}>
              //             <img
              //               src={require(`../assets/${isActive.text}.png`)}
              //               alt="287"
              //               style={{ height: 500 }}
              //             />
              //             <Arrow arrowOption={isActive.arrowOption} switchState={switchState} />
              //           </div>
              //         </div>
              //       );
              //     }}
              //   >
              //     <div>
              //       <img
              //         src={require(`../assets/${isActive.text}.png`)}
              //         alt="287"
              //         style={{ zIndex: 999 }}
              //       />
              //       <Arrow arrowOption={isActive.arrowOption} switchState={switchState} />
              //     </div>
              //   </PhotoView>
              // </PhotoProvider>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
