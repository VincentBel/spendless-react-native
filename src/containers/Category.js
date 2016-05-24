import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, ListView } from 'react-native'
import { connect } from 'react-redux'

import { Loading, Icon, SlTouchable, Header, BackIcon } from '../components'
import { loadCategories, selectMainCategory } from '../reducers/categories'
import { yellow500, grey100, grey300 } from '../theme/colors'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'stretch',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  mainList: {
    flex: 1,
    backgroundColor: grey300,
  },
  mainListItem: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  mainListItemActive: {
    backgroundColor: 'white',
  },
  subList: {
    flex: 2,
    backgroundColor: 'white',
  },
  subListItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 24,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: grey100,
  },
  subListText: {
    flex: 1,
  },
})

class Category extends Component {

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    navigator: PropTypes.object.isRequired,
    selectedMainCategoryId: PropTypes.string,
    mainCategories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })).isRequired,
    subCategories: PropTypes.array.isRequired,
    loadCategories: PropTypes.func.isRequired,
    selectMainCategory: PropTypes.func.isRequired,
    onSelectSubCategory: PropTypes.func,
  };

  constructor(props) {
    super(props)
    const mainCategoryDataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => { // eslint-disable-line arrow-body-style
        // you can't rely on `this.props.selectedMainCategoryId`
        // because when render the child ListView, it is not the updated props
        // It is still the previous props
        return r2.name !== r1.name || r2.selected !== r1.selected
      },
    })
    const subCategoryDataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    this.state = {
      mainCategoryDataSource: mainCategoryDataSource.cloneWithRows(props.mainCategories),
      subCategoryDataSource: subCategoryDataSource.cloneWithRows(props.subCategories),
    }

    this._renderMainRow = this._renderMainRow.bind(this)
    this._renderSubRow = this._renderSubRow.bind(this)
  }

  componentDidMount() {
    this.props.loadCategories()
  }

  componentWillReceiveProps(nextProps) {
    const changed = {}
    if (nextProps.mainCategories !== this.props.mainCategories) {
      changed.mainCategoryDataSource =
        this.state.mainCategoryDataSource.cloneWithRows(nextProps.mainCategories)
    }
    if (nextProps.subCategories !== this.props.subCategories) {
      changed.subCategoryDataSource =
        this.state.subCategoryDataSource.cloneWithRows(nextProps.subCategories)
    }
    if (Object.keys(changed).length > 0) {
      this.setState(changed)
    }
  }

  _renderMainRow({ id, name }) {
    return (
      <SlTouchable rippleColor="#f3f3f3" onPress={() => this.props.selectMainCategory(id)}>
        <View
          style={[
            styles.mainListItem,
            id === this.props.selectedMainCategoryId && styles.mainListItemActive,
          ]}
        >
          <Text>{name}</Text>
        </View>
      </SlTouchable>
    )
  }

  _renderSubRow(sub) {
    return (
      <SlTouchable
        onPress={() => {
          this.props.navigator.pop()
          if (this.props.onSelectSubCategory) {
            this.props.onSelectSubCategory(sub)
          }
        }}
      >
        <View style={styles.subListItem}>
          <Text style={styles.subListText}>{sub.name}</Text>
          <Icon
            size={28}
            name={sub.star ? 'star' : 'star-border'}
            color={sub.star ? yellow500 : grey300}
          />
        </View>
      </SlTouchable>
    )
  }

  render() {
    const { isFetching } = this.props
    let content
    if (isFetching) {
      content = <Loading />
    } else {
      content = (
        <View style={styles.content}>
          <ListView
            style={styles.mainList}
            dataSource={this.state.mainCategoryDataSource}
            renderRow={this._renderMainRow}
          />
          <ListView
            style={styles.subList}
            dataSource={this.state.subCategoryDataSource}
            renderRow={this._renderSubRow}
          />
        </View>
      )
    }
    return (
      <View style={styles.root}>
        <Header
          title="选择类别"
          leftItem={{
            icon: BackIcon,
            title: '返回',
            layout: 'icon',
            onPress: () => this.props.navigator.pop(),
          }}
        />
        {content}
      </View>
    )
  }
}

function mapStateToProps(state) {
  const {
    categories: {
      selectedMainCategoryId: originalSelectedMainCategoryId,
      items: { isFetching, ids },
    },
    entities: {
      mainCategories,
      subCategories,
    },
  } = state
  const mainCategoryIds = ids || []
  const selectedMainCategoryId = originalSelectedMainCategoryId || mainCategoryIds[0]
  const selectedMainCategory = mainCategories[selectedMainCategoryId]
  const subIds = selectedMainCategory ? selectedMainCategory.subCategories : []
  return {
    isFetching,
    selectedMainCategoryId,
    mainCategories: mainCategoryIds.map(id => ({
      id,
      name: mainCategories[id].name,
      selected: id === selectedMainCategoryId,
    })),
    subCategories: subIds.map(id => subCategories[id]),
  }
}

export default connect(mapStateToProps, {
  loadCategories,
  selectMainCategory,
})(Category)
