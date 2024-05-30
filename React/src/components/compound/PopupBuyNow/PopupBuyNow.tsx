function PopupBuyNow({ close }: {close: () => void }) {

    return (
        <div className="p-2 border rounded">
            <div className="d-flex justify-content-end">
                <button className="btn-close" onClick={close}></button>
            </div>
            <div className="px-5">
                <div><h2> Buy now </h2></div>
                <div>
                    Here will be form with payment
                </div>
            </div>
        </div>
    )
}

export default PopupBuyNow;