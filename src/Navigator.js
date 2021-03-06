import React, { PropTypes } from 'react';
import {
  BackAndroid,
  NavigationExperimental,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { actionCreators as navActionCreators } from './ducks/navigation';
import Home from './components/Home';
import Splashscreen from './components/Splashscreen';

class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.handlers = [];
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => this.handleBackButton());
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', () => this.handleBackButton());
  }

  handleBackButton() {
    if (this.props.navigationState.index > 1) { // Never go back to splashscreen
      this.props.dispatch(navActionCreators.doNavigatePop());
      return true;
    }

    return false;
  }

  renderScene(props) {
    const sceneState = props.scene.route;

    if (sceneState.key === 'splashscreen') {
      return <Splashscreen />;
    }
    if (sceneState.key === 'index') {
      return <Home />;
    }

    return <Text>404</Text>;
  }

  render() {
    return (
      <NavigationExperimental.CardStack
        direction="vertical"
        cardStyle={{ backgroundColor: '#CCEEFF' }}
        renderScene={props => this.renderScene(props)}
        navigationState={this.props.navigationState}
        onNavigateBack={() => {
          this.props.dispatch(navActionCreators.doNavigatePop());
        }}
      />
    );
  }
}

Navigator.propTypes = {
  navigationState: PropTypes.object,
  dispatch: PropTypes.func,
};

function select(store) {
  return {
    navigationState: store.navigation,
  };
}

export default connect(select)(Navigator);
