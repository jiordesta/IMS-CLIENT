import {
	HEADERTYPES,
	OrderStatus,
	OrderType,
	TransactionStatus,
} from "../libs/enums";

export default function GlobalValueRenderer({ value, type }: any) {
	return (
		<>
			{type === HEADERTYPES.ORDERSTATUS && (
				<>
					{value === OrderStatus.PENDING && (
						<div className="flex justify-start">
							<h1 className="bg-blue-300/50 px-1 rounded-sm">
								PENDING
							</h1>
						</div>
					)}
					{value === OrderStatus.COMPLETED && (
						<div className="flex justify-start">
							<h1 className="bg-green-300/50 px-1 rounded-sm">
								COMPLETED
							</h1>
						</div>
					)}
					{value === OrderStatus.CANCELLED && (
						<div className="flex justify-start">
							<h1 className="bg-red-300/50 px-1 rounded-sm">
								CANCELLED
							</h1>
						</div>
					)}
				</>
			)}
			{type === HEADERTYPES.ORDERTYPE && (
				<>
					{value === OrderType.LOADING && (
						<div className="flex justify-start">
							<h1 className="bg-yellow-300/50 px-1 rounded-sm">
								LOADING
							</h1>
						</div>
					)}
					{value === OrderType.PAHABOL && (
						<div className="flex justify-start">
							<h1 className="bg-red-300/50 px-1 rounded-sm">
								PAHABOL
							</h1>
						</div>
					)}
					{value === OrderType.ADDITIONAL && (
						<div className="flex justify-start">
							<h1 className="bg-black-300/50 px-1 rounded-sm">
								ADDITIONAL
							</h1>
						</div>
					)}
				</>
			)}
			{type === TransactionStatus && (
				<>
					{value === TransactionStatus.COMPLETED && (
						<div className="flex justify-start">
							<h1 className="bg-green-300/50 px-1 rounded-sm">
								COMPLETED
							</h1>
						</div>
					)}
					{value === TransactionStatus.PENDING && (
						<div className="flex justify-start">
							<h1 className="bg-blue-300/50 px-1 rounded-sm">
								PENDING
							</h1>
						</div>
					)}
				</>
			)}
		</>
	);
}
