import { getValueByPath } from "../../libs/utils";
import { ModalAction, useModal } from "../hooks/UseModal";

type DisplayModalProps = {
	action: ModalAction;
	payload?: any;
};

export default function DisplayModal({ payload }: DisplayModalProps) {
	const { closeModal } = useModal();

	const { items, displayHeaders, title } = payload;

	return (
		<div className="w-full h-full relative flex flex-col justify-center items-center gap-2 p-2">
			<div className="w-full md:w-1/2 lg:w-1/4 bg-c2 p-2 text-c4 rounded-lg relative">
				<div className="w-full space-y-2">
					<h1 className="bg-c1 p-8 text-center font-bold rounded-lg">
						{title}
					</h1>
					<div className="grid grid-cols-24 w-full text-start bg-c1 rounded-lg p-2">
						{displayHeaders.map((header: any) => (
							<h1
								key={header.label}
								className="whitespace-nowrap overflow-hidden text-start sticky top-0 font-bold uppercase flex items-center"
								style={{
									gridColumn: `span ${header.col} / span ${header.col}`,
								}}
							>
								{header.label}
							</h1>
						))}
					</div>
					<div className="space-y-2 h-100 overflow-auto">
						{items.map((item: any, index: number) => {
							return (
								<div
									key={index}
									className="grid grid-cols-24 bg-c1/25 rounded-lg p-2"
								>
									{displayHeaders.map(
										(header: any) => (
											<h1
												key={
													header.label
												}
												className="whitespace-nowrap overflow-hidden"
												style={{
													gridColumn: `span ${header.col} / span ${header.col}`,
												}}
											>
												{header.typeValueRenderer
													? header.typeValueRenderer(
															getValueByPath(
																item,
																header.dkey,
																header.type,
															),
														)
													: getValueByPath(
															item,
															header.dkey,
														)}
											</h1>
										),
									)}
								</div>
							);
						})}
					</div>

					<div className="flex gap-2">
						<button
							className="bg-c3/75 hover:bg-c3/50 w-full p-2 rounded-lg cursor-pointer"
							onClick={closeModal}
						>
							CLOSE
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
