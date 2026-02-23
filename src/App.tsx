import { type Component, createSignal } from "solid-js";

const App: Component = () => {
	const [count, setCount] = createSignal(0);

	return (
		<div class="min-h-screen bg-gray-50 flex items-center justify-center">
			<div class="bg-white p-8 rounded-lg shadow-md">
				<h1 class="text-2xl font-bold text-gray-900 mb-4">SolidJS Template</h1>
				<p class="text-gray-600 mb-4">Fastest frontend tooling with SolidJS</p>
				<button
					class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
					onClick={() => setCount((c) => c + 1)}
				>
					Count: {count()}
				</button>
			</div>
		</div>
	);
};

export default App;
