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
            // logo={Images.indigo_i}
            // logoMargin={5}
            // logoSize={30}
            // logoBorderRadius={10}
            // logoBackgroundColor={'#2f2260'}
        />
    )
}

export default QRCODE