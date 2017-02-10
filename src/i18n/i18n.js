import { Component, PropTypes, Children } from 'react';
import Immutable from 'seamless-immutable';

/**
 * Wrapper component that injects i18n into React's context object.
 * This should be placed once at the top of the component tree, inside Redux's <Provider> but above
 * any visual components. It can only have one child component nested inside.
 *
 * @example
 *   <Provider store={store}>
 *     <I18nProvider locale="en-GB" strings={languageStrings}>
 *       <Router>
 *       ...etc
 *     </I18nProvider>
 *   </Provider>
 *
 *   // Then add `contextTypes` to your components to get access to i18n object:
 *   const MyComponent = (props, context) => (
 *     <div><h1>{context.i18n.strings.foobar}</h1></div>
 *   );
 *
 *   MyComponent.contextTypes = {
 *     i18n: PropTypes.object,
 *   };
 */
export class I18nProvider extends Component {
  constructor(props, context) {
    super(props, context);

    this.i18n = Immutable.from({
      locale: props.locale,
      strings: props.strings,
    });
  }

  getChildContext() {
    return {
      i18n: this.i18n,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}

I18nProvider.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string.isRequired,
  strings: PropTypes.object.isRequired,
};

I18nProvider.childContextTypes = {
  i18n: PropTypes.object,
};

/**
 * Replaces instances of placeholders in a string with the given parameters. Placeholders must be
 * in the format ${n} where n is an integer that corresponds to the index of the param.
 *
 * @example
 *   formatString('Count from ${0} to {1}', 'one', 'ten'); // 'Count from one to ten'
 *
 * @param  {String}    string String to format
 * @param  {...*}      values Values to replace the placeholders
 * @return {String}
 */
export const formatString = (string, ...values) => {
  return string.replace(/\${(\d+)}/g, (match, number) => (
    values[number] != null ? values[number] : match
  ));
};

/**
 * Convenience method to automatically set `i18n` in the contextTypes of the component.
 * This will give the wrapped component access to `i18n` in the context params.
 * @example
 *   let MyComponent = (props, context) => (
 *     <div><h1>{context.i18n.locale}</h1></div>
 *   );
 *   MyComponent = i18n(MyComponent);
 *
 * @param  {*}        ComposedComponent React component (can also be stateless function)
 * @return {Function}                   Wrapped React component
 */
// const i18n = ComposedComponent => {
//   ComposedComponent.contextTypes = {
//     ...ComposedComponent.contextTypes,
//     i18n: PropTypes.object,
//   };
//   return ComposedComponent;
// };

/**
 * Wraps the component and injects the i18n state into props.
 * This requires an `i18n` object at the root of the Redux store.
 * @example
 *   let MyComponent = props => (
 *     <div><h1>{props.i18n.locale}</h1></div>
 *   );
 *   MyComponent = i18n(MyComponent);
 *
 * @param  {*}        ComposedComponent React component (can also be stateless function)
 * @return {Function}                   Wrapped React component
 */
// const i18n = ComposedComponent => {
//   // Wrap the original component in a new stateless component
//   let Wrapper = props => (
//     <ComposedComponent {...props} />
//   );
//   // Inject the i18n reducer object from the store
//   Wrapper = connect(state => ({ i18n: state.i18n }))(Wrapper);
//   return Wrapper;
// };
