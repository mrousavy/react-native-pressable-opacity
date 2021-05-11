import React, { useMemo } from 'react';
import type { ViewProps } from 'react-native';
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Reanimated, {
	cancelAnimation,
	delay,
	Easing,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { PRESSABLE_IN_LIST_DELAY } from './Constants';

export interface NativePressableOpacityProps extends ViewProps, Reanimated.WithTimingConfig {
	children: React.ReactNode;
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
	const { activeOpacity = 0.2, isInList, duration = 50, easing = Easing.linear, disabled = false, ref, style, onPress, ...passThroughProps } = props;

	const opacity = useSharedValue(1);
	const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }), [opacity]);
	const timingConfig = useMemo<Reanimated.WithTimingConfig>(() => ({ duration, easing }), [duration, easing]);

	const onGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
		{
			onStart: () => {
				cancelAnimation(opacity);
				opacity.value = isInList ? delay(PRESSABLE_IN_LIST_DELAY, withTiming(activeOpacity, timingConfig)) : withTiming(activeOpacity, timingConfig);
			},
			onEnd: () => {
				onPress();
			},
			onFinish: () => {
				cancelAnimation(opacity);
				opacity.value = withTiming(1, timingConfig);
			},
		},
		[opacity, isInList, activeOpacity, timingConfig, onPress],
	);

	return (
		<TapGestureHandler ref={ref} onGestureEvent={onGestureEvent} enabled={!disabled} shouldCancelWhenOutside={true}>
			<Reanimated.View style={[style, animatedStyle]} {...passThroughProps} />
		</TapGestureHandler>
	);
}
