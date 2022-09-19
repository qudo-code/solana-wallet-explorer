export const manifest = {
	appDir: "_app",
	assets: new Set([".DS_Store","favicon/android-chrome-192x192.png","favicon/android-chrome-512x512.png","favicon/apple-touch-icon.png","favicon/favicon-16x16.png","favicon/favicon-32x32.png","favicon/favicon.ico","favicon/site.webmanifest","favicon.png","sol.png"]),
	mimeTypes: {".png":"image/png",".ico":"image/vnd.microsoft.icon",".webmanifest":"application/manifest+json"},
	_: {
		entry: {"file":"_app/immutable/start-b9ddad0b.js","imports":["_app/immutable/start-b9ddad0b.js","_app/immutable/chunks/index-92b119e8.js","_app/immutable/chunks/singletons-2b362108.js"],"stylesheets":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				errors: [1],
				layouts: [0],
				leaf: 2
			},
			{
				type: 'endpoint',
				id: "api/solana/nfts/[address]",
				pattern: /^\/api\/solana\/nfts\/([^/]+?)\/?$/,
				names: ["address"],
				types: [null],
				load: () => import('../output/server/entries/endpoints/api/solana/nfts/_address_/_server.ts.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
