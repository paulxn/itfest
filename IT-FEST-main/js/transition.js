export default function setTransition(duration, byController) {
    const swiper = this;
  
    if (!swiper.params.cssMode) {
      swiper.$wrapperEl.transition(duration);
    }
  
    swiper.emit('setTransition', duration, byController);
  }

  export default function transitionEmit({ swiper, runCallbacks, direction, step }) {
    const { activeIndex, previousIndex } = swiper;
    let dir = direction;
    if (!dir) {
      if (activeIndex > previousIndex) dir = 'next';
      else if (activeIndex < previousIndex) dir = 'prev';
      else dir = 'reset';
    }
  
    swiper.emit(`transition${step}`);
  
    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit(`slideResetTransition${step}`);
        return;
      }
      swiper.emit(`slideChangeTransition${step}`);
      if (dir === 'next') {
        swiper.emit(`slideNextTransition${step}`);
      } else {
        swiper.emit(`slidePrevTransition${step}`);
      }
    }
  }

  import transitionEmit from './transitionEmit.js';

export default function transitionEnd(runCallbacks = true, direction) {
  const swiper = this;
  const { params } = swiper;
  swiper.animating = false;
  if (params.cssMode) return;
  swiper.setTransition(0);

  transitionEmit({ swiper, runCallbacks, direction, step: 'End' });
}

import transitionEmit from './transitionEmit.js';

export default function transitionStart(runCallbacks = true, direction) {
  const swiper = this;
  const { params } = swiper;
  if (params.cssMode) return;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }

  transitionEmit({ swiper, runCallbacks, direction, step: 'Start' });
}
