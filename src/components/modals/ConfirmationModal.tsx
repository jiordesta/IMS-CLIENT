import { useState } from "react";
import { ModalAction, useModal } from "../hooks/UseModal";

type ConfirmationModalProps = {
	action: ModalAction;
	payload?: any;
};

export default function ConfirmationModal({
	action,
	payload,
}: ConfirmationModalProps) {
	const { closeModal } = useModal();

	const handleConfirmAction = () => {
		setLoading(true);
		payload?.callBack().then(() => {
			closeModal();
			setLoading(false);
		});
	};

	const [isLoading, setLoading] = useState(false);

	return (
		<div className="w-full h-full flex flex-col justify-center items-center gap-2 relative p-4">
			<div className="w-full md:w-1/2 lg:w-1/4 bg-c2 p-4 text-c4 rounded-2xl relative">
				<div className="w-full space-y-8">
					<h1 className="bg-c1 p-8 text-center font-bold rounded-lg">
						{"CONFIRM " + action}
					</h1>
					<div className="flex gap-2 font-bold">
						<button
							onClick={handleConfirmAction}
							className="flex gap-2 bg-c3/75 hover:bg-c3/50 p-2 rounded-lg cursor-pointer w-full justify-center items-center"
						>
							<img
								src="/icons/yes.svg"
								width={20}
								alt=""
							/>
							CONFIRM
						</button>
						<button
							onClick={closeModal}
							className="flex gap-2 bg-c3/75 hover:bg-c3/50 p-2 rounded-lg cursor-pointer w-full justify-center items-center"
						>
							<img
								src="/icons/no.svg"
								width={20}
								alt=""
							/>
							CANCEL
						</button>
					</div>
				</div>
				{isLoading && (
					<div className="w-full h-full bg-black/50 rounded-xl inset-0 absolute flex justify-center items-center">
						<img
							src="/icons/loading.svg"
							alt=""
							width={75}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
