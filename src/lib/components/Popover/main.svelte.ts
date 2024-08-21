import {
	addEventListeners,
	buildContext,
	createUID,
	Floating,
	KEYS,
	log,
	removeNodeProps,
	setNodeProps,
	type ContextChange
} from '$internal';

//
// Root
//
interface PopoverRootProps {
	visible: boolean;
}
class PopoverRoot extends Floating {
	uid = createUID('popover').uid;
	visible = $state<boolean>(false);

	constructor(props: ContextChange<PopoverRootProps>) {
		super();
		this.visible = props.visible;

		$effect(() => {
			props.onContextChange({ visible: this.visible });
		});
		$effect(() => {
			if (this.visible) {
				window.addEventListener('keydown', this.#handleKeydown);
			} else {
				window.removeEventListener('keydown', this.#handleKeydown);
			}
		});
	}
	onComponentChange(props: PopoverRootProps) {
		this.visible = props.visible;
	}

	close = () => {
		this.visible = false;
	};
	toggle = () => {
		this.visible = !this.visible;
	};

	#handleKeydown = (e: KeyboardEvent) => {
		if (e.key === KEYS.escape) this.visible = false;
	};

	attrs = $derived.by(
		() =>
			({
				id: this.uid(),
				'data-popover': '',
				'data-state': this.visible ? 'opened' : 'closed'
			}) as const
	);
	state = $derived.by(() => ({
		visible: this.visible
	}));
}

//
// Trigger
//
class PopoverTrigger {
	root: PopoverRoot;

	constructor(root: PopoverRoot) {
		this.root = root;

		$effect(() => {
			if (this.root.trigger) {
				setNodeProps(this.root.trigger, {
					id: this.root.uid('trigger'),
					role: 'button',
					'aria-haspopup': 'dialog',
					'aria-expanded': 'false'
				});
				addEventListeners(this.root.trigger, {
					click: this.#handleClick,
					keydown: this.#handleKeydown
				});

				$effect(() => {
					if (!this.root.trigger) return;

					if (this.root.visible) {
						setNodeProps(this.root.trigger, {
							'aria-expanded': 'true',
							'aria-controls': this.root.uid('content')
						});
					} else {
						setNodeProps(this.root.trigger, { 'aria-expanded': 'false' });
						removeNodeProps(this.root.trigger, 'aria-controls');
					}
				});
			}
		});
	}

	registerTrigger(trigger: HTMLElement) {
		if (trigger.children.length > 1) log.error('<PopoverTrigger /> can only have 1 direct child node.');
		this.root.trigger = trigger;
	}

	#handleKeydown = (e: KeyboardEvent) => {
		const { key } = e;
		if (key === KEYS.escape || key === KEYS.tab) this.root.close();
	};
	#handleClick = () => {
		this.root.toggle();
	};

	attrs = {
		'data-popovertrigger': ''
	};
	state = $derived.by(() => ({
		visible: this.root.visible
	}));
}

//
// Arrow
//
class PopoverArrow {
	root: PopoverRoot;

	constructor(root: PopoverRoot) {
		this.root = root;
	}

	attrs = $derived.by(() => ({
		id: this.root.uid('arrow')
	}));
}

//
// Content
//
class PopoverContent {
	root: PopoverRoot;

	constructor(root: PopoverRoot) {
		this.root = root;
	}

	state = $derived.by(() => ({
		visible: this.root.visible
	}));
}

//
// Builder
//
const rootContext = buildContext(PopoverRoot);

export const createRootContext = (props: ContextChange<PopoverRootProps>) => {
	return rootContext.createContext(props);
};
export const usePopoverTrigger = () => {
	return rootContext.register(PopoverTrigger);
};
export const usePopoverArrow = () => {
	return rootContext.register(PopoverArrow);
};
export const usePopoverContent = () => {
	return rootContext.register(PopoverContent);
};
