<template>
	<div class="container max-w-full max-h-full flex h-screen w-screen bg-slate-200 dark:bg-slate-900">
		<div class="w-full px-16 md:px-0 h-screen flex items-center justify-center bg-slate-200 dark:bg-slate-900">
			<div class="bg-white w-[600px] py-6 flex flex-col items-center justify-center rounded-lg shadow-2xl">
				<p class="text-6xl md:text-7xl lg:text-9xl font-bold text-gray-300">{{ error.statusCode }}</p>
				<p class="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-500 mt-4">{{ error.message }}</p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		error: {
			default: null
		}
	},
	layout: "error",
};
</script>
