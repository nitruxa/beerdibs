import React, {Component, PropTypes} from 'react';

// import IconUser from 'dibs-vg/dist/react/account-outlined';

class PreviewImage extends Component {
    constructor() {
        super();

        this.state = {
            previewImage: ''
        };
    }

    componentWillReceiveProps({image}) {
        if (image instanceof File) {
            const reader = new FileReader();

            reader.addEventListener('load', () => {
                this.setState({previewImage: reader.result});
            }, false);

            reader.readAsDataURL(image);
        } else {
            this.setState({previewImage: ''});
        }
    }

    render() {
        const {image, folderPath, placeholder} = this.props;
        const {previewImage} = this.state;

        if (previewImage) {
            return <img src={previewImage} style={{width: '100%'}} />;
        } else if (image) {
            return <img src={`${folderPath}/${image}`} style={{width: '100%'}} />;
        } else if (placeholder) {
            return placeholder;
        }

        return null;
    }
};

PreviewImage.propTypes = {
    folderPath: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    placeholder: PropTypes.node
};

export default PreviewImage;
