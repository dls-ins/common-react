import React, { FunctionComponent, ReactElement, useContext } from 'react';
import s from './Apply.module.scss';
import { useTheme } from '@catoms/Theme';
import { classNameFind } from '@common/utils';

export interface ApplyProps {
  to?: any;
  depth_max?: number; //
}

/**
 * Clones all elements in children while merging props
 * @param to: Which component type to apply the changes to.
 * @param depth_max: Max depth of modifier, -1 means all, 0 means direct children.
 */
const Apply: FunctionComponent<ApplyProps & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  to,
  depth_max,
  ...props
}) => {
  const theme = useTheme().name;
  if (typeof depth_max === 'undefined') depth_max = 0;

  const mergeProps = (child: ReactElement, depth): any => {
    const p = child.props;
    if (to && child.type !== to) return p;
    // if(typeof depth_max !== 'undefined')if(depth_max < depth)return p;

    let a = Object();
    const m = (k, b, a) => {
      switch (k) {
        case 'className':
          return b + ' ' + a;
        default:
          switch (typeof b) {
            case 'string':
              return b + ' ' + a;
            default:
              console.error(`Can't handle key ${k}`);
              return b;
          }
      }
    };
    Object.entries(props).forEach(([k, v]) => (a[k] = a[k] ? m(k, a[k], v) : v));
    return a;
  };

  const mapChildren = (c, depth = 0) => {
    if (typeof depth_max !== 'undefined' && depth_max >= 0) if (depth_max < depth) return c;
    if (!c) return undefined;
    return React.Children.toArray(c).map((child) =>
      React.isValidElement(child)
        ? React.cloneElement(child, {
            ...mergeProps(child, depth),
            children: mapChildren(child.props.children, depth + 1),
          })
        : child
    );
  };

  console.log(children);
  return mapChildren(children);
};

export default Apply;