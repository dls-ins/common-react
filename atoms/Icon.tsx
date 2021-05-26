import { useTheme } from '@catoms/Theme';
import { classNameFind } from '@common/utils';
import React, { FunctionComponent } from 'react';
import { IconType } from 'react-icons';
import { IconBaseProps } from 'react-icons/lib';
import s from './Icon.module.scss';

export interface IconProps {
    icon: IconType;
}

const Icon: FunctionComponent<IconProps & IconBaseProps> = (props) => {
    const theme = useTheme().name;
    let { className, icon: IconI, ...others } = props;
    className = classNameFind(s, `atom`, 'dup', theme, className);

    return (
        <IconI className={className} {...others}>
            {' '}
            {props.children}{' '}
        </IconI>

        // <div style={{ width: size, height: size }} className={className} {...others}>
        // 	<IconI />
        // 	{props.children}
        // </div>
    );
};

export default Icon;
