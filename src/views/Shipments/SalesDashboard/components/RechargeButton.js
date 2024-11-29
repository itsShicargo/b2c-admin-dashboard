import React, { useState } from 'react'
import { Button, Notification, toast, Dialog, Input } from 'components/ui'
import {openRazorPay} from './helper';
import {razorpayCreateOrder} from '../../../../services/LiveApi';



const RechargeButton = () => {
    const [dialogIsOpen, setIsOpen] = useState(false)
    const [amount, setAmount] = useState('500')
    const [error, setError] = useState('')
    const [couponCode, setCouponCode] = useState('')
    const [discountApplied, setDiscountApplied] = useState(false)
    const [discountValue, setDiscountValue] = useState(0)
    const [isSomeConditionTrue, setIsSomeConditionTrue] = useState(false) // Example state variable
    const [isButtonDisable, setIsButtonDisable] = useState(false);

    const openDialog = () => {
        setIsOpen(true)
    }

    const closeDialog = () => {
        setIsOpen(false)
    }

    const handleInputChange = (e) => {
        let value = e.target.value.trim()
        // Check if the entered value is a valid number
        if (/^\d+$/.test(value)) {
            value = parseInt(value)
            if (value < 0) {
                value = 500
                setError('Minimum recharge amount is Rs. 500')
            } else if (value > 100000) {
                value = 100000
                setError('Maximum recharge amount is Rs. 100,000')
            } else {
                setError('')
            }
            setAmount(value.toString())
        } else {
            setError('Please enter a valid amount')
        }
    }

    const handleAmountSelect = (selectedAmount) => {
        // Convert selectedAmount to number
        const numSelectedAmount = parseInt(selectedAmount)

        // Check if selected amount exceeds 100,000
        if (numSelectedAmount > 100000) {
            setError('Maximum recharge amount is Rs. 100,000')
        } else {
            setError('')
            setAmount(selectedAmount)
        }
    }

    // const handleCouponChange = (event) => {
    //     setCouponCode(event.target.value)
    // }

    // const applyCoupon = () => {
    //     if (couponCode === 'SUMMER1') {
    //         setDiscountApplied(true)
    //         setDiscountValue(1)
    //     } else {
    //         alert('Invalid coupon code. Please try again.')
    //     }
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     applyCoupon()
    // }

    const isPayNowDisabled = amount < 500 || amount > 100000 || error !== ''

    function paymentSuccess() {
        setIsButtonDisable(false)
        if (toast) {
            toast.push(
                <Notification closable type="success" duration={2000}>
                    Wallet Recharge Successfully
                </Notification>
            )
            closeDialog()
        }
    }

    function paymentError() {
        setIsButtonDisable(false)
        if (toast) {
            toast.push(
                <Notification type="danger" duration={2000}>
                    something went wrong
                </Notification>
            )
        }
    }

    // open razorypay modal 
    const handleOpenRazorPayModal = async (e) => {
        setIsButtonDisable(true)
        e?.preventDefault();
        const orderPayload = {
            amount: Number(amount)* 100, 
            currency: "INR"
        }
        const response = await razorpayCreateOrder(orderPayload, paymentError);
        openRazorPay(response, paymentSuccess, paymentError)
    }

    return (
        <>
            <div>
                <Button
                    variant="solid"
                    className="px-2"
                    style={{
                        paddingLeft: '1rem',
                        paddingRight: '1rem',
                    }}
                    onClick={openDialog}
                >
                    Recharge
                </Button>
                {dialogIsOpen && (
                    <Dialog
                        isOpen={dialogIsOpen}
                        contentClassName="pb-0 px-0"
                        onClose={closeDialog}
                        onRequestClose={closeDialog}
                    >
                        <div className="">
                            <h3 className="mb-4 ml-4">Recharge</h3>
                        </div>
                        <div className="m-4 items-center p-2 rounded-lg shadow-md">
                            <div className="text-base font-semibold">
                                Wallet Balance:
                                <span className="text-green-500">₹0</span>
                            </div>
                        </div>
                        <div className="m-4 bg-gray-100 p-4 rounded-lg shadow-md">
                            <p>Enter Amount in multiples of 100 below</p>
                            <div className="mb-2 mt-4">
                                <Input
                                    prefix="₹"
                                    value={amount}
                                    onChange={handleInputChange}
                                />
                                {error && (
                                    <p className="text-red-500 mt-1">{error}</p>
                                )}
                                <p className="mt-2 mb-2 text-sm text-gray-600">
                                    Min value Rs.500 and Max value Rs.100,000
                                </p>
                                <div className="flex space-x-2 mt-2">
                                    <TabButton
                                        amount="500"
                                        selectedAmount={amount}
                                        onSelect={handleAmountSelect}
                                        disable={isButtonDisable}
                                    />
                                    <TabButton
                                        amount="1000"
                                        selectedAmount={amount}
                                        onSelect={handleAmountSelect}
                                        disable={isButtonDisable}
                                    />
                                    <TabButton
                                        amount="2000"
                                        selectedAmount={amount}
                                        onSelect={handleAmountSelect}
                                        disable={isButtonDisable}
                                    />
                                    <TabButton
                                        amount="3000"
                                        selectedAmount={amount}
                                        onSelect={handleAmountSelect}
                                        disable={isButtonDisable}
                                    />
                                    <TabButton
                                        amount="50000"
                                        selectedAmount={amount}
                                        onSelect={handleAmountSelect}
                                        disable={isButtonDisable}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <div className="m-4 pl-4 coupon-code">
                            <p className="mb-2">Have a coupon?</p>
                            <div>
                                <form
                                    className="flex items-center space-x-2"
                                    onSubmit={handleSubmit}
                                >
                                    <Input
                                        type="text"
                                        value={couponCode}
                                        onChange={handleCouponChange}
                                        placeholder="Enter coupon code"
                                    />
                                    <Button type="submit" variant="solid">
                                        Apply
                                    </Button>
                                </form>
                                {discountApplied && (
                                    <p>
                                        Coupon applied! Discount of{' '}
                                        {discountValue}% has been applied.
                                    </p>
                                )}
                            </div>
                        </div> */}
                        <div className="m-4 bg-gray-100 p-4 rounded-lg shadow-md">
                            <div className="flex justify-between items-center">
                                <p className="mb-2">Recharge Amount:</p>
                                <p className="text-xs font-medium mb-4">
                                    ₹{amount}.00
                                </p>
                            </div>
                            {/* <div className="flex justify-between items-center">
                                <p className="mb-2">Coupon Amount:</p>
                                <p className="text-xs font-medium">
                                    ₹
                                    {discountApplied
                                        ? (
                                              (amount * discountValue) /
                                              100
                                          ).toFixed(2)
                                        : '0.00'}
                                </p>
                            </div> */}
                            <div className="flex justify-between items-center">
                                <p className="mb-2 text-lg text-black">
                                    Payable Amount:
                                </p>
                                <p className="text-xs font-semibold">
                                    ₹
                                    {discountApplied
                                        ? (
                                              amount -
                                              (amount * discountValue) / 100
                                          ).toFixed(2)
                                        : amount}
                                    .00
                                </p>
                            </div>
                        </div>
                        <div className="text-center px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
                            <Button
                                variant="solid"
                                onClick={(e) => handleOpenRazorPayModal(e)}
                                disabled={isPayNowDisabled || isButtonDisable}
                            >
                                Pay Now
                            </Button>
                        </div>
                    </Dialog>
                )}
            </div>
        </>
    )
}

const TabButton = ({ amount, selectedAmount, onSelect, disable }) => {
    const isSelected = amount === selectedAmount

    return (
        <button
            className={`px-4 py-2 rounded-md ${
                isSelected
                    ? 'bg-purple-500 text-white'
                    : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
            }`}
            onClick={() => onSelect(amount)}
            disabled = {disable}
        >
            ₹{amount}
        </button>
    )
}

export default RechargeButton
