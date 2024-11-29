import React from 'react'
import { Card } from 'components/ui'
import NumberFormat from 'react-number-format'
import { useSelector } from 'react-redux'
import RechargeButton from './RechargeButton'

const StatisticCard = ({ data = {}, label, valuePrefix, date, Button }) => {
    return (
        <Card>
            <h6 className="font-semibold mb-4 text-sm">{label}</h6>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-bold">
                        <NumberFormat
                            displayType="text"
                            value="0"
                            // thousandSeparator
                            // prefix={valuePrefix}
                        />
                    </h3>
                    <p>
                    In Transit
                        {/* <span className="font-semibold">
                            {dayjs(date).format('DD MMM')}
                        </span> */}
                    </p>
                </div>
                {Button && (
                    <Button value={data.growShrink} suffix="%" >Recharge</Button>
                )}
                {/* <GrowShrinkTag value={data.growShrink} suffix="%" /> */}
            </div>
        </Card>
    )
}

const Statistic = ({ data = {} }) => {
    const startDate = useSelector(
        (state) => state.salesDashboard.state.startDate
    )

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <StatisticCard
                data={data.revenue}
                valuePrefix="$"
                label="Shipments"
                tagSuffix="%"
                // date={startDate}
            />
            <StatisticCard
                data={data.orders}
                label="NDR Shipments"
                tagSuffix="%"
                date={startDate}
            />
            <StatisticCard
                data={data.purchases}
                valuePrefix="$"
                label="Wallet Summary"
                date={startDate}
                Button={RechargeButton} 
            />
        </div>
    )
}

export default Statistic
