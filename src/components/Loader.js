import React from 'react';
import Main_loader from '../images/loader.gif';
import Image_loader from '../images/image_loader.gif';
import PropTypes from 'prop-types';


const LoaderType = {
    Main_loader: Main_loader,
    Image_loader: Image_loader
}

const Loader = ({
    width,
    height,
    imageType = 'Main_loader'
}) => {
    return <img src={LoaderType[imageType]} width={width} height={height} className="loader mx-auto d-block"/>
}

//https://reactjs.org/docs/typechecking-with-proptypes.html
Loader.propTypes = { //to warn developers width and height must fill in when using the function, the errors will occur in console.log
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    imageType: PropTypes.string,
}

export default Loader