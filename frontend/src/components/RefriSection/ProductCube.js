import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import style from '../../constants/styleVariables';
import Draggable from 'react-draggable';

const ProductCube = ({ name, id, openProductInfoModal, removeProduct }) => {
  const [activeDrags, setActiveDrags] = useState(0);
  const [controlledPosition, setControlledPosition] = useState({ x: 0, y: 0 });
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });

  const onStart = () => {
    setActiveDrags(activeDrags + 1);
  };

  const onStop = () => {
    setActiveDrags(activeDrags - 1);
  };

  const restartPos = () => {
    setControlledPosition({ x: 0, y: 0 });
  };

  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY
    });
  };

  const onMouseDown = () => {
    removeProduct(id);
    // restartPos();
  };

  return (
    <Draggable
      position={controlledPosition}
      onstart={onStart}
      onStop={onStop}
      onMouseDown={onMouseDown}
    >
      <div
        className={css(styles.productCube)}
        onClick={() => openProductInfoModal(id)}
      >
        <div className="line-clamp">{name}</div>
      </div>
    </Draggable>
  );
};

const styles = StyleSheet.create({
  productCube: {
    width: 60,
    height: 60,
    padding: 6,
    borderRadius: 3,
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    hyphens: 'auto',
    background: style.primaryColor,
    color: 'white',
    margin: '5px 6px',
    overflow: 'hidden'
  }
});

export default ProductCube;
