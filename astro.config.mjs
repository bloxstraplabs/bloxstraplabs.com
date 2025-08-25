// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  site: 'https://bloxstraplabs.com',
  
  integrations: [
		starlight({
			title: 'Bloxstrap',
			favicon: '/favicon.ico',
			disable404Route: true,
			logo: {
				light: './src/assets/img/wordmark-light.png',
				dark: './src/assets/img/wordmark-dark.png',
				replacesTitle: true
			},
			customCss: ['./src/styles/starlight-custom.css'],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/bloxstraplabs/bloxstrap' },
			],
			sidebar: [
				{ label: 'Welcome', link: 'wiki/' },
				{ label: 'What is Bloxstrap?', link: 'wiki/about' },
				{ label: 'Frequently asked questions', link: 'wiki/faq' },
				{
					label: 'Features',
					// autogenerate: { directory: 'wiki/features' },
					items: [
						{ slug: 'wiki/features/modding' },
						{ slug: 'wiki/features/engine-settings' },
						{ slug: 'wiki/features/activity-tracking' },
						{ slug: 'wiki/features/discord-rich-presence' },
						{ slug: 'wiki/features/server-location-hints' },
						{ slug: 'wiki/features/game-history' }
					]
				},
				{
					label: 'Help',
					autogenerate: { directory: 'wiki/help' }
				},
				{
					label: 'Developers',
					autogenerate: { directory: 'wiki/developers' }
				},
				{
					label: 'Download',
					link: '/'
				}
			],
		}),
	],
});