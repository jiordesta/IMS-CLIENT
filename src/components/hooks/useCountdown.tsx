import { useEffect, useState } from "react";

export function useCountdown(initialTime = 10) {
	const [time, setTime] = useState(initialTime);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		if (!isRunning || time <= 0) return;

		const id = setInterval(() => {
			setTime((t) => t - 1);
		}, 1000);

		return () => clearInterval(id);
	}, [isRunning, time]);

	return {
		time,
		start: () => setIsRunning(true),
		stop: () => setIsRunning(false),
		reset: () => setTime(initialTime),
	};
}
