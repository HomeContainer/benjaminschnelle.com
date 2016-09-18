import React, { Component, PropTypes } from 'react';
import MenuIconButton from '../MenuIconButton/MenuIconButton';
import Tab from '../Tab/Tab';
import classes from './TabbedDrawer.scss';

class TabbedDrawer extends Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { activeTab: null, open: false };
    this.tabs = this.mapTabs(props.tabs);
    const fns = ['onTabClick', 'closeDrawer', 'mapTabs'];
    fns.forEach((fn) => { this[fn] = this[fn].bind(this); });
  }

  componentWillReceiveProps(nextProps) {
    this.tabs = this.mapTabs(nextProps.tabs);
  }

  onTabClick(tab) {
    return () => {
      if (this.state.open && this.state.activeTab === tab) {
        this.setState({ activeTab: tab, open: false });
      } else {
        this.setState({ activeTab: tab, open: true });
      }
    };
  }

  closeDrawer() {
    this.setState({ open: false });
  }

  mapTabs(tabs) {
    return tabs.map((tab) => {
      const newTab = Object.assign({}, tab);
      newTab.onClick = this.onTabClick(tab);
      return newTab;
    });
  }

  render() {
    let drawerClassName = classes.drawer;
    if (this.state.open) drawerClassName += ` ${classes.drawerOpen}`;

    const tabs = this.tabs.map((tab) => (
      <Tab
        active={!this.state.activeTab || tab.label === this.state.activeTab.label}
        key={tab.label}
        label={tab.label}
        onClick={tab.onClick}
      />
    ));

    return (
      <div className={drawerClassName}>
        <div className={classes.inner}>
          <div>
            {this.state.activeTab && this.state.activeTab.content}
          </div>
          <MenuIconButton
            className={classes.menu}
            onClick={this.closeDrawer}
            open
          />
        </div>
        <div className={classes.tabs}>
          {tabs}
        </div>
        <div className={classes.overlay} onClick={this.closeDrawer} />
      </div>
    );
  }
}

export default TabbedDrawer;
