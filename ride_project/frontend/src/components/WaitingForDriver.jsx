import React from 'react'

const WaitingForDriver = (props) => {
    return (
        <div>
            <div>
                <h5 className='p-1 text-center absolute top-0 w-[93%]' onClick={() => {
                    props.waitingForDriver(false)
                }}><i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5>

                <div className='flex items-center justify-between'>
                    <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />

                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullname.firstname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
                        <p className='text-sm text-gray-600'>Toyota Fortuner Legender</p>
                        <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>
                    </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>

                    <div className='w-full mt-5'>
                        <div className='flex items-center gap-5 p-3 border-b-1'>
                            <i className="text-lg ri-map-pin-user-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>562/11-A</h3>
                                <p className='text-gray-600 text-sm -m-1'>{props.ride?.pickup}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3 border-b-1'>
                            <i className="text-lg ri-map-pin-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>562/11-A</h3>
                                <p className='text-gray-600 text-sm -m-1'>{props.ride?.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3 '>
                            <i className="text-lg ri-currency-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                                <p className='text-gray-600 text-sm -m-1'>Cash Cash</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default WaitingForDriver