import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { APP_NAME } from 'constants/app.constant'


const Logo = (props) => {
    const { gutter, className, imgClass, style, logoWidth } = props

    return (
        <div
            className={classNames('logo mt-4', className, gutter)}
            style={{
                ...style,
                ...{ width: logoWidth },
            }}
        >
            <img
                className={imgClass} 
                src="/img/logo/logo.png"
                alt={`${APP_NAME} logo`}
            />
        </div>
    )
}

Logo.defaultProps = {
    mode: 'light',
    type: 'full',
    logoWidth: '90%',
}

Logo.propTypes = {
    mode: PropTypes.oneOf(['light', 'dark']),
    type: PropTypes.oneOf(['full', 'streamline']),
    gutter: PropTypes.string,
    imgClass: PropTypes.string,
    logoWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Logo
