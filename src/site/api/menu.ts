import { defaultProps } from './_helpers.js';
import type { APIReference } from '$site/types.js';

const menu: APIReference = {
	name: 'Menu',
	description: 'The base component that manages and controls state.',
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean',
			description: 'Whether the dropdown component is visible.'
		}
	]
};

const trigger: APIReference = {
	name: 'MenuTrigger',
	childOf: menu.name,
	description: 'The component wrapper for the menu trigger.',
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean',
			description: 'Whether the dropdown component is visible.'
		}
	],
	events: [
		{
			name: 'onClick',
			params: ['e: MouseEvent'],
			return: 'void'
		}
	]
};

const dropdown: APIReference = {
	name: 'MenuDropdown',
	childOf: menu.name,
	childrenProps: [
		{
			name: 'visible',
			type: 'boolean',
			description: 'Whether the dropdown component is visible.'
		}
	],
	props: [
		{
			name: 'placement',
			type: 'Placement',
			default: 'bottom',
			description: 'The FloatingUI placement string.'
		},
		{
			name: 'constrainViewport',
			type: 'boolean',
			default: 'false',
			description: 'Keeps the dropdown from ever growing outside of the viewport.'
		},
		{
			name: 'sameWidth',
			type: 'boolean',
			default: 'false',
			description: 'Makes the dropdown the same width as the trigger.'
		},
		{
			name: 'portalTarget',
			type: 'strng | HTMLElement',
			default: 'body',
			description: 'The target position for the dropdown to portal to.'
		},
		...defaultProps('Div')
	],
	dataAttrs: [
		{
			name: 'side',
			value: `'top' | 'right' | 'bottom' | 'left'`,
			description: 'The position of the dropdown relative to the trigger.'
		},
		{
			name: 'alignment',
			value: `'start' | 'center' | 'end'`,
			description: 'The alignment of dropdown relative to the trigger.'
		}
	]
};

const item: APIReference = {
	name: 'MenuItem',
	childOf: dropdown.name,
	childrenProps: [
		{
			name: 'hovered',
			type: 'boolean',
			description: 'If the item is currently being hovered via mouse or keyboard navigation.'
		}
	],
	dataAttrs: [
		{
			name: 'hovered',
			value: 'true',
			description: 'If the item is currently being hovered via mouse or keyboard navigation.'
		}
	],
	events: [
		{
			name: 'onClick',
			params: ['e: MouseEvent'],
			return: 'void'
		},
		{
			name: 'onFocus',
			params: ['e: FocusEvent'],
			return: 'void'
		},
		{
			name: 'onMouseover',
			params: ['e: MouseEvent'],
			return: 'void'
		}
	],
	props: [
		{
			name: 'href',
			type: 'string | undefined',
			default: 'undefined',
			description: 'Switches the item to an anchor tag with the target href.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the item. Disallowing clicking and navigation via mouse or keyboard.'
		}
	]
};

export default [menu, trigger, dropdown, item];
