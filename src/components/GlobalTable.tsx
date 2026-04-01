import { type Dispatch, type SetStateAction } from "react";
import DatePicker from "./inputs/DatePicker";
import SelectInput from "./inputs/SelectInput";
import { GlobalStatus, HEADERTYPES } from "../libs/enums";
import { enumToArray, getValueByPath } from "../libs/utils";

type GlobalTableProps = {
	data: any;
	headers: any;
	edit?: () => void;
	del?: () => void;
	add?: () => void;
	refresh?: () => void;
	delivery?: () => void;
	assign?: () => void;
	done?: () => void;
	disableSelect?: boolean;
	filters?: any;
	inputUnits?: (item: any) => void;
	setFilters?: Dispatch<SetStateAction<any>>;
	shops?: any[];
	selected?: any[];
	setSelected?: Dispatch<SetStateAction<any[]>>;
};

export default function GlobalTable({
	data,
	headers,
	add,
	refresh,
	del,
	edit,
	disableSelect = true,
	filters,
	setFilters,
	inputUnits,
	shops,
	selected = [],
	setSelected,
	done,
}: GlobalTableProps) {
	const Item = ({ item }: any) => {
		return (
			<div
				className={`p-2 z-40 col-span-24 ${!disableSelect && "cursor-pointer"} mb-0`}
				onClick={() => setSelected?.([...selected, item])}
			>
				<ul className="grid grid-cols-24 gap-2 ">
					{headers.map((header: any) => (
						<li
							key={header.label}
							className="overflow-hidden flex items-center justify-start"
							style={{
								gridColumn: `span ${header.col} / span ${header.col}`,
							}}
						>
							{header.type ===
								HEADERTYPES.CHECKBOX &&
								header.itemRenderer &&
								header.itemRenderer(item.id)}
							{header.type === HEADERTYPES.SHOW &&
								header.displayItemsRenderer &&
								header.displayItemsRenderer(
									item.id,
								)}
							{header.typeValueRenderer ? (
								header.typeValueRenderer(
									item[header.dkey],
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

	const handleClearFilters = () => {
		setFilters?.({});
	};

	const ActionButtons = () => {
		return (
			<div className="flex gap-2 justify-start items-center w-full h-full">
				{refresh && (
					<button
						className="cursor-pointer"
						onClick={refresh}
					>
						<img
							src="/icons/refresh.svg"
							width={30}
							alt=""
						/>
					</button>
				)}
				{add && (
					<button className="cursor-pointer" onClick={add}>
						<img
							src="/icons/add.svg"
							width={30}
							alt=""
						/>
					</button>
				)}
				{done && (
					<button className="cursor-pointer" onClick={done}>
						<img
							src="/icons/done.svg"
							width={30}
							alt=""
						/>
					</button>
				)}
				{inputUnits && (
					<button
						className="cursor-pointer"
						onClick={inputUnits}
					>
						<img
							src="/icons/input.svg"
							width={30}
							alt=""
						/>
					</button>
				)}
				{del && (
					<button className="cursor-pointer" onClick={del}>
						<img
							src="/icons/delete.svg"
							width={30}
							alt=""
						/>
					</button>
				)}
				{edit && (
					<button className="cursor-pointer" onClick={edit}>
						<img
							src="/icons/edit.svg"
							width={30}
							alt=""
						/>
					</button>
				)}
				{filters && (
					<div className="w-69 flex gap-2 justify-center items-center">
						<DatePicker
							value={filters}
							setter={setFilters}
							dkey="date"
						/>
					</div>
				)}
				{filters && (
					<div className="w-69 flex gap-2 justify-center items-center">
						<SelectInput
							options={shops || []}
							placeholder="Select Shop"
							value={filters}
							setter={setFilters}
							dkey={"id"}
							fkey={"shopId"}
							labelKey="shopDetails.name"
						/>
					</div>
				)}
				{filters && (
					<div className="w-69 flex gap-2 justify-center items-center">
						<SelectInput
							options={enumToArray(GlobalStatus)}
							placeholder="STATUS"
							value={filters}
							setter={setFilters}
							dkey={"value"}
							fkey={"status"}
							labelKey="key"
						/>
					</div>
				)}
				{filters && (
					<button
						className="cursor-pointer"
						onClick={handleClearFilters}
					>
						<img
							src="/icons/clear.svg"
							width={30}
							alt=""
						/>
					</button>
				)}
			</div>
		);
	};

	return (
		<div className="overflow-x-auto w-full h-full bg-c2 rounded-lg">
			<div className="min-w-250 p-2">
				<ActionButtons />

				<div className="grid grid-cols-24 gap-2 p-2">
					{headers.map((header: any) => (
						<div
							key={header.label}
							style={{
								gridColumn: `span ${header.col} / span ${header.col}`,
							}}
							className="whitespace-nowrap overflow-hidden text-start sticky top-0 font-bold uppercase flex items-center"
						>
							{header.headerRenderer
								? header.headerRenderer()
								: header.label}
						</div>
					))}
				</div>
				<hr className="mb-2 mx-1" />
				<div className="col-span-24 space-y-2">
					{data?.map((d: any) => (
						<Item key={d.id} item={d} />
					))}
				</div>
			</div>
		</div>
	);
}
