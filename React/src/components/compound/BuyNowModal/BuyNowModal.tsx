import Popup from 'reactjs-popup';
import PopupBuyNow from '../PopupBuyNow/PopupBuyNow';

function BuyNowModal({ open, handleClose }) {
    return (
        <Popup
            open={open}
            modal
            nested
            overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
            contentStyle={{
                width: '80%',
                maxWidth: '400px',
                background: '#fff',
                borderRadius: '5px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)'
            }}
            onClose={handleClose}
        >
            {(close) => <PopupBuyNow close={close} />}
        </Popup>
    );
}

export default BuyNowModal;