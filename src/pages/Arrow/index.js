import React, { useEffect, useRef } from 'react';

const Arrow = ({ arrowOption = [], switchState }) => {
  const timer = useRef();
  const { positive, negative } = switchState;

  const arrowTo = (ctx, p1, p2, arrowOptions) => {
    // 初始化参数
    let opts = {
      startOffset: 5, // 起点的留空长度
      endOffset: 5, // 终点的留空长度
      offset: 0, // 偏移位（模拟动画效果用, 使用时建议将justifyAlign设为false）
      color: positive ? '#7cb305' : '#ffc53d', // 默认颜色
      activeIndex: -1, // 高亮箭头的索引, 超出回到一圈起始位置。(默认-1，不做高亮处理)
      activeColor: 'red', // 高亮颜色(Highligh Color)
      stepLength: 10, // 间隔(步长)
      justifyAlign: true, // 两端对齐(两边撑满, 配合activeIndex > 0时使用)
      arrowLength: 10, // 箭头长度(柄到顶点)
      arrowTheta: 25, // 箭头两边的夹角（度数）
      arrowHeadlen: 4, // 箭头两边斜边长度
      arrowLineWidth: 2, // 画箭头的线宽度
      lineWidth: 1, // 两点间的连丝宽度（>0时，有效）
    };

    if (arrowOptions !== undefined && arrowOptions !== null) {
      opts = Object.assign(opts, arrowOptions);
    }

    // 计两点距离
    let len = Math.floor(Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)));

    // 计算画多少个箭头(注意：最后一个箭头是不需要间隔(步长)，所以可用长度要加一个opts.stepLength)
    let loops = Math.floor(
      (len - (opts.startOffset + opts.offset + opts.endOffset) + opts.stepLength) /
      (opts.arrowLength + opts.stepLength),
    );

    // 两端对齐(两边撑满)，重算步长
    if (opts.justifyAlign === true) {
      opts.stepLength =
        (len - (opts.startOffset + opts.offset + opts.endOffset) - opts.arrowLength * loops) /
        (loops - 1);
    }

    // 高亮箭头的索引, 超出回到一圈起始位置。(用于动画效果)
    let highlightIndex = 0; // 0 - 无动画效果
    if (opts.activeIndex > 0) {
      if (opts.activeIndex % loops === 0) {
        highlightIndex = loops;
      } else {
        highlightIndex = opts.activeIndex % loops;
      }
    }

    let hudu = Math.atan2(p1.y - p2.y, p2.x - p1.x); // 计算p1, p2两点的倾斜度（弧度）。(注意参数：p1.y - p2.y, p2.x - p1.x, 请勿搞错)
    let p0 = { x: p1.x, y: p1.y }; // 原点坐标, 作为圆心。 (辅助计算箭头起点(柄)与顶点的坐标)
    let r; // 半径。 (辅助计算箭头起点(柄)与顶点的坐标)
    let color;
    for (let i = 0; i < loops; i++) {
      // 箭头起点(柄)
      r = opts.startOffset + opts.offset + (opts.arrowLength + opts.stepLength) * i; // 原点到箭头起点(柄)的半径
      p1 = {
        x: p0.x + Math.cos(hudu) * r,
        y: p0.y - Math.sin(hudu) * r,
      };

      // 箭头终点（顶点）
      r = r + opts.arrowLength; // 原点到箭头顶点(柄)的半径
      p2 = {
        x: p0.x + Math.cos(hudu) * r,
        y: p0.y - Math.sin(hudu) * r,
      };

      // 画一个箭头
      if (highlightIndex > 0 && i === highlightIndex - 1) {
        color = opts.activeColor; //高亮箭头（动画效果）
      } else {
        color = opts.color;
      }
      drawArrow(ctx, p1, p2, opts.arrowTheta, opts.arrowHeadlen, opts.arrowLineWidth, color);
    }
  };
  const drawArrow = (ctx, p1, p2, theta, headlen, width, color) => {
    theta = theta !== undefined && theta !== null ? theta : 25; //夹角(度数)
    headlen = headlen !== undefined && headlen !== null ? headlen : 6; //斜边长度
    width = width !== undefined && width !== null ? width : 1; //线宽
    color = color !== undefined && color !== null ? color : '#000'; //颜色

    let angle = (Math.atan2(p1.y - p2.y, p1.x - p2.x) * 180) / Math.PI, //倾斜度(度数)
      angle1 = ((angle + theta) * Math.PI) / 180, //夹角1
      angle2 = ((angle - theta) * Math.PI) / 180, //夹角2
      topX = headlen * Math.cos(angle1), //箭头上面点, X偏移位
      topY = headlen * Math.sin(angle1), //箭头上面点, Y偏移位
      botX = headlen * Math.cos(angle2), //箭头下面点, X偏移位
      botY = headlen * Math.sin(angle2); //箭头下面点, Y偏移位

    ctx.save();

    ctx.beginPath();

    //连结两点的线
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);

    //终点箭头的两侧
    let arrowX = p2.x + topX;
    let arrowY = p2.y + topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(p2.x, p2.y); //终点
    arrowX = p2.x + botX;
    arrowY = p2.y + botY;
    ctx.lineTo(arrowX, arrowY);

    //颜色，线宽
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();

    ctx.restore();
  };

  useEffect(() => {
    clearTimeout(timer.current);
    let myCanvas = document.getElementById('myCanvas');
    myCanvas.style.cssText = 'position:absolute;left:0;top:0;'; // 画布样式

    // 画笔（绘图对象）
    let ctx = myCanvas.getContext('2d');
    let BW = myCanvas.width;
    let BH = myCanvas.height;
    ctx.clearRect(0, 0, BW, BH); // 清空画布

    // 动画效果
    let _index = 1;
    if (!!positive) {
      timer.current = setInterval(function () {
        // 高亮效果
        arrowOption.map(({ startX, startY, endX, endY }) =>
          arrowTo(ctx, { x: startX, y: startY }, { x: endX, y: endY }, { activeIndex: _index }),
        );

        // 其他处理
        if (_index >= 50) {
          _index = 1;
        } else {
          _index++;
        }
      }, 150);
    } else if (!!negative) {
      timer.current = setInterval(function () {
        // 清空画布
        let BW = myCanvas.width;
        let BH = myCanvas.height;
        ctx.clearRect(0, 0, BW, BH); // 清空画布

        // 高亮效果
        arrowOption.map(({ startX, startY, endX, endY }) =>
          arrowTo(ctx, { x: endX, y: endY }, { x: startX, y: startY }, { activeIndex: _index }),
        );

        // 其他处理
        if (_index >= 50) {
          _index = 1;
        } else {
          _index++;
        }
      }, 150);
    }
  }, [positive, negative, arrowOption, arrowTo]);

  // open

  return <canvas id="myCanvas" width="640" height="600"></canvas>;
};

export default Arrow;
