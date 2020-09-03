import { CSSMotionProps } from 'rc-motion';

// ================== Collapse Motion ==================
const getCollapsedHeight: any = () => ({ height: 0, opacity: 0 });
const getRealHeight: any = (node: any) => ({ height: node.scrollHeight, opacity: 1 });
const getCurrentHeight: any = (node: any) => ({ height: node.offsetHeight });
const skipOpacityTransition: any = (_: any, event: any) =>
  (event as TransitionEvent).propertyName === 'height';

const collapseMotion: CSSMotionProps = {
  motionName: 'ant-motion-collapse',
  onAppearStart: getCollapsedHeight,
  onEnterStart: getCollapsedHeight,
  onAppearActive: getRealHeight,
  onEnterActive: getRealHeight,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeight,
  onAppearEnd: skipOpacityTransition,
  onEnterEnd: skipOpacityTransition,
  onLeaveEnd: skipOpacityTransition,
  motionDeadline: 500,
};

export default collapseMotion;
