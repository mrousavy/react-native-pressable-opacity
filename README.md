<div align="center">
  <h2 align="center">A Pressable that lowers opacity when pressed.</h2>
  <pre align="center"><code>npm i react-native-pressable-opacity</code></pre>
  <a align="center" href="https://npmjs.org/react-native-pressable-opacity"><img align="center" src="https://img.shields.io/npm/v/react-native-pressable-opacity?color=%237f78d2"></a>

  <br />
  <br />

  <img src="img/opacity.gif" width="35%">
  <br />
</div>

### `<PressableOpacity>`

A component for responding to touches using the new [JS `Pressability` API](https://reactnative.dev/docs/pressable).

```jsx
<PressableOpacity onPress={onBuyPressed} style={styles.buyButton}>
  <Text>Buy this Product</Text>
</PressableOpacity>
```

The following props are supported:

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Explanation</th>
    <th>Required</th>
    <th>Default Value</th>
  </td>
  <tr>
    <td><code>disabledOpacity</code></td>
    <td><code>number</code></td>
    <td>The opacity to use when the <code>disabled</code> prop is <code>true</code>. Use <code>1</code> to disable opacity changes when disabling the <code>&lt;PressableOpacity&gt;</code></td>
    <td>❌</td>
    <td><code>0.3</code></td>
  </tr>
  <tr>
    <td><code>activeOpacity</code></td>
    <td><code>number</code></td>
    <td>The opacity to use when the <code>&lt;PressableOpacity&gt;</code> is in a pressed state.</td>
    <td>❌</td>
    <td><code>0.2</code></td>
  </tr>
  <tr>
    <td>All <code>Pressable</code> props</td>
    <td><a href="https://reactnative.dev/docs/pressable"><code>PressableProps</code></a></td>
    <td>All properties from the React Native <code>Pressable</code> such as <code>onPress</code>, <code>children</code> or <code>disabled</code>.
    <td>❌</td>
    <td><code>{}</code></td>
  </tr>
</table>


### `<NativePressableOpacity>`

**A supercharged `<PressableOpacity>`.**

> Requires `react-native-gesture-handler` and `react-native-reanimated` (v2)

A component for responding to touches using the native [`TapGestureHandler`](https://docs.swmansion.com/react-native-gesture-handler/docs/handler-tap/) without ever going over the JS Bridge. Use this component if you want your Pressables to be able to receive touches, respond to touches, show visual animated feedback (opacity change) and dispatch a callback to JS without using the React Native Thread at all. This component will always be pressable, even when the React Native (JS) Thread freezes because of a heavy JS computation.

> ⚠️ Warning: This does not work in Modals on Android devices. See [software-mansion/react-native-gesture-handler issue #139](https://github.com/software-mansion/react-native-gesture-handler/issues/139)

```jsx
<NativePressableOpacity onPress={onBuyPressed} style={styles.buyButton}>
  <Text>Buy this Product</Text>
</NativePressableOpacity>
```

The following props are supported:

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Explanation</th>
    <th>Required</th>
    <th>Default Value</th>
  </td>
  <tr>
    <td><code>onPress</code></td>
    <td><code>() => void</code></td>
    <td>The event to fire after the <code>&lt;PressableOpacity&gt;</code> has been pressed by the user.</td>
    <td>✅</td>
    <td><code>undefined</code></td>
  </tr>
  <tr>
    <td><code>activeOpacity</code></td>
    <td><code>number</code></td>
    <td>The opacity to use when the <code>&lt;PressableOpacity&gt;</code> is in a pressed state. Changes to and from this opacity will always be animated using a short linear timing animation.</td>
    <td>❌</td>
    <td><code>0.2</code></td>
  </tr>
  <tr>
    <td><code>isInList</code></td>
    <td><code>boolean</code></td>
    <td>A flag indicating whether this <code>&lt;PressableOpacity&gt;</code> is rendered in a ScrollView, FlatList or any other component that uses a swipe gesture. This will delay the animation for <code>50ms</code> so swipe gestures don't immediately trigger opacity changes</td>
    <td>❌</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td><code>disabled</code></td>
    <td><code>boolean</code></td>
    <td>A flag indicating whether this <code>&lt;PressableOpacity&gt;</code> should be disabled and therefore stop receiving touch events.</td>
    <td>❌</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td><code>ref</code></td>
    <td><code>React.RefObject&lt;TapGestureHandler&gt;</code></td>
    <td>A reference to the <code>&lt;TapGestureHandler&gt;</code> component.</td>
    <td>❌</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>All <code>View</code> props</td>
    <td><a href="https://reactnative.dev/docs/view"><code>ViewProps</code></a></td>
    <td>All properties from the React Native <code>View</code> component such as <code>style</code> or <code>children</code>.
    <td>❌</td>
    <td><code>{}</code></td>
  </tr>
  <tr>
    <td>All <code>WithTimingConfig</code> props</td>
    <td><a href="https://docs.swmansion.com/react-native-reanimated/docs/next/api/withTiming#options-object"><code>WithTimingConfig</code></a></td>
    <td>All properties from the react-native-reanimated <code>withTiming</code> options parameter such as <code>Easing</code> or <code>duration</code>.
    <td>❌</td>
    <td><code>{ duration: 50, easing: Easing.linear }</code></td>
  </tr>
</table>


## Also try

* [react-native-pressable-scale](https://github.com/mrousavy/react-native-pressable-scale)
