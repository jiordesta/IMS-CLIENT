import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../configs/redux/store";
import { authenticate } from "../../configs/redux/reducers/auth";

export default function Profile() {
	const dispatch = useDispatch<AppDispatch>();

	const { accessToken, user } = useSelector(
		(state: RootState) => state.authentication,
	);

	useEffect(() => {
		if (!accessToken) return;
		dispatch(authenticate({ token: accessToken }));
	}, [accessToken]);

	return (
		<div className="h-full">
			<div className="h-full rounded-2xl bg-c1 p-4">
				<h1 className="bg-c2 rounded-lg p-4">
					Profile Details
				</h1>
				<div className="p-2 space-y-2">
					<h1>First name: {user?.userDetails?.fname}</h1>
					<h1>Last name: {user?.userDetails?.lname}</h1>
					<h1>Nickname: {user?.userDetails?.nname}</h1>
					<h1>
						Username: {user?.userCredential?.username}
					</h1>
					<h1>
						Role:{" "}
						{user?.userRole?.role?.roleDetails?.name}
					</h1>
				</div>
			</div>
		</div>
	);
}
