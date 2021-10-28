import React, { useMemo } from 'react';
import type { ViewProps } from 'react-native';
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Reanimated, {
	withDelay,
	Easing,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	useDerivedValue,
	WithTimingConfig,
	runOnJS,
} from 'react-native-reanimated';
import { PRESSABLE_IN_LIST_DELAY } from './Constants';

export interface NativePressableOpacityProps extends ViewProps, WithTimingConfig {
	children: React.ReactNode;
	/**
	 * The opacity to use when `disabled={true}`
	 *
	 * @default 0.3
	 */
	disabledOpacity?: number;
	/**
	 * The opacity to use when the Pressable is being pressed.
	 * @default 0.2
	 */
	activeOpacity?: number;

	/**
	 * The onPress event.
	 */
	onPress: () => void;

	/**
	 * Set to `true` if this Pressable is contained in a list. This will automatically delay the press animation.
	 * @default false
	 */
	isInList?: boolean;

	/**
	 * Set to `true` to disable pressing
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Ref to the `TapGestureHandler`
	 */
	ref?: React.RefObject<TapGestureHandler>;
}

/**
 * A Pressable that lowers opacity when pressed. Uses the native responder system from react-native-gesture-handler instead of the JS Pressability API.
 */
export function NativePressableOpacity(props: NativePressableOpacityProps): React.ReactElement {
	const { activeOpacity = 0.2, isInList, duration = 50, easing = Easing.linear, disabled = false, disabledOpacity = 0.3, ref, style, onPress, ...passThroughProps } = props;

	const isPressed = useSharedValue(false)
	const timingConfig = useMemo<WithTimingConfig>(() => ({ duration, easing }), [duration, easing]);

	const opacity = useDerivedValue(() => {
		if (disabled) {
			return withTiming(disabledOpacity, timingConfig)
		} else {
			if (isPressed.value) {
				if (isInList) {
					return withDelay(PRESSABLE_IN_LIST_DELAY, withTiming(activeOpacity, timingConfig))
				} else {
					return withTiming(activeOpacity, timingConfig)
				}
			} else {
				return withTiming(1, timingConfig)
			}
		}
	}, [disabled, disabledOpacity, timingConfig, isPressed, isInList, activeOpacity])

	const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }), [opacity]);

	const onGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
		{
			onStart: () => {
				isPressed.value = true
			},
			onEnd: () => {
				runOnJS(onPress)();
			},
			onFinish: () => {
				isPressed.value = false
			},
		},
		[isPressed, onPress],
	);

	return (
		<TapGestureHandler ref={ref} onGestureEvent={onGestureEvent} enabled={!disabled} shouldCancelWhenOutside={true}>
			<Reanimated.View style={[style, animatedStyle]} {...passThroughProps} />
		</TapGestureHandler>
	);
}
