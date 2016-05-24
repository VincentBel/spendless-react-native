import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, ListView } from 'react-native'
import { connect } from 'react-redux'
import { loadAccounts } from '../reducers/accounts'
import { FloatingActionButton, Icon, Loading, SlTouchable } from '../components'
import { types } from '../helpers/accounts'
import { borderColor } from '../theme'

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listView: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
  },
  listItemIcon: {

  },
  listItemNameAndTypeWrapper: {
    flex: 1,
    marginLeft: 16,
  },
  listItemName: {
    fontSize: 16,
  },
  listItemType: {
    fontSize: 13,
    marginTop: 2,
    color: 'rgba(0, 0, 0, 0.32)',
  },
  listItemAmount: {
    fontSize: 20,
  },
  footer: {
    height: 88,
  },
})

class AccountList extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    accounts: PropTypes.array,
    loadAccounts: PropTypes.func.isRequired,
    onSelectAccount: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      accounts: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }).cloneWithRows(props.accounts),
    }
    this._openCreateAccount = this._openCreateAccount.bind(this)
    this.renderAccount = this.renderAccount.bind(this)
  }

  componentDidMount() {
    this.props.loadAccounts()
  }

  componentWillReceiveProps(nextProps) {
    const accounts = nextProps.accounts
    if (accounts) {
      this.setState({ accounts: this.state.accounts.cloneWithRows(accounts) })
    }
  }

  _openCreateAccount() {
    this.props.navigator.push({ createAccount: true })
  }

  renderEmptyView() {
    return (
      <View style={styles.emptyView}>
        <Text>您还没有账户, 点击下方 + 按钮创建一个账户</Text>
      </View>
    )
  }

  renderAccount(account) {
    const { name, type, amount } = account
    const { label, icon, color } = types.find(t => t.type === type) || {}
    return (
      <SlTouchable
        onPress={() => {
          if (this.props.onSelectAccount) {
            this.props.onSelectAccount(account)
          }
        }}
      >
        <View style={styles.listItem}>
          <Icon name={icon} size={36} color={color} style={styles.listItemIcon} />
          <View style={styles.listItemNameAndTypeWrapper}>
            <Text style={styles.listItemName}>{name}</Text>
            <Text style={styles.listItemType}>{label}</Text>
          </View>
          <Text style={styles.listItemAmount}>{parseFloat(amount).toFixed(2)}</Text>
        </View>
      </SlTouchable>
    )
  }

  renderFooter() {
    // render a empty 88px-height footer to avoid FloatActionButton block content
    return <View style={styles.footer} />
  }

  render() {
    let content
    if (this.props.isFetching) {
      content = <Loading />
    } else if (!this.props.accounts.length) {
      content = this.renderEmptyView()
    } else {
      content = (
        <ListView
          style={styles.listView}
          dataSource={this.state.accounts}
          renderRow={this.renderAccount}
          renderFooter={this.renderFooter}
        />
      )
    }
    return (
      <View style={styles.root}>
        {content}
        <FloatingActionButton iconName="add" onPress={this._openCreateAccount} />
      </View>
    )
  }
}

function mapStateToProps(state) {
  const {
    entities: { accounts },
    accounts: { items: { isFetching, ids } },
  } = state
  return {
    isFetching,
    accounts: ids ? ids.map(id => accounts[id]) : [],
  }
}

export default connect(mapStateToProps, { loadAccounts })(AccountList)
