import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// Define prop types for Iconify component
interface IconifyProps {
    icon: string;
    width?: number | string;
    sx?: React.CSSProperties;
}

// Define forwardRef render function with correct ref type
const Iconify = forwardRef<SVGSVGElement, IconifyProps>(
    ({ icon, width = 20, sx, ...other }, ref) => (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={width}
            height={width}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            strokeMiterlimit="10"
            style={{ width, height: width, ...sx }}
            {...other}
        >
            <use xlinkHref={`#${icon}`} />
        </svg>
    )
);

// Define prop types using PropTypes
Iconify.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    icon: PropTypes.string.isRequired,
    sx: PropTypes.object,
};

// Export Iconify component
export default Iconify;
