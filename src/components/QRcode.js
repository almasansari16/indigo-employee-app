import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import Images from '../theme/Images';

const QRCODE = ({ value, getRef }) => {
    return (
        <QRCode
            value={value}
            size={250}
            color="black"
            backgroundColor="white"
            getRef={getRef}
            logo={Images.indigo_i} // or logo={{uri: base64logo}}
            logoMargin={2}
            logoSize={20}
            logoBorderRadius={10}
            logoBackgroundColor={'transparent'}
        />
    )
}

export default QRCODE