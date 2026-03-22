import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType: "autoUpdate",
			injectRegister: "auto",
			includeAssets: ["favicon.svg"],
			manifest: {
				name: "IMS App",
				short_name: "IMS",
				start_url: "/",
				display: "standalone",
				background_color: "#ffffff",
				theme_color: "#ffffff",
				icons: [
					{
						src: "/icon-192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/icon-512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
			workbox: {
				runtimeCaching: [
					{
						urlPattern: ({ request }) =>
							request.destination === "document",
						handler: "NetworkFirst",
					},
					{
						urlPattern: ({ request }) =>
							request.destination === "script",
						handler: "CacheFirst",
					},
					{
						urlPattern: ({ request }) =>
							request.destination === "style",
						handler: "CacheFirst",
					},
					{
						urlPattern: ({ request }) =>
							request.destination === "image",
						handler: "CacheFirst",
					},
				],
			},
		}),
	],
});
