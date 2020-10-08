
<div align="center">
  <h2>react-native-pressable-opacity</h2>
</div>

### `<PressableOpacity>`

A component for responding to touches using the new [JS `Pressability` API](https://reactnative.dev/docs/pressable).

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
