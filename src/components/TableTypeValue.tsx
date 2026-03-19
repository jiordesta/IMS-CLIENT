import { OrderStatus, OrderType, TransactionStatus } from "../libs/enums";

export default function TableTypeValue({ value, type }: any) {
	return (
		<>
			{type === OrderStatus && (
				<>
					{value === OrderStatus.PENDING && (
						<div className="flex justify-start">
							<h1 className="bg-blue-300/50 px-1 rounded-lg">
								Pending
							</h1>
						</div>
					)}
					{value === OrderStatus.COMPLETED && (
						<div className="flex justify-start">
							<h1 className="bg-green-300/50 px-1 rounded-lg">
								Completed
							</h1>
						</div>
					)}
					{value === OrderStatus.CANCELLED && (
						<div className="flex justify-start">
							<h1 className="bg-red-300/50 px-1 rounded-lg">
								Cancelled
							</h1>
						</div>
					)}
				</>
			)}
			{type === OrderType && (
				<>
					{value === OrderType.LOADING && (
						<div className="flex justify-start">
							<h1 className="bg-yellow-300/50 px-1 rounded-lg">
								Loading
							</h1>
						</div>
					)}
					{value === OrderType.PAHABOL && (
						<div className="flex justify-start">
							<h1 className="bg-red-300/50 px-1 rounded-lg">
								PAHABOL
							</h1>
						</div>
					)}
					{value === OrderType.ADDITIONAL && (
						<div className="flex justify-start">
							<h1 className="bg-black-300/50 px-1 rounded-lg">
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
							<h1 className="bg-green-300/50 px-1 rounded-lg">
								COMPLETED
							</h1>
						</div>
					)}
					{value === TransactionStatus.PENDING && (
						<div className="flex justify-start">
							<h1 className="bg-blue-300/50 px-1 rounded-lg">
								PENDING
							</h1>
						</div>
					)}
				</>
			)}
		</>
	);
}
