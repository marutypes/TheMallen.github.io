import * as React from 'react';
import Transition from 'react-transition-group/Transition'

const duration = 300

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
};

class Fade extends React.Component {
  state = {
    fadedIn: this.props.in,
  }

  componentDidMount() {
    const {inAfter} = this.props;

    if (inAfter) {
      this.timeout = setTimeout(this.fadeIn.bind(this), inAfter)
    }
  }

  componentDidUpdate({in: oldIn}) {
    const {in: inProp} = this.props;

    if (inProp != oldIn) {
      this.setState({fadedIn: inProp})
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    const { fadedIn } = this.state;
    const { children } = this.props;
    return (
      <Transition in={fadedIn} timeout={duration}>
        {(state) => (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
            {children}
          </div>
        )}
      </Transition>
    )
  }

  fadeIn() {
    this.setState({fadedIn: true})
  }
}

export default Fade
