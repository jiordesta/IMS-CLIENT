import { useState, type Dispatch, type SetStateAction } from "react";
import toast from "react-hot-toast";
import { getValueByPath } from "../../libs/utils";
import DatePicker from "../inputs/DatePicker";

type GlobalTableProps = {
	data: any;
	headers: any;
	edit?: (item: any) => void;
	del?: (id: number) => void;
	add?: () => void;
	refresh?: () => void;
	delivery?: () => void;
	assign?: (data: any) => void;
	done?: (id: number) => void;
	showLoading: boolean;
	disableSelect?: boolean;
	filters?: any;
	setFilters?: Dispatch<SetStateAction<any>>;
	renderTypeValue?: (value: any, type: any) => React.ReactNode;
	renderListButton?: (items: any[]) => React.ReactNode;
};

export default function GlobalTable({
	data,
	headers,
	edit,
	del,
	add,
	refresh,
	assign,
	done,
	showLoading,
	disableSelect,
	renderTypeValue,
	renderListButton,
	filters,
	setFilters,
}: GlobalTableProps) {
	const [selected, setSelected] = useState<any>();

	const handleEdit = () => {
		if (!selected) {
			toast.error("Select an Item First!");
			return;
		}
		edit?.(selected);
	};

	const handleAdd = () => {
		add?.();
	};

	const handleDelete = () => {
		if (!selected) {
			toast.error("Select an Item First!");
			return;
		}
		del?.(selected.id);
	};

	const handleDone = () => {
		if (!selected) {
			toast.error("Select an Item First!");
			return;
		}
		done?.(selected.id);
	};

	const handleTableRefresh = () => {
		refresh?.();
	};

	const handleSelect = (item: any) => {
		if (disableSelect) return;

		if (selected?.id === item?.id) {
			setSelected(undefined);
			return;
		}

		setSelected(item);
	};

	const handleAssign = () => {
		if (!selected) {
			toast.error("Select an Item First!");
			return;
		}
		assign?.(selected);
	};

	const Item = ({ item }: any) => {
		return (
			<div
				className={`${selected?.id === item.id ? "bg-c2/50" : "bg-c2/25"}  rounded-lg p-2 ${!disableSelect && "cursor-pointer"} z-40`}
				onClick={() => handleSelect(item)}
			>
				<ul className="flex">
					{headers.map((header: any) => (
						<li
							key={header.label}
							className="overflow-hidden"
							style={{ width: header.width }}
						>
							{renderTypeValue &&
							header.renderType ? (
								renderTypeValue(
									getValueByPath(
										item,
										header.dkey,
									),
									header.renderType,
								)
							) : Array.isArray(
									getValueByPath(
										item,
										header.dkey,
									),
							  ) && renderListButton ? (
								renderListButton(
									getValueByPath(
										item,
										header.dkey,
									),
								)
							) : (
								<h1 className="whitespace-nowrap overflow-hidden">
									{getValueByPath(
										item,
										header.dkey,
										header.type,
									)}
									{header.endLabel || ""}
								</h1>
							)}
						</li>
					))}
				</ul>
			</div>
		);
	};

	const ActionButtons = () => {
		return (
			<div className="flex gap-4 justify-start items-center w-full h-full">
				{add && (
					<button
						className="cursor-pointer"
						onClick={handleAdd}
					>
						<img
							src="/icons/add.svg"
							width={30}
							alt=""
						/>
					</button>
				)}
				{done && (
					<button
						className="cursor-pointer"
						onClick={handleDone}
					>
						<img
							src="/icons/done.svg"
							width={30}
							alt=""
						/>
					</button>
				)}
				{assign && (
					<button
						className="cursor-pointer"
						onClick={handleAssign}
					>
						<img
							src="/icons/role.svg"
							width={30}
							alt=""
						/>
					</button>
				)}
				{del && (
					<button
						className="cursor-pointer"
						onClick={handleDelete}
					>
						<img
							src="/icons/delete.svg"
							width={30}
							alt=""
						/>
					</button>
				)}
				{edit && (
					<button
						className="cursor-pointer"
						onClick={handleEdit}
					>
						<img
							src="/icons/edit.svg"
							width={30}
							alt=""
						/>
					</button>
				)}
				{refresh && (
					<button
						className="cursor-pointer"
						onClick={handleTableRefresh}
					>
						<img
							src="/icons/refresh.svg"
							width={30}
							alt=""
						/>
					</button>
				)}
				{filters && (
					<div className="w-76 p-2">
						<DatePicker
							value={filters}
							setter={setFilters}
							dkey="date"
						/>
					</div>
				)}
			</div>
		);
	};

	const Header = () => {
		return (
			<ul className="flex font-bold uppercase text-start">
				{headers.map((header: any) => (
					<li
						key={header.label}
						className="whitespace-nowrap overflow-hidden"
						style={{
							width: header.width,
							position: header.position,
						}}
					>
						{header.label}
					</li>
				))}
			</ul>
		);
	};

	const DisplayData = () => {
		return (
			<div className="space-y-2 h-full pt-2 text-start">
				{data.map((d: any) => {
					return <Item key={d.id} item={d} />;
				})}
			</div>
		);
	};

	const Loader = () => {
		return (
			<>
				{showLoading && (
					<div className="w-full h-full absolute inset-0 bg-c1/50 flex justify-center items-center z-50 rounded-lg">
						<img
							src="/icons/loading.svg"
							width={75}
							alt=""
						/>
					</div>
				)}
			</>
		);
	};

	return (
		<div className="h-full w-full">
			<div className=" h-full w-full rounded-lg relative text-center bg-c1 p-2 md:p-4">
				<Loader />
				<div className="overflow-x-auto full h-full">
					<div className="p-1 md:p-2 rounded-lg bg-c2">
						<ActionButtons />
						<hr className="mb-2 mx-1" />
						<Header />
					</div>
					<DisplayData />
				</div>
			</div>
		</div>
	);
}
