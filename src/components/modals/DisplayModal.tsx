import { getValueByPath } from "../../libs/utils";
import { ModalAction, useModal } from "../hooks/UseModal";
import TableTypeValue from "../TableTypeValue";

type DisplayModalProps = {
	action: ModalAction;
	payload?: any;
};

export default function DisplayModal({ payload }: DisplayModalProps) {
	const { closeModal } = useModal();

	const { items, displayHeaders, title } = payload;

	return (
		<div className="w-full h-full flex flex-col justify-center items-center gap-2 relative p-4">
			<div className="w-full md:w-1/2 lg:w-1/4 bg-c2 p-4 text-c4 rounded-2xl relative">
				<div className="w-full space-y-2">
					<h1 className="bg-c1 p-8 text-center font-bold rounded-lg">
						{title}
					</h1>
					<div className="flex w-fulll text-start bg-c1 rounded-lg px-2 py-1">
						{displayHeaders.map((header: any) => (
							<h1
								key={header.label}
								className="whitespace-nowrap overflow-hidden"
								style={{
									width: header.width,
								}}
							>
								{header.label}
							</h1>
						))}
					</div>
					<div className="flex flex-col gap-1 h-100 overflow-auto">
						{items.map((item: any) => (
							<div
								key={item.id}
								className="flex justify-between text-start bg-c1/25 rounded-lg px-2 py-1"
							>
								{displayHeaders.map(
									(header: any) => (
										<h1
											key={
												header.label
											}
											className="whitespace-nowrap overflow-hidden"
											style={{
												width: header.width,
											}}
										>
											{header?.type ? (
												<TableTypeValue
													value={getValueByPath(
														item,
														header.dkey,
													)}
													type={
														header.type
													}
												/>
											) : (
												getValueByPath(
													item,
													header.dkey,
												)
											)}
										</h1>
									),
								)}
							</div>
						))}
					</div>
					<div className="flex gap-2 font-bold">
						<button
							onClick={closeModal}
							className="flex gap-2 bg-c3/75 hover:bg-c3/50 p-2 rounded-lg cursor-pointer w-full justify-center items-center"
						>
							CLOSE
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
