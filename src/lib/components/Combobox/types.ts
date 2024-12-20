import type { Props, PropsNoChildren, ContentProps, Handler, JsonValue } from '$internal';

export type ComboboxElement = HTMLAnchorElement | HTMLButtonElement;

/**
 * The state that is exposed from the `Combobox` component.\
 * Which can be used via the `class` prop function or `children` snippet block.
 */
export interface ComboboxState {
	/** Whether or not the content is opened or not. */
	visible: boolean;
}
export interface ComboboxProps extends Props<HTMLDivElement, ComboboxState> {
	/** The current selected value(s) of the combobox. */
	value: JsonValue;
	/** The current selected label(s) of the combobox. */
	label?: string;
	/** Disables the entire combobox component. */
	disabled?: boolean;
	/** Control the visibility of the content list. */
	visible?: boolean;
	/** If the user has modified the selected value in anyway. */
	touched?: boolean;
	/** Allows for the combobox content to be visible only when this condition is met. */
	controlled?: boolean;
	onChange?: (payload?: { value?: JsonValue; label?: string }) => void;
}

export interface ComboboxArrowProps extends PropsNoChildren<HTMLDivElement, ComboboxState> {}

/**
 * The state that is exposed from the `ComboboxContent` component.\
 * Which can be used via the `class` prop function or `children` snippet block.
 */
export interface ComboboxContentState {
	/** Whether or not the content is opened or not. */
	visible: boolean;
}
export interface ComboboxContentProps extends Props<HTMLDivElement, ComboboxState>, ContentProps {}

/**
 * The state that is exposed from the `ComboboxInput` component.\
 * Which can be used via the `class` prop function or `children` snippet block.
 */
export interface ComboboxInputState {
	/** Whether or not the content is opened or not. */
	visible: boolean;
}
export interface ComboboxInputEvents {
	/**
	 * Add your own custom logic to the click event.\
	 * Using the regular `onclick` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onClick?: Handler<MouseEvent, HTMLInputElement>;
	/**
	 * Add your own custom logic to the keydown event.\
	 * Using the regular `onkeydown` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onKeydown?: Handler<KeyboardEvent, HTMLInputElement>;
}
export interface ComboboxInputProps extends PropsNoChildren<HTMLInputElement, ComboboxInputState>, ComboboxInputEvents {
	/** Bind the value of the input value. */
	value: string;
}

/**
 * The state that is exposed from the `ComboboxOption` component.\
 * Which can be used via the `class` prop function or `children` snippet block.
 */
export interface ComboboxOptionState {
	/** If the option is hovered, either via mouse or keyboard. */
	hovered: boolean;
	/** If the option is selected. */
	selected: boolean;
}
export interface ComboboxOptionEvents {
	/**
	 * Add your own custom logic to the click event.\
	 * Using the regular `onclick` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onClick?: Handler<MouseEvent, HTMLButtonElement>;
	/**
	 * Add your own custom logic to the mouseover event.\
	 * Using the regular `onmouseover` event will overwrite the event used and cause the component to fail.
	 *
	 * Event will **NOT** be fired if the component is disabled.
	 */
	onMouseover?: Handler<MouseEvent, HTMLButtonElement>;
}
export interface ComboboxOptionProps extends Props<ComboboxElement, ComboboxOptionState>, ComboboxOptionEvents {
	/** The value of the option. */
	value: JsonValue;
	/** Disables the option. */
	disabled?: boolean;
	/**
	 * Label of the option.
	 *
	 * If this prop is not provided, the text content will be used.
	 */
	label?: string;
}
