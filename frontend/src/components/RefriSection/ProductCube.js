import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import style from '../../constants/styleVariables';
import _ from 'lodash';
import Draggable from 'react-draggable';

const ProductCube = ({ name, id, openProductInfoModal, showRemoveConfirm }) => {
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
    setDeltaPosition({ x: 0, y: 0 });
  };

  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY
    });

    debounceOnDrag()
  };

  const onDrag = () => {
    const {x, y} = deltaPosition;
    if ((x > 70 || x < -70 || y > 70 || y < -70)) {
      restartPos();
      showRemoveConfirm(id);
    }
  };

  const debounceOnDrag = _.debounce(onDrag, 500);

  return (
    <Draggable
      position={controlledPosition}
      onstart={onStart}
      onStop={onStop}
      onDrag={handleDrag}
    >
      <div
        className={css(styles.productCube)}
        onClick={openProductInfoModal ? () => openProductInfoModal(id) : null}
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
    overflow: 'hidden',
    cursor: 'pointer'
  }
});

export default ProductCube;
