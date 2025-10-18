import { Vortex } from "react-loader-spinner"

const Loader = () => {
    return (
        <div className="flex items-center justify-center" style={{ height: '80vh' }}>
            <Vortex
                visible={true}
                height="120"
                width="120"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
            />
        </div>
    )
}
export default Loader