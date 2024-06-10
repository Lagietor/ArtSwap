function PopupBuyNow({ close }: {close: () => void }) {

    return (
        <div className="p-2 border border-info rounded bg-info">
            <div className="d-flex justify-content-end">
                <button className="btn-close" onClick={close}></button>
            </div>
            <div className="px-5">
                <h2 className="text-light"> Buy now </h2>
                <div className="text-light">
                    Here will be form with payment
                </div>
            </div>
        </div>
    )
}

export default PopupBuyNow;